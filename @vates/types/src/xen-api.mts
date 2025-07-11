import type {
  AFTER_APPLY_GUIDANCE,
  ALLOCATION_ALGORITHM,
  BOND_MODE,
  Branded,
  CERTIFICATE_TYPE,
  CLS,
  CLUSTER_HOST_OPERATION,
  CLUSTER_OPERATION,
  CONSOLE_PROTOCOL,
  DOMAIN_TYPE,
  EVENT_OPERATION,
  HOST_ALLOWED_OPERATIONS,
  HOST_DISPLAY,
  HOST_NUMA_AFFINITY_POLICY,
  IP_CONFIGURATION_MODE,
  IPV6_CONFIGURATION_MODE,
  LATEST_SYNCED_UPDATES_APPLIED_STATE,
  NETWORK_DEFAULT_LOCKING_MODE,
  NETWORK_OPERATIONS,
  NETWORK_PURPOSE,
  ON_BOOT,
  ON_CRASH_BEHAVIOUR,
  ON_NORMAL_EXIT,
  ON_SOFTREBOOT_BEHAVIOR,
  OPAQUE_REF_NULL,
  PERSISTENCE_BACKEND,
  PGPU_DOM0_ACCESS,
  PIF_IGMP_STATUS,
  POOL_ALLOWED_OPERATIONS,
  PRIMARY_ADDRESS_TYPE,
  PVS_PROXY_STATUS,
  SDN_CONTROLLER_PROTOCOL,
  SR_HEALTH,
  SRIOV_CONFIGURATION_MODE,
  STORAGE_OPERATIONS,
  TASK_ALLOWED_OPERATIONS,
  TASK_STATUS_TYPE,
  TELEMETRY_FREQUENCY,
  TRISTATE_TYPE,
  TUNNEL_PROTOCOL,
  UPDATE_AFTER_APPLY_GUIDANCE,
  UPDATE_GUIDANCES,
  UPDATE_SYNC_FREQUENCY,
  VBD_MODE,
  VBD_OPERATIONS,
  VBD_TYPE,
  VDI_OPERATIONS,
  VDI_TYPE,
  VGPU_TYPE_IMPLEMENTATION,
  VIF_IPV4_CONFIGURATION_MODE,
  VIF_IPV6_CONFIGURATION_MODE,
  VIF_LOCKING_MODE,
  VIF_OPERATIONS,
  VM_APPLIANCE_OPERATION,
  VM_OPERATIONS,
  VM_POWER_STATE,
  VMPP_ARCHIVE_FREQUENCY,
  VMPP_ARCHIVE_TARGET_TYPE,
  VMPP_BACKUP_FREQUENCY,
  VMPP_BACKUP_TYPE,
  VMSS_FREQUENCY,
  VMSS_TYPE,
  VTPM_OPERATIONS,
  VUSB_OPERATIONS,
} from './common.mjs'
import type { Xapi } from './lib/xen-orchestra-xapi.mjs'

// types automatically generated by the @ByScripts script.
// https://github.com/vatesfr/xen-orchestra/tree/wip-xapi-types-generator/%40xen-orchestra/xapi-generator
// All properties added after XenServer 7.0 (dundee) release have been marked as optional

/**
 * Add properties injected by `xen-api`.
 * $ref property is also injected by XOLite, so she is not present here.
 */
type WrapperXenApi<T, Type extends string, Fn = { (): void }> = T & {
  $call: Fn
  $callAsync: Fn
  $type: Type
  $snapshot(params: {
    cancelToken?: unknown
    ignoredVdisTag?: string
    name_label?: string
    unplugVusbs?: boolean
  }): Promise<XenApiVm['$ref']>
  $xapi: Xapi
}

export interface XenApiSession {
  $ref: Branded<'session'>
  auth_user_name: string
  auth_user_sid: string
  client_certificate?: boolean
  is_local_superuser: boolean
  last_active: string
  originator: string
  other_config: Record<string, string>
  parent: XenApiSession['$ref'] | OPAQUE_REF_NULL
  pool: boolean
  rbac_permissions: string[]
  subject: XenApiSubject['$ref'] | OPAQUE_REF_NULL
  tasks: XenApiTask['$ref'][]
  this_host: XenApiHost['$ref']
  this_user: XenApiUser['$ref']
  uuid: string
  validation_time: string
}

export interface XenApiAuth {
  $ref: Branded<'auth'>
}

export interface XenApiSubject {
  $ref: Branded<'subject'>
  other_config: Record<string, string>
  roles: XenApiRole['$ref'][]
  subject_identifier: string
  uuid: string
}

export interface XenApiRole {
  $ref: Branded<'role'>
  is_internal?: boolean
  name_description: string
  name_label: string
  subroles: XenApiRole['$ref'][]
  uuid: string
}

export interface XenApiTask {
  $ref: Branded<'task'>
  allowed_operations: TASK_ALLOWED_OPERATIONS[]
  backtrace: string
  created: string
  current_operations: Record<string, TASK_ALLOWED_OPERATIONS>
  error_info: string[]
  finished: string
  name_description: string
  name_label: string
  other_config: Record<string, string>
  progress: number
  resident_on: XenApiHost['$ref']
  result: string
  status: TASK_STATUS_TYPE
  subtask_of: XenApiTask['$ref'] | OPAQUE_REF_NULL
  subtasks: XenApiTask['$ref'][]
  type: string
  uuid: string
}

export interface XenApiEvent {
  $ref: Branded<'event'>
  class: string
  id: number
  /** @deprecated */
  obj_uuid?: string
  operation: EVENT_OPERATION
  ref: string
  snapshot: object
  /** @deprecated */
  timestamp?: string
}

