import { useCallback, useState } from 'react'

export interface UseMutateOptions<TData = unknown, TError = Error, TVariables = void> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>
  onError?: (error: TError, variables: TVariables) => void | Promise<void>
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables
  ) => void | Promise<void>
}

export function useMutate<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutateOptions<TData, TError, TVariables>
) {
  const [data, setData] = useState<TData | undefined>(undefined)
  const [error, setError] = useState<TError | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const reset = useCallback(() => {
    setData(undefined)
    setError(null)
    setIsPending(false)
    setIsSuccess(false)
    setIsError(false)
  }, [])

  const mutateAsync = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setIsPending(true)
      setIsSuccess(false)
      setIsError(false)
      setError(null)

      try {
        const result = await mutationFn(variables)
        setData(result)
        setIsSuccess(true)
        setIsPending(false)

        await options?.onSuccess?.(result, variables)
        await options?.onSettled?.(result, null, variables)

        return result
      } catch (err) {
        const typedError = err as TError
        setError(typedError)
        setIsError(true)
        setIsPending(false)

        await options?.onError?.(typedError, variables)
        await options?.onSettled?.(undefined, typedError, variables)

        throw err
      }
    },
    [mutationFn, options]
  )

  const mutate = useCallback(
    (
      variables: TVariables,
      callOptions?: UseMutateOptions<TData, TError, TVariables>
    ) => {
      mutateAsync(variables)
        .then(async (res) => {
          await callOptions?.onSuccess?.(res, variables)
          await callOptions?.onSettled?.(res, null, variables)
        })
        .catch(async (err) => {
          await callOptions?.onError?.(err, variables)
          await callOptions?.onSettled?.(undefined, err, variables)
        })
    },
    [mutateAsync]
  )

  return {
    data,
    error,
    isPending,
    isLoading: isPending,
    isSuccess,
    isError,
    reset,
    mutate,
    mutateAsync
  }
}

export default useMutate
