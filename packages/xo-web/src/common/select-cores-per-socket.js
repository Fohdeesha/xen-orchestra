import _ from 'intl'
import PropTypes from 'prop-types'
import React from 'react'
import { injectState, provideState } from 'reaclette'
import { omit } from 'lodash'

import decorate from './apply-decorators'
import Icon from './icon'
import { Select } from './form'

const PROP_TYPES = {
  maxCores: PropTypes.number,
  maxVcpus: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  vCpus: PropTypes.number,
}

const SelectCoresPerSocket = decorate([
  provideState({
    computed: {
      options: (state, { maxCores, maxVcpus, value, vCpus }) => {
        const options = [
          {
            label: _('vmChooseCoresPerSocket'),
            value: '',
          },
        ]

        if (
          maxCores === undefined ||
          maxVcpus === undefined ||
          vCpus === undefined
        ) {
          return options
        }

        const ratio = vCpus / maxVcpus

        let isSelectedValueInOptions = value === ''
        for (
          let coresPerSocket = maxCores;
          coresPerSocket >= ratio;
          coresPerSocket--
        ) {
          if (vCpus % coresPerSocket === 0) {
            options.push({
              label: _('vmCoresPerSocket', {
                nSockets: vCpus / coresPerSocket,
                nCores: coresPerSocket,
              }),
              value: String(coresPerSocket),
            })
            if (!isSelectedValueInOptions) {
              isSelectedValueInOptions = coresPerSocket === +value
            }
          }
        }

        if (!isSelectedValueInOptions) {
          options.push({
            label: (
              <span>
                {_('vmCoresPerSocket', {
                  nSockets: vCpus / +value,
                  nCores: +value,
                })}{' '}
                (<span className='text-danger'>
                  <Icon icon='error' /> {_('vmCoresPerSocketInvalidValue')}
                </span>)
              </span>
            ),
            value,
          })
        }
        return options
      },
      selectProps: (_, { props }) => omit(props, Object.keys(PROP_TYPES)),
    },
  }),
  injectState,
  ({ state, onChange, value }) => (
    <Select
      onChange={onChange}
      options={state.options}
      required
      simpleValue
      value={value}
      {...state.selectProps}
    />
  ),
])

SelectCoresPerSocket.propTypes = PROP_TYPES

export { SelectCoresPerSocket as default }