export interface XenApiPool {
  $ref: Branded<'pool'>
  allowed_operations: POOL_ALLOWED_OPERATIONS[]
  blobs: Record<string, XenApiBlob['$ref']>
  client_certificate_auth_enabled?: boolean
  client_certificate_auth_name?: string
  coordinator_bias: boolean
  cpu_info: Record<string, string>
  crash_dump_SR: XenApiSr['$ref'] | OPAQUE_REF_NULL
  current_operations: Record<string, POOL_ALLOWED_OPERATIONS>
  custom_uefi_certificates?: string
  default_SR: XenApiSr['$ref'] | OPAQUE_REF_NULL
  ext_auth_max_threads?: number
  guest_agent_config: Record<string, string>
  gui_config: Record<string, string>
  ha_allow_overcommit: boolean
  ha_cluster_stack: string
  ha_configuration: Record<string, string>
  ha_enabled: boolean
  ha_host_failures_to_tolerate: number
  ha_overcommitted: boolean
  ha_plan_exists_for: number
  ha_statefiles: string[]
  health_check_config: Record<string, string>
  igmp_snooping_enabled?: boolean
  is_psr_pending?: boolean
  last_update_sync?: string
  live_patching_disabled?: boolean
  local_auth_max_threads?: number
  master: XenApiHost['$ref']
  metadata_VDIs: XenApiVdi['$ref'][]
  migration_compression?: boolean
  name_description: string
  name_label: string
  other_config: Record<string, string>
  policy_no_vendor_device: boolean
  redo_log_enabled: boolean
  redo_log_vdi: XenApiVdi['$ref'] | OPAQUE_REF_NULL
  repositories?: XenApiRepository['$ref'][]
  repository_proxy_password?: XenApiSecret['$ref'] | OPAQUE_REF_NULL
  repository_proxy_url?: string
  repository_proxy_username?: string
  restrictions: Record<string, string>
  suspend_image_SR: XenApiSr['$ref'] | OPAQUE_REF_NULL
  tags: string[]
  telemetry_frequency?: TELEMETRY_FREQUENCY
  telemetry_next_collection?: string
  telemetry_uuid?: XenApiSecret['$ref'] | OPAQUE_REF_NULL
  tls_verification_enabled?: boolean
  uefi_certificates?: string
  update_sync_day?: number
  update_sync_enabled?: boolean
  update_sync_frequency?: UPDATE_SYNC_FREQUENCY
  uuid: string
  /** @deprecated */
  vswitch_controller?: string
  wlb_enabled: boolean
  wlb_url: string
  wlb_username: string
  /** @deprecated */
  wlb_verify_cert?: boolean
}
export type XenApiPoolWrapped = WrapperXenApi<XenApiPool, 'pool'>

/** @deprecated */
export interface XenApiPoolPatch {
  $ref: Branded<'pool_patch'>
  after_apply_guidance: AFTER_APPLY_GUIDANCE[]
  host_patches: XenApiHostPatch['$ref'][]
  name_description: string
  name_label: string
  other_config: Record<string, string>
  pool_applied: boolean
  pool_update?: XenApiPoolUpdate['$ref'] | OPAQUE_REF_NULL
  size: number
  uuid: string
  version: string
}

export interface XenApiPoolUpdate {
  $ref: Branded<'pool_update'>
  after_apply_guidance?: UPDATE_AFTER_APPLY_GUIDANCE[]
  enforce_homogeneity?: boolean
  hosts?: XenApiHost['$ref'][]
  installation_size?: number
  key?: string
  name_description: string
  name_label: string
  other_config?: Record<string, string>
  uuid: string
  vdi: XenApiVdi['$ref']
  version?: string
}

