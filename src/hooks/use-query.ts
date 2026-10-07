import { useCallback, useEffect, useRef, useState } from 'react'

export const keepPreviousData = <T>(previousData: T | undefined): T | undefined => previousData

export interface UseQueryOptions<TData, TError = any> {
  queryKey?: unknown
  queryFn: () => Promise<TData>
  enabled?: boolean
  initialData?: TData
  placeholderData?: TData | ((previousData: TData | undefined) => TData | undefined)
  keepPreviousData?: boolean
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
}

export interface UseQueryResult<TData, TError = any> {
  data: TData | undefined
  error: TError | null
  errors: any
  isLoading: boolean
  isPending: boolean
  isFetching: boolean
  isSuccess: boolean
  isError: boolean
  refetch: () => Promise<TData | undefined>
  setData: React.Dispatch<React.SetStateAction<TData | undefined>>
}

export function useQuery<TData = unknown, TError = any>(
  options: UseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const {
    queryKey,
    queryFn,
    enabled = true,
    initialData,
    placeholderData,
    keepPreviousData: shouldKeepPreviousData = false,
    onSuccess,
    onError
  } = options

  const [data, setData] = useState<TData | undefined>(() => {
    if (initialData !== undefined) return initialData
    if (typeof placeholderData === 'function') {
      return (placeholderData as (prev: TData | undefined) => TData | undefined)(undefined)
    }
    return placeholderData
  })

  const [error, setError] = useState<TError | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(() => enabled && data === undefined)
  const [isSuccess, setIsSuccess] = useState<boolean>(() => data !== undefined)
  const [isError, setIsError] = useState<boolean>(false)

  const queryFnRef = useRef(queryFn)
  queryFnRef.current = queryFn

  const onSuccessRef = useRef(onSuccess)
  onSuccessRef.current = onSuccess

  const onErrorRef = useRef(onError)
  onErrorRef.current = onError

  const activeQueryIdRef = useRef(0)
  const isFirstMountRef = useRef(true)

  const serializedKey = JSON.stringify(queryKey)

  const executeFetch = useCallback(async (): Promise<TData | undefined> => {
    const queryId = ++activeQueryIdRef.current
    setIsFetching(true)
    setIsError(false)
    setError(null)

    try {
      const result = await queryFnRef.current()

      if (queryId === activeQueryIdRef.current) {
        setData(result)
        setIsSuccess(true)
        setIsError(false)
        setError(null)
        setIsFetching(false)
        onSuccessRef.current?.(result)
      }
      return result
    } catch (err) {
      if (queryId === activeQueryIdRef.current) {
        const typedError = err as TError
        setError(typedError)
        setIsError(true)
        setIsSuccess(false)
        setIsFetching(false)
        onErrorRef.current?.(typedError)
      }
      return undefined
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setIsFetching(false)
      return
    }

    if (!isFirstMountRef.current) {
      // Manejo de placeholderData o keepPreviousData al cambiar el queryKey
      if (placeholderData !== undefined) {
        if (typeof placeholderData === 'function') {
          setData((prev) =>
            (placeholderData as (prev: TData | undefined) => TData | undefined)(prev)
          )
        } else {
          setData(placeholderData)
        }
      } else if (!shouldKeepPreviousData) {
        setData(undefined)
      }
    }

    isFirstMountRef.current = false
    void executeFetch()
  }, [enabled, serializedKey, shouldKeepPreviousData])

  const errors = (error as any)?.response?.data ?? (error as any)?.data ?? {}
  const isLoading = enabled && isFetching && data === undefined

  return {
    data,
    error,
    errors,
    isLoading,
    isPending: isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch: executeFetch,
    setData
  }
}

export default useQuery
