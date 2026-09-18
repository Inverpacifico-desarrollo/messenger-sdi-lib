export interface MetaPagination {
  current_page: number
  from: number
  last_page: number
  links: { url: string | null; label: string; page: number | null; active: boolean }[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface ResponseAPI<T> {
  success: boolean
  message: string
  data: T
  links?: Partial<{
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }>
  meta?: MetaPagination
}

export interface ResponseError {
  status: number
  message: string
  errors: Record<string, unknown>
}

export interface ApiParams<
  TFilters extends Record<string, string | number> = Record<string, string | number>,
  TInclude extends string | Record<string, string> = string
> {
  page?: string
  paginate?: 1 | 0 | 'true' | 'false'
  force_delete?: 1 | 0 | 'true' | 'false'
  only_trashed?: 1 | 0 | 'true' | 'false'
  limit?: string
  sort?: string
  filter?: TFilters
  include?: TInclude[] | TInclude
}

export interface ResponseApiMessage<T extends Record<string, any> | null> {
  data: T
  links?: Partial<{
    prev: string | null
    next: string | null
  }>
  meta?: {
    path: string
    per_page: number
    next_cursor: string | null
    prev_cursor: string | null
    has_more: boolean
  }
  // pagination: Pagination | null
}

export interface ApiMessengerParams<
  TFilters extends Record<string, string | number> = Record<string, string | number>,
  TInclude extends string | Record<string, string> = string
> extends Omit<ApiParams<TFilters, TInclude>, 'page'> {
  page?: {
    cursor?: string
    number?: string
    size?: string
  }
}