type XenApiVmCallMethods = {
  (method: 'start', start_paused: boolean, force: boolean): Promise<void>
  (method: 'clean_shutdown'): Promise<void>
  (method: 'hard_shutdown'): Promise<void>
  (method: 'clean_reboot'): Promise<void>
  (method: 'hard_reboot'): Promise<void>
  (method: 'pause'): Promise<void>
  (method: 'suspend'): Promise<void>
  (method: 'record_data_source', dataSource: string): Promise<void>
  (method: 'forget_data_source_archives', dataSource: string): Promise<void>
}
export interface XenApiVm {
  $ref: Branded<'VM'>
  actions_after_crash: ON_CRASH_BEHAVIOUR
  actions_after_reboot: ON_NORMAL_EXIT
  actions_after_shutdown: ON_NORMAL_EXIT
  actions_after_softreboot?: ON_SOFTREBOOT_BEHAVIOR
  affinity: XenApiHost['$ref'] | OPAQUE_REF_NULL
  allowed_operations: VM_OPERATIONS[]
  appliance: XenApiVmAppliance['$ref'] | OPAQUE_REF_NULL
  attached_PCIs: XenApiPci['$ref'][]
  bios_strings: Record<string, string>
  blobs: Record<string, XenApiBlob['$ref']>
  blocked_operations: Record<VM_OPERATIONS, string>
  children: XenApiVm['$ref'][]
  consoles: XenApiConsole['$ref'][]
  crash_dumps: XenApiCrashdump['$ref'][]
  current_operations: Record<string, VM_OPERATIONS>
  domain_type?: DOMAIN_TYPE
  domarch: string
  domid: number
  generation_id: string
  guest_metrics: XenApiVmGuestMetrics['$ref'] | OPAQUE_REF_NULL
  /** @deprecated */
  ha_always_run?: boolean
  ha_restart_priority: string
  hardware_platform_version: number
  has_vendor_device: boolean
  HVM_boot_params: Record<string, string>
  /** @deprecated */
  HVM_boot_policy?: string
  HVM_shadow_multiplier: number
  is_a_snapshot: boolean
  is_a_template: boolean
  is_control_domain: boolean
  is_default_template?: boolean
  /** @deprecated */
  is_snapshot_from_vmpp?: boolean
  is_vmss_snapshot?: boolean
  last_boot_CPU_flags: Record<string, string>
  last_booted_record: string
  memory_dynamic_max: number
  memory_dynamic_min: number
  memory_overhead: number
  memory_static_max: number
  memory_static_min: number
  /** @deprecated */
  memory_target?: number
  metrics: XenApiVmMetrics['$ref']
  name_description: string
  name_label: string
  NVRAM?: Record<string, string>
  order: number
  other_config: Record<string, string>
  parent: XenApiVm['$ref'] | OPAQUE_REF_NULL
  /** @deprecated */
  PCI_bus?: string
  pending_guidances_full?: UPDATE_GUIDANCES[]
  pending_guidances_recommended?: UPDATE_GUIDANCES[]
  pending_guidances?: UPDATE_GUIDANCES[]
  platform: Record<string, string>
  power_state: VM_POWER_STATE
  /** @deprecated */
  protection_policy?: XenApiVmpp['$ref'] | OPAQUE_REF_NULL
  PV_args: string
  PV_bootloader_args: string
  PV_bootloader: string
  PV_kernel: string
  PV_legacy_args: string
  PV_ramdisk: string
  recommendations: string
  reference_label?: string
  requires_reboot?: boolean
  resident_on: XenApiHost['$ref'] | OPAQUE_REF_NULL
  scheduled_to_be_resident_on: XenApiHost['$ref'] | OPAQUE_REF_NULL
  shutdown_delay: number
  snapshot_info: Record<string, string>
  snapshot_metadata: string
  snapshot_of: XenApiVm['$ref'] | OPAQUE_REF_NULL
  snapshot_schedule?: XenApiVmss['$ref'] | OPAQUE_REF_NULL
  snapshot_time: string
  snapshots: XenApiVm['$ref'][]
  start_delay: number
  suspend_SR: XenApiSr['$ref'] | OPAQUE_REF_NULL
  suspend_VDI: XenApiVdi['$ref'] | OPAQUE_REF_NULL
  tags: string[]
  transportable_snapshot_id: string
  user_version: number
  uuid: string
  VBDs: XenApiVbd['$ref'][]
  VCPUs_at_startup: number
  VCPUs_max: number
  VCPUs_params: Record<string, string>
  version: number
  VGPUs: XenApiVgpu['$ref'][]
  VIFs: XenApiVif['$ref'][]
  VTPMs: XenApiVtpm['$ref'][]
  VUSBs: XenApiVusb['$ref'][]
  xenstore_data: Record<string, string>
}
export type XenApiVmWrapped = WrapperXenApi<XenApiVm, 'VM', XenApiVmCallMethods>

export interface XenApiVmMetrics {
  $ref: Branded<'VM_metrics'>
  current_domain_type?: DOMAIN_TYPE
  hvm?: boolean
  install_time: string
  last_updated: string
  memory_actual: number
  nested_virt?: boolean
  nomigrate?: boolean
  other_config: Record<string, string>
  start_time: string
  state: string[]
  uuid: string
  VCPUs_CPU: Record<number, number>
  VCPUs_flags: Record<number, string[]>
  VCPUs_number: number
  VCPUs_params: Record<string, string>
  /** @deprecated */
  VCPUs_utilisation?: Record<number, number>
}

export interface XenApiVmGuestMetrics {
  $ref: Branded<'VM_guest_metrics'>
  can_use_hotplug_vbd: TRISTATE_TYPE
  can_use_hotplug_vif: TRISTATE_TYPE
  /** @deprecated */
  disks?: Record<string, string>
  last_updated: string
  live: boolean
  /** @deprecated */
  memory?: Record<string, string>
  networks: Record<string, string>
  os_version: Record<string, string>
  other_config: Record<string, string>
  other: Record<string, string>
  PV_drivers_detected: boolean
  /** @deprecated */
  PV_drivers_up_to_date?: boolean
  PV_drivers_version: Record<string, string>
  uuid: string
}

/** @deprecated */
export interface XenApiVmpp {
  $ref: Branded<'VMPP'>
  /** @deprecated */
  alarm_config?: Record<string, string>
  /** @deprecated */
  archive_frequency?: VMPP_ARCHIVE_FREQUENCY
  /** @deprecated */
  archive_last_run_time?: string
  /** @deprecated */
  archive_schedule?: Record<string, string>
  /** @deprecated */
  archive_target_config?: Record<string, string>
  /** @deprecated */
  archive_target_type?: VMPP_ARCHIVE_TARGET_TYPE
  /** @deprecated */
  backup_frequency?: VMPP_BACKUP_FREQUENCY
  /** @deprecated */
  backup_last_run_time?: string
  /** @deprecated */
  backup_retention_value?: number
  /** @deprecated */
  backup_schedule?: Record<string, string>
  /** @deprecated */
  backup_type?: VMPP_BACKUP_TYPE
  /** @deprecated */
  is_alarm_enabled?: boolean
  /** @deprecated */
  is_archive_running?: boolean
  /** @deprecated */
  is_backup_running?: boolean
  /** @deprecated */
  is_policy_enabled?: boolean
  name_description: string
  name_label: string
  /** @deprecated */
  recent_alerts?: string[]
  /** @deprecated */
  uuid?: string
  /** @deprecated */
  VMs?: XenApiVm['$ref'][]
}

export interface XenApiVmss {
  $ref: Branded<'VMSS'>
  enabled: boolean
  frequency: VMSS_FREQUENCY
  last_run_time: string
  name_description: string
  name_label: string
  retained_snapshots: number
  schedule: Record<string, string>
  type: VMSS_TYPE
  uuid: string
  VMs: XenApiVm['$ref'][]
}

export interface XenApiVmAppliance {
  $ref: Branded<'VM_appliance'>
  allowed_operations: VM_APPLIANCE_OPERATION[]
  current_operations: Record<string, VM_APPLIANCE_OPERATION>
  name_description: string
  name_label: string
  uuid: string
  VMs: XenApiVm['$ref'][]
}

