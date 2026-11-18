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
    isFetching: boolean;
    isError: boolean;
    error: any;
    refetch: () => Promise<AxiosResponse<ResponseAPI<UserAuth>, any, {}, any> | undefined>;
};
export default useGetAuthUser;
