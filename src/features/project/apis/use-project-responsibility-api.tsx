import { TProjectResponsibilityItem } from '@features/project/types/project-type';
import { TProjectResponsibility } from '@features/project/validation/project-responsibility-schema';
import ENDPOINT from '@apis/endpoints';

import useAPI from '@hooks/use-api';
import appMessage from '@lib/data/app-message';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';

export interface TParamsListProjectResponsibility {
    id_project?: string;
}
const useProjectResponsibilityApi = () => {
    const { apiClient } = useAPI();

    const getListProjectResponsibility = async (params: TParamsListProjectResponsibility, isLoading: boolean = true) => {
        const response = await apiClient<TProjectResponsibilityItem[]>({
            endpoint: ENDPOINT.PROJECT_RESPONSIBILITY.GET_LIST_PROJECT_RESPONSIBILITY,
            queryObject: removeKeyWithUndifienedValue(params),
            isLoading,
        });

        return response;
    };

    const getProjectResponsibilityDetail = async (param: string) => {
        const id = param;

        const response = await apiClient<TProjectResponsibilityItem>({
            endpoint: ENDPOINT.PROJECT_RESPONSIBILITY.GET_DETAIL_PROJECT_RESPONSIBILITY(id),
        });

        return response;
    };

    const upsertProjectResponsibility = async (params: TProjectResponsibility) => {
        const response = await apiClient<TProjectResponsibility>({
            endpoint: ENDPOINT.PROJECT_RESPONSIBILITY.UPSERT_PROJECT_RESPONSIBILITY,
            payload: params,
            method: 'post',
            message: appMessage.upsertModule(params?.id, 'Project Responsibility'),
        });

        return response;
    };

    const deleteProjectResponsibility = async (param: string) => {
        const id = param;
        const response = await apiClient<TProjectResponsibility>({
            endpoint: ENDPOINT.PROJECT_RESPONSIBILITY.DELETE_PROJECT_RESPONSIBILITY(id),
            method: 'delete',
            message: appMessage.deleteModule('Project Responsibility'),
        });

        return response;
    };

    return {
        getProjectResponsibilityDetail,
        getListProjectResponsibility,
        upsertProjectResponsibility,
        deleteProjectResponsibility,
    };
};

export default useProjectResponsibilityApi;