export interface XenApiDrTask {
  $ref: Branded<'DR_task'>
  introduced_SRs: XenApiSr['$ref'][]
  uuid: string
}

export interface XenApiHost {
  $ref: Branded<'host'>
  address: string
  allowed_operations: HOST_ALLOWED_OPERATIONS[]
  API_version_major: number
  API_version_minor: number
  API_version_vendor_implementation: Record<string, string>
  API_version_vendor: string
  bios_strings: Record<string, string>
  blobs: Record<string, XenApiBlob['$ref']>
  capabilities: string[]
  certificates?: XenApiCertificate['$ref'][]
  chipset_info: Record<string, string>
  control_domain?: XenApiVm['$ref'] | OPAQUE_REF_NULL
  cpu_configuration: Record<string, string>
  cpu_info: Record<string, string>
  crash_dump_sr: XenApiSr['$ref'] | OPAQUE_REF_NULL
  crashdumps: XenApiHostCrashdump['$ref'][]
  current_operations: Record<string, HOST_ALLOWED_OPERATIONS>
  display: HOST_DISPLAY
  edition: string
  editions?: string[]
  enabled: boolean
  external_auth_configuration: Record<string, string>
  external_auth_service_name: string
  external_auth_type: string
  features?: XenApiFeature['$ref'][]
  guest_VCPUs_params: Record<string, string>
  ha_network_peers: string[]
  ha_statefiles: string[]
  host_CPUs: XenApiHostCpu['$ref'][]
  hostname: string
  https_only?: boolean
  iscsi_iqn?: string
  last_software_update?: string
  last_update_hash?: string
  latest_synced_updates_applied?: LATEST_SYNCED_UPDATES_APPLIED_STATE
  license_params: Record<string, string>
  license_server: Record<string, string>
  local_cache_sr: XenApiSr['$ref'] | OPAQUE_REF_NULL
  logging: Record<string, string>
  memory_overhead: number
  metrics: XenApiHostMetrics['$ref']
  multipathing?: boolean
  name_description: string
  name_label: string
  numa_affinity_policy?: HOST_NUMA_AFFINITY_POLICY
  other_config: Record<string, string>
  /** @deprecated */
  patches?: XenApiHostPatch['$ref'][]
  PBDs: XenApiPbd['$ref'][]
  PCIs: XenApiPci['$ref'][]
  pending_guidances_full?: UPDATE_GUIDANCES[]
  pending_guidances_recommended?: UPDATE_GUIDANCES[]
  pending_guidances?: UPDATE_GUIDANCES[]
  PGPUs: XenApiPgpu['$ref'][]
  PIFs: XenApiPif['$ref'][]
  power_on_config: Record<string, string>
  power_on_mode: string
  PUSBs?: XenApiPusb['$ref'][]
  resident_VMs: XenApiVm['$ref'][]
  sched_policy: string
  software_version: Record<string, string>
  /** @deprecated */
  ssl_legacy?: boolean
  supported_bootloaders: string[]
  suspend_image_sr: XenApiSr['$ref'] | OPAQUE_REF_NULL
  tags: string[]
  tls_verification_enabled?: boolean
  /** @deprecated */
  uefi_certificates?: string
  updates_requiring_reboot?: XenApiPoolUpdate['$ref'][]
  updates?: XenApiPoolUpdate['$ref'][]
  uuid: string
  virtual_hardware_platform_versions: number[]
}
export type XenApiHostWrapped = WrapperXenApi<XenApiHost, 'host'>

export interface XenApiHostCrashdump {
  $ref: Branded<'host_crashdump'>
  host: XenApiHost['$ref']
  other_config: Record<string, string>
  size: number
  timestamp: string
  uuid: string
}

/** @deprecated */
export interface XenApiHostPatch {
  $ref: Branded<'host_patch'>
  applied: boolean
  host: XenApiHost['$ref']
  name_description: string
  name_label: string
  other_config: Record<string, string>
  pool_patch: XenApiPoolPatch['$ref'] | OPAQUE_REF_NULL
  size: number
  timestamp_applied: string
  uuid: string
  version: string
}

export interface XenApiHostMetrics {
  $ref: Branded<'host_metrics'>
  last_updated: string
  live: boolean
  /** @deprecated */
  memory_free?: number
  memory_total: number
  other_config: Record<string, string>
  uuid: string
}

/** @deprecated */
export interface XenApiHostCpu {
  $ref: Branded<'host_cpu'>
  family: number
  features: string
  flags: string
  host: XenApiHost['$ref']
  model: number
  modelname: string
  number: number
  other_config: Record<string, string>
  speed: number
  stepping: string
  utilisation: number
  uuid: string
  vendor: string
}

export interface XenApiNetwork {
  $ref: Branded<'network'>
  allowed_operations: NETWORK_OPERATIONS[]
  assigned_ips: Record<XenApiVif['$ref'], string>
  blobs: Record<string, XenApiBlob['$ref']>
  bridge: string
  current_operations: Record<string, NETWORK_OPERATIONS>
  default_locking_mode: NETWORK_DEFAULT_LOCKING_MODE
  managed?: boolean
  MTU: number
  name_description: string
  name_label: string
  other_config: Record<string, string>
  PIFs: XenApiPif['$ref'][]
  purpose?: NETWORK_PURPOSE[]
  tags: string[]
  uuid: string
  VIFs: XenApiVif['$ref'][]
}
export interface XenApiNetworkWrapped extends WrapperXenApi<XenApiNetwork, 'network'> {}

