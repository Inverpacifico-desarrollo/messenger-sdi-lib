import { AxiosResponse } from 'axios';
import { UserAuth } from '../../../types/user-auth.types';
import { ResponseAPI } from '../../../types/api.types';
export interface UseGetAuthUserProps {
    userId?: string | number | null;
    enabled?: boolean;
}
export declare const useGetAuthUser: ({ userId, enabled }?: UseGetAuthUserProps) => {
    userAuth: UserAuth | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: (options?: import('@tanstack/query-core').RefetchOptions) => Promise<import('@tanstack/query-core').QueryObserverResult<AxiosResponse<ResponseAPI<UserAuth>, any, {}, any>, Error>>;
};
export default useGetAuthUser;
