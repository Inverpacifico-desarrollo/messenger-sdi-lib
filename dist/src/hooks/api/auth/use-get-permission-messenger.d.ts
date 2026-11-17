export declare const useGetUserPermissionMessenger: () => {
    data: import('../../../types/user-auth.types').PermissionAuht[];
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    refetch: () => Promise<import('../../../types/user-auth.types').PermissionAuht[] | undefined>;
};