export interface XenApiVif {
  $ref: Branded<'VIF'>
  allowed_operations: VIF_OPERATIONS[]
  current_operations: Record<string, VIF_OPERATIONS>
  currently_attached: boolean
  device: string
  ipv4_addresses: string[]
  ipv4_allowed: string[]
  ipv4_configuration_mode: VIF_IPV4_CONFIGURATION_MODE
  ipv4_gateway: string
  ipv6_addresses: string[]
  ipv6_allowed: string[]
  ipv6_configuration_mode: VIF_IPV6_CONFIGURATION_MODE
  ipv6_gateway: string
  locking_mode: VIF_LOCKING_MODE
  MAC_autogenerated: boolean
  MAC: string
  /** @deprecated */
  metrics?: XenApiVifMetrics['$ref'] | OPAQUE_REF_NULL
  MTU: number
  network: XenApiNetwork['$ref']
  other_config: Record<string, string>
  qos_algorithm_params: Record<string, string>
  qos_algorithm_type: string
  qos_supported_algorithms: string[]
  runtime_properties: Record<string, string>
  status_code: number
  status_detail: string
  uuid: string
  VM: XenApiVm['$ref']
}
export type XenApiVifWrapped = WrapperXenApi<XenApiVif, 'VIF'>

/** @deprecated */
export interface XenApiVifMetrics {
  $ref: Branded<'VIF_metrics'>
  /** @deprecated */
  io_read_kbs?: number
  /** @deprecated */
  io_write_kbs?: number
  last_updated: string
  other_config: Record<string, string>
  uuid: string
}

export interface XenApiPif {
  $ref: Branded<'PIF'>
  bond_master_of: XenApiBond['$ref'][]
  bond_slave_of: XenApiBond['$ref'] | OPAQUE_REF_NULL
  capabilities: string[]
  currently_attached: boolean
  device: string
  disallow_unplug: boolean
  DNS: string
  gateway: string
  host: XenApiHost['$ref']
  igmp_snooping_status?: PIF_IGMP_STATUS
  ip_configuration_mode: IP_CONFIGURATION_MODE
  IP: string
  ipv6_configuration_mode: IPV6_CONFIGURATION_MODE
  ipv6_gateway: string
  IPv6: string[]
  MAC: string
  managed: boolean
  management: boolean
  metrics: XenApiPifMetrics['$ref']
  MTU: number
  netmask: string
  network: XenApiNetwork['$ref']
  other_config: Record<string, string>
  PCI?: XenApiPci['$ref'] | OPAQUE_REF_NULL
  physical: boolean
  primary_address_type: PRIMARY_ADDRESS_TYPE
  properties: Record<string, string>
  sriov_logical_PIF_of?: XenApiNetworkSriov['$ref'][]
  sriov_physical_PIF_of?: XenApiNetworkSriov['$ref'][]
  tunnel_access_PIF_of: XenApiTunnel['$ref'][]
  tunnel_transport_PIF_of: XenApiTunnel['$ref'][]
  uuid: string
  VLAN_master_of: XenApiVlan['$ref'] | OPAQUE_REF_NULL
  VLAN_slave_of: XenApiVlan['$ref'][]
  VLAN: number
}
export type XenApiPifWrapped = WrapperXenApi<XenApiPif, 'PIF'>

export interface XenApiPifMetrics {
  $ref: Branded<'PIF_metrics'>
  carrier: boolean
  device_id: string
  device_name: string
  duplex: boolean
  /** @deprecated */
  io_read_kbs?: number
  /** @deprecated */
  io_write_kbs?: number
  last_updated: string
  other_config: Record<string, string>
  pci_bus_path: string
  speed: number
  uuid: string
  vendor_id: string
  vendor_name: string
}

export interface XenApiBond {
  $ref: Branded<'Bond'>
  auto_update_mac?: boolean
  links_up: number
  master: XenApiPif['$ref'] | OPAQUE_REF_NULL
  mode: BOND_MODE
  other_config: Record<string, string>
  primary_slave: XenApiPif['$ref'] | OPAQUE_REF_NULL
  properties: Record<string, string>
  slaves: XenApiPif['$ref'][]
  uuid: string
}

export interface XenApiVlan {
  $ref: Branded<'VLAN'>
  other_config: Record<string, string>
  tag: number
  tagged_PIF: XenApiPif['$ref'] | OPAQUE_REF_NULL
  untagged_PIF: XenApiPif['$ref'] | OPAQUE_REF_NULL
  uuid: string
}

export interface XenApiSm {
  $ref: Branded<'SM'>
  /** @deprecated */
  capabilities?: string[]
  configuration: Record<string, string>
  copyright: string
  driver_filename: string
  features: Record<string, number>
  name_description: string
  name_label: string
  other_config: Record<string, string>
  required_api_version: string
  required_cluster_stack: string[]
  supported_image_formats?: string[]
  type: string
  uuid: string
  vendor: string
  version: string
}
export type XenApiSmWrapped = WrapperXenApi<XenApiSm, 'SM'>

export interface XenApiSr {
  $ref: Branded<'SR'>
  allowed_operations: STORAGE_OPERATIONS[]
  blobs: Record<string, XenApiBlob['$ref']>
  clustered: boolean
  content_type: string
  current_operations: Record<string, STORAGE_OPERATIONS>
  introduced_by: XenApiDrTask['$ref'] | OPAQUE_REF_NULL
  is_tools_sr: boolean
  local_cache_enabled: boolean
  name_description: string
  name_label: string
  other_config: Record<string, string>
  PBDs: XenApiPbd['$ref'][]
  physical_size: number
  physical_utilisation: number
  shared: boolean
  sm_config: Record<string, string>
  tags: string[]
  type: string
  uuid: string
  VDIs: XenApiVdi['$ref'][]
  virtual_allocation: number
}
export type XenApiSrWrapped = WrapperXenApi<XenApiSr, 'SR'>

export interface XenApiSrStat {
  $ref: Branded<'sr_stat'>
  clustered?: boolean
  free_space?: number
  health?: SR_HEALTH
  name_description?: string
  name_label?: string
  total_space?: number
  uuid?: unknown
}

