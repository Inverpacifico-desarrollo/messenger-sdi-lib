import { useChatContext } from '../context/chat-context'
import { PermissionsMessenger } from '../types/permission.types'

export type PermissionOperator = 'AND' | 'OR'

export interface CheckMessengerPermissionParams {
  permission: PermissionsMessenger[]
  operator?: PermissionOperator
}

export function hasMessengerPermission(
  permissions: string[],
  requiredPermissions: PermissionsMessenger[],
  operator: PermissionOperator = 'OR'
): boolean {
  return operator === 'AND'
    ? requiredPermissions.every((permission) => permissions.includes(permission))
    : requiredPermissions.some((permission) => permissions.includes(permission))
}

export function useCheckHasPermissionMessenger({
  permission,
  operator = 'OR'
}: CheckMessengerPermissionParams): boolean {
  const { permissions } = useChatContext()

  return hasMessengerPermission(permissions, permission, operator)
}