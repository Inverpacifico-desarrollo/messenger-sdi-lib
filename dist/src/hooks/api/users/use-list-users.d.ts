import { AxiosResponse } from 'axios';
import { FilterUserChat, UserChat } from '../../../types/user-chat.types';
import { ResponseAPI } from '../../../types/api.types';
interface Props {
    params?: FilterUserChat;
    enable?: boolean;
}
declare const useListUsers: (props?: Props) => {
    data: UserChat[];
    meta: import('../../../types/api.types').MetaPagination | undefined;
    links: Partial<{
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    }> | undefined;
    isLoading: boolean;
    isFetching: boolean;
    errors: any;
    refetch: () => Promise<AxiosResponse<ResponseAPI<UserChat[]>, any, {}, any> | undefined>;
};
export default useListUsers;