export interface XenApiProbeResult {
  $ref: Branded<'probe_result'>
  complete?: boolean
  configuration?: Record<string, string>
  extra_info?: Record<string, string>
  sr?: unknown
}

export interface XenApiLvhd {
  $ref: Branded<'LVHD'>
  uuid: string
}

export interface XenApiVdi {
  $ref: Branded<'VDI'>
  allow_caching: boolean
  allowed_operations: VDI_OPERATIONS[]
  cbt_enabled?: boolean
  crash_dumps: XenApiCrashdump['$ref'][]
  current_operations: Record<string, VDI_OPERATIONS>
  is_a_snapshot: boolean
  is_tools_iso: boolean
  location: string
  managed: boolean
  metadata_latest: boolean
  metadata_of_pool: XenApiPool['$ref'] | OPAQUE_REF_NULL
  missing: boolean
  name_description: string
  name_label: string
  on_boot: ON_BOOT
  other_config: Record<string, string>
  /** @deprecated */
  parent?: OPAQUE_REF_NULL
  physical_utilisation: number
  read_only: boolean
  sharable: boolean
  sm_config: Record<string, string>
  snapshot_of: XenApiVdi['$ref'] | OPAQUE_REF_NULL
  snapshot_time: string
  snapshots: XenApiVdi['$ref'][]
  SR: XenApiSr['$ref']
  storage_lock: boolean
  tags: string[]
  type: VDI_TYPE
  uuid: string
  VBDs: XenApiVbd['$ref'][]
  virtual_size: number
  xenstore_data: Record<string, string>
}
export type XenApiVdiWrapped = WrapperXenApi<XenApiVdi, 'VDI'>

export interface XenApiVbd {
  $ref: Branded<'VBD'>
  allowed_operations: VBD_OPERATIONS[]
  bootable: boolean
  current_operations: Record<string, VBD_OPERATIONS>
  currently_attached: boolean
  device: string
  empty: boolean
  /** @deprecated */
  metrics?: XenApiVbdMetrics['$ref'] | OPAQUE_REF_NULL
  mode: VBD_MODE
  other_config: Record<string, string>
  qos_algorithm_params: Record<string, string>
  qos_algorithm_type: string
  qos_supported_algorithms: string[]
  runtime_properties: Record<string, string>
  status_code: number
  status_detail: string
  storage_lock: boolean
  type: VBD_TYPE
  unpluggable: boolean
  userdevice: string
  uuid: string
  VDI: XenApiVdi['$ref']
  VM: XenApiVm['$ref']
}
export type XenApiVbdWrapped = WrapperXenApi<XenApiVbd, 'VBD'>

/** @deprecated */
export interface XenApiVbdMetrics {
  $ref: Branded<'VBD_metrics'>
  /** @deprecated */
  io_read_kbs?: number
  /** @deprecated */
  io_write_kbs?: number
  /** @deprecated */
  last_updated?: string
  /** @deprecated */
  other_config?: Record<string, string>
  uuid: string
}

export interface XenApiPbd {
  $ref: Branded<'PBD'>
  currently_attached: boolean
  device_config: Record<string, string>
  host: XenApiHost['$ref']
  other_config: Record<string, string>
  SR: XenApiSr['$ref']
  uuid: string
}

/** @deprecated */
export interface XenApiCrashdump {
  $ref: Branded<'crashdump'>
  other_config: Record<string, string>
  uuid: string
  VDI: XenApiVdi['$ref']
  VM: XenApiVm['$ref']
}

export interface XenApiVtpm {
  $ref: Branded<'VTPM'>
  allowed_operations: VTPM_OPERATIONS[]
  backend: XenApiVm['$ref'] | OPAQUE_REF_NULL
  current_operations: Record<string, VTPM_OPERATIONS>
  is_protected?: boolean
  is_unique?: boolean
  persistence_backend?: PERSISTENCE_BACKEND
  uuid: string
  VM: XenApiVm['$ref']
}
export type XenApiVtpmWrapped = WrapperXenApi<XenApiVtpm, 'VTPM'>

export interface XenApiConsole {
  $ref: Branded<'console'>
  location: string
  other_config: Record<string, string>
  protocol: CONSOLE_PROTOCOL
  uuid: string
  VM: XenApiVm['$ref']
}

/** @deprecated */
export interface XenApiUser {
  $ref: Branded<'user'>
  fullname: string
  other_config: Record<string, string>
  short_name: string
  uuid: string
}

export interface XenApiDataSource {
  $ref: Branded<'data_source'>
  enabled: boolean
  max: number
  min: number
  name_description: string
  name_label: string
  standard: boolean
  units: string
  value: number
}

export interface XenApiBlob {
  $ref: Branded<'blob'>
  last_updated: string
  mime_type: string
  name_description: string
  name_label: string
  public: boolean
  size: number
  uuid: string
}

export interface XenApiMessage {
  $ref: Branded<'message'>
  body: string
  cls: CLS
  name: string
  obj_uuid: string
  priority: number
  timestamp: string
  uuid: string
}

export interface XenApiSecret {
  $ref: Branded<'secret'>
  other_config: Record<string, string>
  uuid: string
  value: string
}

export interface XenApiTunnel {
  $ref: Branded<'tunnel'>
  access_PIF: XenApiPif['$ref'] | OPAQUE_REF_NULL
  other_config: Record<string, string>
  protocol?: TUNNEL_PROTOCOL
  status: Record<string, string>
  transport_PIF: XenApiPif['$ref'] | OPAQUE_REF_NULL
  uuid: string
}

export interface XenApiNetworkSriov {
  $ref: Branded<'network_sriov'>
  configuration_mode?: SRIOV_CONFIGURATION_MODE
  logical_PIF?: XenApiPif['$ref'] | OPAQUE_REF_NULL
  physical_PIF?: XenApiPif['$ref'] | OPAQUE_REF_NULL
  requires_reboot?: boolean
  uuid: string
}

