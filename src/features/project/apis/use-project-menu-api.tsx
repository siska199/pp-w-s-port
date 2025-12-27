import ENDPOINT from '@apis/endpoints';
import { TProject, TProjectMenuItem } from '@features/project/types/project-type';

import useAPI from '@hooks/use-api';
import appMessage from '@lib/data/app-message';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';

export interface TParamsListProjectMenu {
    id_project?: string;
}
const useProjectMenuApi = () => {
    const { apiClient } = useAPI();

    const getListProjectMenu = async (params: TParamsListProjectMenu, isLoading: boolean=true) => {
        const response = await apiClient<TProjectMenuItem[]>({
            endpoint: ENDPOINT.PROJECT_MENU.GET_LIST_PROJECT_MENU,
            queryObject: removeKeyWithUndifienedValue(params),
            isLoading,
        });

        return response;
    };

    const getProjectMenuDetail = async (param: string) => {
        const id = param;

        const response = await apiClient<TProject>({
            endpoint: ENDPOINT.PROJECT_MENU.GET_DETAIL_PROJECT_MENU(id),
        });

        return response;
    };

    const upsertProjectMenu = async (params: FormData) => {
        const response = await apiClient<TProject>({
            endpoint: ENDPOINT.PROJECT_MENU.UPSERT_PROJECT_MENU,
            payload: params,
            method: 'post',
            message: appMessage.upsertModule(params?.get('id') as string, 'Project'),
            isForm: true,
        });

        return response;
    };

    const deleteProjectMenu = async (param: string) => {
        const id = param;
        const response = await apiClient<TProject>({
            endpoint: ENDPOINT.PROJECT_MENU.DELETE_PROJECT_MENU(id),
            method: 'delete',
            message: appMessage.deleteModule('Project'),
        });

        return response;
    };

    return {
        getProjectMenuDetail,
        getListProjectMenu,
        upsertProjectMenu,
        deleteProjectMenu,
    };
};

export default useProjectMenuApi;
