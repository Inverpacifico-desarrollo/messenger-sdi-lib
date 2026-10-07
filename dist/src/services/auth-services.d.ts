import { PermissionAuht, UserAuth } from '../types/user-auth.types';
export declare const getPermissionsMessenger: ({ applicationId, userId }: {
    userId: string | number;
    applicationId: string | number;
}) => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<PermissionAuht[]>, any, {}, any>>;
export declare const meService: () => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<UserAuth>, any, {}, any>>;