export interface XenApiPci {
  $ref: Branded<'PCI'>
  class_name: string
  dependencies: XenApiPci['$ref'][]
  device_name: string
  driver_name?: string
  host: XenApiHost['$ref'] | OPAQUE_REF_NULL
  other_config: Record<string, string>
  pci_id: string
  subsystem_device_name?: string
  subsystem_vendor_name?: string
  uuid: string
  vendor_name: string
}
export type XenApiPciWrapped = WrapperXenApi<XenApiPci, 'PCI'>

export interface XenApiPgpu {
  $ref: Branded<'PGPU'>
  compatibility_metadata?: Record<string, string>
  dom0_access: PGPU_DOM0_ACCESS
  enabled_VGPU_types: XenApiVgpuType['$ref'][]
  GPU_group: XenApiGpuGroup['$ref'] | OPAQUE_REF_NULL
  host: XenApiHost['$ref'] | OPAQUE_REF_NULL
  is_system_display_device: boolean
  other_config: Record<string, string>
  PCI: XenApiPci['$ref'] | OPAQUE_REF_NULL
  resident_VGPUs: XenApiVgpu['$ref'][]
  supported_VGPU_max_capacities: Record<XenApiVgpuType['$ref'], number>
  supported_VGPU_types: XenApiVgpuType['$ref'][]
  uuid: string
}
export type XenApiPgpuWrapped = WrapperXenApi<XenApiPgpu, 'PGPU'>

export interface XenApiGpuGroup {
  $ref: Branded<'GPU_group'>
  allocation_algorithm: ALLOCATION_ALGORITHM
  enabled_VGPU_types: XenApiVgpuType['$ref'][]
  GPU_types: string[]
  name_description: string
  name_label: string
  other_config: Record<string, string>
  PGPUs: XenApiPgpu['$ref'][]
  supported_VGPU_types: XenApiVgpuType['$ref'][]
  uuid: string
  VGPUs: XenApiVgpu['$ref'][]
}
export type XenApiGpuGroupWrapped = WrapperXenApi<XenApiGpuGroup, 'gpuGroup'>

export interface XenApiVgpu {
  $ref: Branded<'VGPU'>
  compatibility_metadata?: Record<string, string>
  currently_attached: boolean
  device: string
  extra_args?: string
  GPU_group: XenApiGpuGroup['$ref']
  other_config: Record<string, string>
  PCI?: XenApiPci['$ref'] | OPAQUE_REF_NULL
  resident_on: XenApiPgpu['$ref'] | OPAQUE_REF_NULL
  scheduled_to_be_resident_on: XenApiPgpu['$ref'] | OPAQUE_REF_NULL
  type: XenApiVgpuType['$ref'] | OPAQUE_REF_NULL
  uuid: string
  VM: XenApiVm['$ref']
}
export type XenApiVgpuWrapped = WrapperXenApi<XenApiVgpu, 'VGPU'>

export interface XenApiVgpuType {
  $ref: Branded<'VGPU_type'>
  compatible_types_in_vm?: XenApiVgpuType['$ref'][]
  enabled_on_GPU_groups: XenApiGpuGroup['$ref'][]
  enabled_on_PGPUs: XenApiPgpu['$ref'][]
  experimental: boolean
  framebuffer_size: number
  identifier: string
  implementation: VGPU_TYPE_IMPLEMENTATION
  max_heads: number
  max_resolution_x: number
  max_resolution_y: number
  model_name: string
  supported_on_GPU_groups: XenApiGpuGroup['$ref'][]
  supported_on_PGPUs: XenApiPgpu['$ref'][]
  uuid: string
  vendor_name: string
  VGPUs: XenApiVgpu['$ref'][]
}
export type XenApiVgpuTypeWrapped = WrapperXenApi<XenApiVgpuType, 'vgpuType'>

export interface XenApiPvsSite {
  $ref: Branded<'PVS_site'>
  cache_storage?: XenApiPvsCacheStorage['$ref'][]
  name_description?: string
  name_label?: string
  proxies?: XenApiPvsProxy['$ref'][]
  PVS_uuid?: string
  servers?: XenApiPvsServer['$ref'][]
  uuid?: string
}

export interface XenApiPvsServer {
  $ref: Branded<'PVS_server'>
  addresses?: string[]
  first_port?: number
  last_port?: number
  site?: XenApiPvsSite['$ref'] | OPAQUE_REF_NULL
  uuid?: string
}

export interface XenApiPvsProxy {
  $ref: Branded<'PVS_proxy'>
  currently_attached?: boolean
  site?: XenApiPvsSite['$ref'] | OPAQUE_REF_NULL
  status?: PVS_PROXY_STATUS
  uuid?: string
  VIF?: XenApiVif['$ref'] | OPAQUE_REF_NULL
}

export interface XenApiPvsCacheStorage {
  $ref: Branded<'PVS_cache_storage'>
  host?: XenApiHost['$ref'] | OPAQUE_REF_NULL
  site?: XenApiPvsSite['$ref'] | OPAQUE_REF_NULL
  size?: number
  SR?: XenApiSr['$ref'] | OPAQUE_REF_NULL
  uuid?: string
  VDI?: XenApiVdi['$ref'] | OPAQUE_REF_NULL
}

export interface XenApiFeature {
  $ref: Branded<'Feature'>
  enabled?: boolean
  experimental?: boolean
  host?: XenApiHost['$ref']
  name_description: string
  name_label: string
  uuid?: string
  version?: string
}

export interface XenApiSdnController {
  $ref: Branded<'SDN_controller'>
  address?: string
  port?: number
  protocol?: SDN_CONTROLLER_PROTOCOL
  uuid?: string
}

export interface XenApiVdiNbdServerInfo {
  $ref: Branded<'vdi_nbd_server_info'>
  address?: string
  cert?: string
  exportname?: string
  port?: number
  subject?: string
}

