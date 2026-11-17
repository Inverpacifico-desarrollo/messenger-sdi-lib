import { FilterUserChat, UserChat } from '../types/user-chat.types';
export declare const listUsersChatService: (params?: FilterUserChat) => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<UserChat[]>, any, {}, any>>;
export declare const getUserByUserAuthIdChatService: (id: string | number) => Promise<import('axios').AxiosResponse<import('../types/api.types').ResponseAPI<UserChat>, any, {}, any>>;
