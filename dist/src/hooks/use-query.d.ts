export declare const keepPreviousData: <T>(previousData: T | undefined) => T | undefined;
export interface UseQueryOptions<TData, TError = any> {
    queryKey?: unknown;
    queryFn: () => Promise<TData>;
    enabled?: boolean;
    initialData?: TData;
    placeholderData?: TData | ((previousData: TData | undefined) => TData | undefined);
    keepPreviousData?: boolean;
    onSuccess?: (data: TData) => void;
    onError?: (error: TError) => void;
}
export interface UseQueryResult<TData, TError = any> {
    data: TData | undefined;
    error: TError | null;
    errors: any;
    isLoading: boolean;
    isPending: boolean;
    isFetching: boolean;
    isSuccess: boolean;
    isError: boolean;
    refetch: () => Promise<TData | undefined>;
    setData: React.Dispatch<React.SetStateAction<TData | undefined>>;
}
export declare function useQuery<TData = unknown, TError = any>(options: UseQueryOptions<TData, TError>): UseQueryResult<TData, TError>;
export default useQuery;