export interface XenApiPusb {
  $ref: Branded<'PUSB'>
  description?: string
  host?: XenApiHost['$ref'] | OPAQUE_REF_NULL
  other_config?: Record<string, string>
  passthrough_enabled?: boolean
  path?: string
  product_desc?: string
  product_id?: string
  serial?: string
  speed?: number
  USB_group?: XenApiUsbGroup['$ref'] | OPAQUE_REF_NULL
  uuid?: string
  vendor_desc?: string
  vendor_id?: string
  version?: string
}

export interface XenApiUsbGroup {
  $ref: Branded<'USB_group'>
  name_description?: string
  name_label?: string
  other_config?: Record<string, string>
  PUSBs?: XenApiPusb['$ref'][]
  uuid?: string
  VUSBs?: XenApiVusb['$ref'][]
}

export interface XenApiVusb {
  $ref: Branded<'VUSB'>
  allowed_operations: VUSB_OPERATIONS[]
  current_operations: Record<string, VUSB_OPERATIONS>
  currently_attached: boolean
  other_config?: Record<string, string>
  USB_group?: XenApiUsbGroup['$ref']
  uuid?: string
  VM?: XenApiVm['$ref']
}

export interface XenApiCluster {
  $ref: Branded<'Cluster'>
  allowed_operations: CLUSTER_OPERATION[]
  cluster_config?: Record<string, string>
  cluster_hosts?: XenApiClusterHost['$ref'][]
  cluster_stack?: string
  cluster_token?: string
  current_operations: Record<string, CLUSTER_OPERATION>
  is_quorate?: boolean
  live_hosts?: number
  other_config?: Record<string, string>
  pending_forget?: string[]
  pool_auto_join?: boolean
  quorum?: number
  token_timeout_coefficient?: number
  token_timeout?: number
  uuid?: string
}

export interface XenApiClusterHost {
  $ref: Branded<'Cluster_host'>
  allowed_operations: CLUSTER_HOST_OPERATION[]
  cluster?: XenApiCluster['$ref'] | OPAQUE_REF_NULL
  current_operations: Record<string, CLUSTER_HOST_OPERATION>
  enabled?: boolean
  host?: XenApiHost['$ref'] | OPAQUE_REF_NULL
  joined?: boolean
  last_update_live?: string
  live?: boolean
  other_config?: Record<string, string>
  PIF?: XenApiPif['$ref'] | OPAQUE_REF_NULL
  uuid?: string
}

export interface XenApiCertificate {
  $ref: Branded<'Certificate'>
  fingerprint?: string
  host?: XenApiHost['$ref'] | OPAQUE_REF_NULL
  name?: string
  not_after?: string
  not_before?: string
  type?: CERTIFICATE_TYPE
  uuid?: string
}

export interface XenApiRepository {
  $ref: Branded<'Repository'>
  binary_url?: string
  gpgkey_path?: string
  hash?: string
  name_description: string
  name_label: string
  source_url?: string
  /** @deprecated */
  up_to_date?: boolean
  update?: boolean
  uuid?: string
}

export interface XenApiObserver {
  $ref: Branded<'Observer'>
  attributes?: Record<string, string>
  components?: string[]
  enabled?: boolean
  endpoints?: string[]
  hosts?: XenApiHost['$ref'][]
  name_description: string
  name_label: string
  uuid?: string
}

export type XenApiRecord =
  | XenApiSession
  | XenApiAuth
  | XenApiSubject
  | XenApiRole
  | XenApiTask
  | XenApiEvent
  | XenApiPool
  | XenApiPoolPatch
  | XenApiPoolUpdate
  | XenApiVm
  | XenApiVmMetrics
  | XenApiVmGuestMetrics
  | XenApiVmpp
  | XenApiVmss
  | XenApiVmAppliance
  | XenApiDrTask
  | XenApiHost
  | XenApiHostCrashdump
  | XenApiHostPatch
  | XenApiHostMetrics
  | XenApiHostCpu
  | XenApiNetwork
  | XenApiVif
  | XenApiVifMetrics
  | XenApiPif
  | XenApiPifMetrics
  | XenApiBond
  | XenApiVlan
  | XenApiSm
  | XenApiSr
  | XenApiSrStat
  | XenApiProbeResult
  | XenApiLvhd
  | XenApiVdi
  | XenApiVbd
  | XenApiVbdMetrics
  | XenApiPbd
  | XenApiCrashdump
  | XenApiVtpm
  | XenApiConsole
  | XenApiUser
  | XenApiDataSource
  | XenApiBlob
  | XenApiMessage
  | XenApiSecret
  | XenApiTunnel
  | XenApiNetworkSriov
  | XenApiPci
  | XenApiPgpu
  | XenApiGpuGroup
  | XenApiVgpu
  | XenApiVgpuType
  | XenApiPvsSite
  | XenApiPvsServer
  | XenApiPvsProxy
  | XenApiPvsCacheStorage
  | XenApiFeature
  | XenApiSdnController
  | XenApiVdiNbdServerInfo
  | XenApiPusb
  | XenApiUsbGroup
  | XenApiVusb
  | XenApiCluster
  | XenApiClusterHost
  | XenApiCertificate
  | XenApiRepository
  | XenApiObserver

export type WrappedXenApiRecord =
  | XenApiHostWrapped
  | XenApiNetworkWrapped
  | XenApiPifWrapped
  | XenApiPoolWrapped
  | XenApiSrWrapped
  | XenApiVbdWrapped
  | XenApiVdiWrapped
  | XenApiVgpuWrapped
  | XenApiVifWrapped
  | XenApiVmWrapped
  | XenApiVtpmWrapped
  | XenApiPciWrapped
  | XenApiGpuGroupWrapped
  | XenApiPgpuWrapped
  | XenApiVgpuTypeWrapped
