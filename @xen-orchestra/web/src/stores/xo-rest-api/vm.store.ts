import { useHostStore } from '@/stores/xo-rest-api/host.store.ts'
import type { XoHost } from '@/types/xo/host.type'
import type { XoPool } from '@/types/xo/pool.type'
import type { XoVm } from '@/types/xo/vm.type'
import { VM_OPERATION, VM_POWER_STATE } from '@/types/xo/vm.type'
import { createXoStoreConfig } from '@/utils/create-xo-store-config.util'
import { createSubscribableStoreContext } from '@core/utils/create-subscribable-store-context.util'
import { sortByNameLabel } from '@core/utils/sort-by-name-label.util'
import { castArray } from 'lodash-es'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useVmStore = defineStore('vm', () => {
  const deps = {
    hostStore: useHostStore(),
  }

  const hostContext = deps.hostStore.getContext()

  const { context: baseContext, ...configRest } = createXoStoreConfig('vm', {
    sortBy: sortByNameLabel,
  })

  const runningVms = computed(() => baseContext.records.value.filter(vm => vm.power_state === VM_POWER_STATE.RUNNING))

  const vmsByHost = computed(() => createVmsMap(baseContext.records.value, false))

  const hostLessVmsByPool = computed(() => createVmsMap(baseContext.records.value, true))

  const isVmOperatingPending = (vm: XoVm, operations: VM_OPERATION[] | VM_OPERATION) => {
    const currentOperations = Object.values(vm.current_operations)

    return castArray(operations).some(operation => currentOperations.includes(operation))
  }

  const getVmHost = (vm: XoVm): XoHost | undefined => {
    const vmHostId = extractVmHostId(vm)

    if (vmHostId === undefined) {
      return undefined
    }

    return hostContext.get(vmHostId)
  }

  const context = {
    ...baseContext,
    runningVms,
    vmsByHost,
    getVmHost,
    hostLessVmsByPool,
    isVmOperatingPending,
  }

  return createSubscribableStoreContext({ context, ...configRest }, {})
})

function createVmsMap<THostLess extends boolean>(vms: XoVm[], hostLess: THostLess) {
  const vmsMap = new Map<THostLess extends true ? XoPool['id'] : XoHost['id'], XoVm[]>()

  vms.forEach(vm => {
    const hasHost = vm.$container !== vm.$pool

    if (hasHost && hostLess) {
      return
    }

    const id = vm.$container as THostLess extends true ? XoPool['id'] : XoHost['id']

    if (!vmsMap.has(id)) {
      vmsMap.set(id, [])
    }

    vmsMap.get(id)!.push(vm)
  })

  return vmsMap
}

function extractVmHostId(vm: XoVm) {
  return vm.$container === vm.$pool ? undefined : (vm.$container as XoHost['id'])
}
