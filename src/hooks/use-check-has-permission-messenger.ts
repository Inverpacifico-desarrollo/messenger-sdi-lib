import { useOptionalChatContext } from '../context/chat-context'
import { PermissionsMessenger } from '../types/permission.types'

export type PermissionOperator = 'AND' | 'OR'

export interface CheckMessengerPermissionParams {
  permission: PermissionsMessenger | PermissionsMessenger[]
  operator?: PermissionOperator
}

export function hasMessengerPermission(
  permissions: string[],
  requiredPermissions: PermissionsMessenger | PermissionsMessenger[],
  operator: PermissionOperator = 'OR'
): boolean {
  const reqPerms = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions]

  if (reqPerms.length === 0) return true

  return operator === 'AND'
    ? reqPerms.every((p) => permissions.includes(p))
    : reqPerms.some((p) => permissions.includes(p))
}

export function useCheckHasPermissionMessenger({
  permission,
  operator = 'OR'
}: CheckMessengerPermissionParams): boolean {
  const chatContext = useOptionalChatContext()
  const permissions = chatContext?.permissions ?? []

  return hasMessengerPermission(permissions, permission, operator)
}