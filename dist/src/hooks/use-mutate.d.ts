export interface UseMutateOptions<TData = unknown, TError = Error, TVariables = void> {
    onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
    onError?: (error: TError, variables: TVariables) => void | Promise<void>;
    onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void | Promise<void>;
}
export declare function useMutate<TData = unknown, TError = Error, TVariables = void>(mutationFn: (variables: TVariables) => Promise<TData>, options?: UseMutateOptions<TData, TError, TVariables>): {
    data: TData | undefined;
    error: TError | null;
    isPending: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    reset: () => void;
    mutate: (variables: TVariables, callOptions?: UseMutateOptions<TData, TError, TVariables>) => void;
    mutateAsync: (variables: TVariables) => Promise<TData>;
};
export default useMutate;
