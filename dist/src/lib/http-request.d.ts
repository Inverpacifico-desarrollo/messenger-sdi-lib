import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { ResponseAPI } from '../types/api.types';
interface ChatHttpConfig {
    apiBaseUrl: string;
    authToken: string;
}
interface HttpRequestProps extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'method'> {
    data?: unknown;
    url: string;
    params?: object;
    method: Method;
    headers?: Record<string, string>;
}
export declare const configureChatHttp: (config: ChatHttpConfig) => void;
export declare const chatApiUrl: (service: string, version: string) => string;
export declare const httpRequest: <TResponse>({ data, url, params, method, headers, ...rest }: HttpRequestProps) => Promise<AxiosResponse<ResponseAPI<TResponse>>>;
export {};
