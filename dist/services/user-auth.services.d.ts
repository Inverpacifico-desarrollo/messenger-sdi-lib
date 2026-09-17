import { UserAuth } from '../types/user-auth.types';
export declare const getAuthUserService: (userId: string | number) => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<UserAuth>, any, {}, any>>;
