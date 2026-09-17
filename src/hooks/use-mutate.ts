import { useMutation, UseMutationOptions } from '@tanstack/react-query'

export function useMutate<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
) {
  const mutation = useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    ...options
  })

  return {
    ...mutation,
    isLoading: mutation.isPending
  }
}

export default useMutate
