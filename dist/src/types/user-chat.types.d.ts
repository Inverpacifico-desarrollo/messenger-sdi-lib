import { ApiMessengerParams } from './api.types';
export interface UserChat {
    id: string;
    type: 'user';
    attributes: {
        user_auth_id: number;
        name: string;
        avatar_url: string | null;
        created_at: string;
        updated_at: string;
    };
    relationships: [];
}
export type FilterUserChat = ApiMessengerParams<Partial<Record<'name', string>>>;
