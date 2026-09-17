import { useMemo } from 'react'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { listMessagesService } from '../../../services/message.services'
import { ConversationMessage, MessageParams } from '../../../types/message.types'
import { ResponseApiMessage } from '../../../types/api.types'
import { mergeOlderGroups } from '../../../utils/message.util'

interface Props {
  params: MessageParams
  enabled?: boolean
}

const useListMessages = ({ params, enabled = true }: Props) => {
  const query = useInfiniteQuery<
    AxiosResponse<ResponseApiMessage<ConversationMessage[]>>,
    unknown,
    InfiniteData<AxiosResponse<ResponseApiMessage<ConversationMessage[]>>>,
    [string, MessageParams],
    string
  >({
    queryKey: ['list-messages', params],
    queryFn: ({ pageParam }) => {
      const cursorValue =
        pageParam && pageParam !== 'null' && pageParam !== 'undefined' && pageParam.trim() !== ''
          ? pageParam
          : undefined

      return listMessagesService({
        ...params,
        ...(cursorValue ? { cursor: cursorValue } : {}),
        page: {
          ...params?.page,
          ...(cursorValue ? { cursor: cursorValue } : {})
        }
      })
    },
    initialPageParam: '',
    getNextPageParam: (lastPage, _allPages, lastPageParam, allPageParams) => {
      const pageData = lastPage?.data?.data ?? []

      // 1. Si no hay datos o la lista viene vacía, no hay más páginas
      if (!Array.isArray(pageData) || pageData.length === 0) {
        return undefined
      }

      // Contar si hay mensajes dentro de los grupos devueltos
      const totalMessages = pageData.reduce(
        (acc, group) => acc + (Array.isArray(group?.messages) ? group.messages.length : 0),
        0
      )
      if (totalMessages === 0) {
        return undefined
      }

      const meta = lastPage?.data?.meta

      // 2. Si el backend explícitamente indica que no hay más registros
      if (meta?.has_more === false) {
        return undefined
      }

      // 3. Extraer el cursor candidato desde meta o links
      let rawCursor: string | null | undefined = meta?.next_cursor

      if (!rawCursor) {
        const nextLink = lastPage?.data?.links?.next
        if (nextLink) {
          try {
            const url = new URL(nextLink, 'http://localhost')
            rawCursor =
              url.searchParams.get('page[cursor]') ||
              url.searchParams.get('cursor') ||
              undefined
          } catch {
            // ignore parsing error
          }
        }
      }

      // 4. Validar que no sea nulo, vacío ni los strings "null" o "undefined"
      if (
        !rawCursor ||
        rawCursor === 'null' ||
        rawCursor === 'undefined' ||
        rawCursor.trim() === ''
      ) {
        return undefined
      }

      // 5. CRÍTICO: Si el cursor devuelto es idéntico al que acabamos de mandar,
      // significa que llegó al límite y el cursor no cambió. Detener paginación.
      if (lastPageParam && rawCursor === lastPageParam) {
        return undefined
      }

      // 6. Si este cursor ya fue consultado en alguna página previa, evitar bucle infinito
      if (allPageParams && allPageParams.includes(rawCursor)) {
        return undefined
      }

      return rawCursor
    },
    enabled: enabled && Boolean(params?.conversation),
    refetchOnWindowFocus: false
  })

  const pages = query.data?.pages

  const messages = useMemo(() => {
    if (!pages) return [] as ConversationMessage[]
    return pages.reduce<ConversationMessage[]>((acc, page) => {
      const pageGroups = page?.data?.data ?? []
      return mergeOlderGroups(acc, pageGroups)
    }, [])
  }, [pages])

  return {
    data: messages,
    rawPages: query.data?.pages,
    isLoading: query.isLoading,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: Boolean(query.hasNextPage),
    fetchNextPage: query.fetchNextPage,
    errors: (query.error as any)?.data ?? {},
    refetch: query.refetch,
    meta: query.data?.pages?.[0]?.data?.meta
  }
}

export default useListMessages
