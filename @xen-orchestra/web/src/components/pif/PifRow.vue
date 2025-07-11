<template>
  <tr class="pif-row" :class="{ clickable: pifHost }" @click="pifHost?.redirect()">
    <td v-tooltip class="typo-body-regular-small text-ellipsis host-container">
      <div v-if="pifHost" class="host">
        <UiObjectIcon :state="pifHost.powerState" type="host" size="small" />
        <span v-tooltip class="typo-body-regular-small text-ellipsis host-name">
          {{ pifHost.label }}
        </span>
      </div>
      <div v-else>
        <span>{{ t('host-unknown') }}</span>
      </div>
    </td>
    <td v-tooltip class="typo-body-regular-small text-ellipsis device">{{ pif.device }}</td>
    <td v-tooltip class="typo-body-regular-small status">
      <VtsConnectionStatus :status />
    </td>
    <td>
      <UiButtonIcon size="small" accent="brand" :icon="faAngleRight" :disabled="!pifHost" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useHostStore } from '@/stores/xo-rest-api/host.store'
import { usePifStore } from '@/stores/xo-rest-api/pif.store'
import { HOST_POWER_STATE } from '@/types/xo/host.type'
import type { XoPif } from '@/types/xo/pif.type'
import VtsConnectionStatus from '@core/components/connection-status/VtsConnectionStatus.vue'
import UiButtonIcon from '@core/components/ui/button-icon/UiButtonIcon.vue'
import UiObjectIcon from '@core/components/ui/object-icon/UiObjectIcon.vue'
import { vTooltip } from '@core/directives/tooltip.directive'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { pif } = defineProps<{
  pif: XoPif
}>()

const { t } = useI18n()

const { get } = useHostStore().subscribe()
const { getPifStatus } = usePifStore().subscribe()

const router = useRouter()

const status = computed(() => getPifStatus(pif))

const pifHost = computed(() => {
  const host = get(pif.$host)

  if (!host) {
    return
  }

  return {
    label: host.name_label,
    powerState: host.power_state === HOST_POWER_STATE.RUNNING ? 'running' : 'halted',
    redirect() {
      router.push({
        name: '/host/[id]/networks',
        params: { id: host.id },
        query: { id: pif.id },
      })
    },
  } as const
})
</script>

<style lang="postcss" scoped>
.pif-row {
  &.clickable {
    cursor: pointer;

    &:hover {
      background-color: var(--color-brand-background-hover);
    }
  }

  td {
    color: var(--color-neutral-txt-primary);
  }

  .host-container {
    max-width: 14rem;

    .host {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .host-name {
      color: var(--color-brand-txt-base);
    }
  }

  .device {
    width: 8rem;
    max-width: 8rem;
  }

  .status {
    width: 12rem;
    max-width: 12rem;
  }
}
</style>
