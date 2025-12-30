import ENDPOINTS from '@apis/endpoints';
import { TProjectLinkItem } from '@features/project/types/project-type';
import { TProjectLink } from '@features/project/validation/project-link-schema';
import useAPI from '@hooks/use-api';
import appMessage from '@lib/data/app-message';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';

export interface TParamsListProjectLink {
    id_project?: string;
}
const useProjectLinkApi = () => {
    const { apiClient } = useAPI();

    const getListProjectLink = async (params: TParamsListProjectLink, isLoading: boolean = true) => {
        const response = await apiClient<TProjectLinkItem[]>({
            endpoint: ENDPOINTS.PROJECT_LINK.GET_LIST_PROJECT_LINK,
            queryObject: removeKeyWithUndifienedValue(params),
            isLoading,
        });

        return response;
    };

    const getProjectLinkDetail = async (param: string) => {
        const id = param;

        const response = await apiClient<TProjectLinkItem>({
            endpoint: ENDPOINTS.PROJECT_LINK.GET_DETAIL_PROJECT_LINK(id),
        });

        return response;
    };

    const upsertProjectLink = async (params: TProjectLink) => {
        const response = await apiClient<TProjectLink>({
            endpoint: ENDPOINTS.PROJECT_LINK.UPSERT_PROJECT_LINK,
            payload: params,
            method: 'post',
            message: appMessage.upsertModule(params?.id, 'Project Link'),
        });

        return response;
    };

    const deleteProjectLink = async (param: string) => {
        const id = param;
        const response = await apiClient<TProjectLink>({
            endpoint: ENDPOINTS.PROJECT_LINK.DELETE_PROJECT_LINK(id),
            method: 'delete',
            message: appMessage.deleteModule('Project Link'),
        });

        return response;
    };

    return {
        getProjectLinkDetail,
        getListProjectLink,
        upsertProjectLink,
        deleteProjectLink,
    };
};

export default useProjectLinkApi;
