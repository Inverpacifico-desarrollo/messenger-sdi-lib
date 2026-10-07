export type UserAuth = {
    id: number | string;
    type?: string;
    attributes: {
        name: string;
        username?: string;
        email?: string;
        avatar?: string | null;
        avatar_url?: string | null;
        is_active?: boolean;
        created_at?: string;
        updated_at?: string;
    };
};
export type PermissionAuht = {
    id: number;
    type: 'permissions';
    attributes: {
        name: string;
        display_name: string;
        module_id: number;
        created_at: string;
        updated_at: string;
    };
};
