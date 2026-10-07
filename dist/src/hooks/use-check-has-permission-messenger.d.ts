import { PermissionsMessenger } from '../types/permission.types';
export type PermissionOperator = 'AND' | 'OR';
export interface CheckMessengerPermissionParams {
    permission: PermissionsMessenger[];
    operator?: PermissionOperator;
}
export declare function hasMessengerPermission(permissions: string[], requiredPermissions: PermissionsMessenger[], operator?: PermissionOperator): boolean;
export declare function useCheckHasPermissionMessenger({ permission, operator }: CheckMessengerPermissionParams): boolean;
