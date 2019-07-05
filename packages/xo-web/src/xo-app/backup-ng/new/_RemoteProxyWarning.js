import _ from 'intl'
import addSubscriptions from 'add-subscriptions'
import decorate from 'apply-decorators'
import Icon from 'icon'
import PropTypes from 'prop-types'
import React from 'react'
import Tooltip from 'tooltip'
import { injectState, provideState } from 'reaclette'
import { keyBy } from 'lodash'
import { subscribeRemotes } from 'xo'

const RemoteProxyWarning = decorate([
  addSubscriptions({
    remotes: cb =>
      subscribeRemotes(remotes => {
        cb(keyBy(remotes, 'id'))
      }),
  }),
  provideState({
    computed: {
      showWarning: (_, { id, proxyId, remotes = {} }) => {
        const remote = remotes[id]
        if (proxyId === null) {
          proxyId = undefined
        }
        return remote !== undefined && remote.proxy !== proxyId
      },
    },
  }),
  injectState,
  ({ state }) =>
    state.showWarning ? (
      <Tooltip content={_('remoteNotCompatibleWithSelectedProxy')}>
        <Icon icon='alarm' color='text-danger' />
      </Tooltip>
    ) : null,
])

RemoteProxyWarning.propTypes = {
  id: PropTypes.string.isRequired,
  proxyId: PropTypes.string,
}

export { RemoteProxyWarning as default }
