import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import type { ResponseAPI } from '../types/api.types'

interface ChatHttpConfig {
  apiBaseUrl: string
  authToken: string
}

interface HttpRequestProps
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'method'> {
  data?: unknown
  url: string
  params?: object
  method: Method
  headers?: Record<string, string>
}

let chatHttpConfig: ChatHttpConfig | null = null

export const configureChatHttp = (config: ChatHttpConfig) => {
  chatHttpConfig = config
}

const convertBooleanParamsToNumber = (params: object) =>
  Object.entries(params).reduce<Record<string, unknown>>((acc, [key, value]) => {
    acc[key] = typeof value === 'boolean' ? Number(value) : value
    return acc
  }, {})

export const chatApiUrl = (service: string, version: string) => {
  if (!chatHttpConfig) {
    throw new Error('El cliente HTTP del chat no ha sido configurado')
  }

  const baseUrl = chatHttpConfig.apiBaseUrl.replace(/\/+$/, '')
  return `${baseUrl}/${service}/api/${version}`
}

export const httpRequest = async <TResponse>({
  data,
  url,
  params,
  method,
  headers,
  ...rest
}: HttpRequestProps): Promise<AxiosResponse<ResponseAPI<TResponse>>> => {
  if (!chatHttpConfig) {
    throw new Error('El cliente HTTP del chat no ha sido configurado')
  }

  const config: AxiosRequestConfig = {
    ...rest,
    url,
    method,
    data,
    params: params ? convertBooleanParamsToNumber(params) : undefined,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
      ...(chatHttpConfig.authToken
        ? { Authorization: `Bearer ${chatHttpConfig.authToken}` }
        : {}),
      ...headers
    }
  }

  return axios.request<ResponseAPI<TResponse>>(config)
}