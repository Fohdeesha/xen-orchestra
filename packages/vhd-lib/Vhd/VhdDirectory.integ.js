'use strict'

const { beforeEach, afterEach, describe, it } = require('node:test')
const { strict: assert } = require('assert')

const { rimraf } = require('rimraf')
const tmp = require('tmp')
const fs = require('fs-extra')
const { getSyncedHandler } = require('@xen-orchestra/fs')
const { Disposable, pFromCallback } = require('promise-toolbox')

const { openVhd, VhdDirectory } = require('..')
const { createRandomFile, convertFromRawToVhd, convertToVhdDirectory } = require('../tests/utils')

let tempDir = null
let handler
let disposeHandler

describe('VhdDirectory', async () => {
  beforeEach(async () => {
    tempDir = await pFromCallback(cb => tmp.dir(cb))
    const d = await getSyncedHandler({ url: `file://${tempDir}` })
    handler = d.value
    disposeHandler = d.dispose
  })

  afterEach(async () => {
    await rimraf(tempDir)
    disposeHandler()
  })

  it('Can coalesce block', async () => {
    const initalSize = 4
    const parentrawFileName = `${tempDir}/randomfile`
    const parentFileName = `${tempDir}/parent.vhd`
    const parentDirectoryName = `${tempDir}/parent.dir.vhd`

    await createRandomFile(parentrawFileName, initalSize)
    await convertFromRawToVhd(parentrawFileName, parentFileName)
    await convertToVhdDirectory(parentrawFileName, parentFileName, parentDirectoryName)

    const childrawFileName = `${tempDir}/randomfile`
    const childFileName = `${tempDir}/childFile.vhd`
    await createRandomFile(childrawFileName, initalSize)
    await convertFromRawToVhd(childrawFileName, childFileName)
    const childRawDirectoryName = `${tempDir}/randomFile2.vhd`
    const childDirectoryFileName = `${tempDir}/childDirFile.vhd`
    const childDirectoryName = `${tempDir}/childDir.vhd`
    await createRandomFile(childRawDirectoryName, initalSize)
    await convertFromRawToVhd(childRawDirectoryName, childDirectoryFileName)
    await convertToVhdDirectory(childRawDirectoryName, childDirectoryFileName, childDirectoryName)

    await Disposable.use(async function* () {
      const parentVhd = yield openVhd(handler, 'parent.dir.vhd', { flags: 'w' })
      await parentVhd.readBlockAllocationTable()
      const childFileVhd = yield openVhd(handler, 'childFile.vhd')
      await childFileVhd.readBlockAllocationTable()
      const childDirectoryVhd = yield openVhd(handler, 'childDir.vhd')
      await childDirectoryVhd.readBlockAllocationTable()

      let childBlockData = (await childDirectoryVhd.readBlock(0)).data
      await parentVhd.mergeBlock(childDirectoryVhd, 0)
      await parentVhd.writeFooter()
      await parentVhd.writeBlockAllocationTable()
      let parentBlockData = (await parentVhd.readBlock(0)).data
      // block should be present in parent
      assert.equal(parentBlockData.equals(childBlockData), true)
      // block should not be in child since it's a rename  for vhd directory
      await assert.rejects(childDirectoryVhd.readBlock(0))

      childBlockData = (await childFileVhd.readBlock(1)).data
      await parentVhd.mergeBlock(childFileVhd, 1)
      await parentVhd.writeFooter()
      await parentVhd.writeBlockAllocationTable()
      parentBlockData = (await parentVhd.readBlock(1)).data
      // block should be present in parent in case of mixed vhdfile/vhddirectory
      assert.equal(parentBlockData.equals(childBlockData), true)
      // block should still be child
      await childFileVhd.readBlock(1)
    })
  })

  it('compresses blocks and metadata works', async () => {
    const initalSize = 4
    const rawFileName = `${tempDir}/randomfile`
    const vhdName = `${tempDir}/parent.vhd`

    await createRandomFile(rawFileName, initalSize)
    await convertFromRawToVhd(rawFileName, vhdName)
    await Disposable.use(async function* () {
      const vhd = yield openVhd(handler, 'parent.vhd')
      await vhd.readBlockAllocationTable()
      const compressedVhd = yield VhdDirectory.create(handler, 'compressed.vhd', { compression: 'gzip' })
      compressedVhd.header = vhd.header
      compressedVhd.footer = vhd.footer
      for await (const block of vhd.blocks()) {
        await compressedVhd.writeEntireBlock(block)
      }
      await Promise.all[
        (await compressedVhd.writeHeader(),
        await compressedVhd.writeFooter(),
        await compressedVhd.writeBlockAllocationTable())
      ]

      // compressed vhd have a metadata file
      assert.equal(await fs.exists(`${tempDir}/compressed.vhd/chunk-filters.json`), true)
      const metadata = JSON.parse(await handler.readFile('compressed.vhd/chunk-filters.json'))
      assert.equal(metadata[0], 'gzip')

      // compressed vhd should not be broken
      await compressedVhd.readHeaderAndFooter()
      await compressedVhd.readBlockAllocationTable()

      // check that footer and header are not modified
      assert.deepEqual(compressedVhd.footer, vhd.footer)
      assert.deepEqual(compressedVhd.header, vhd.header)

      // their block content should not have changed
      let counter = 0
      for await (const block of compressedVhd.blocks()) {
        const source = await vhd.readBlock(block.id)
        assert.equal(source.data.equals(block.data), true)
        counter++
      }
      // neither the number of blocks
      assert.equal(counter, 2)
    })
  })
})
