import ENDPOINT from '@apis/endpoints';
import { TProject, TTypeTypeProject } from '@features/project/types/project-type';
import { TProjectSchema } from '@features/project/validation/information-project-schema';

import useAPI from '@hooks/use-api';
import appMessage from '@lib/data/app-message';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';
import { TPaginationQueryParams, TResponseDataPaginationAPI } from '@typescript/index-type';

const useProjectApi = () => {
    const { apiClient } = useAPI();

    interface TParamsListProject extends TPaginationQueryParams {
        keyword?: string;
        id_level?: string;
        id_category?: string;
      id_skill?: string;
      type? : TTypeTypeProject
    }
    const getListProject = async (params: TParamsListProject) => {
        const response = await apiClient<TResponseDataPaginationAPI<TProject>>({
            endpoint: ENDPOINT.PROJECT.GET_LIST_PROJECT,
            queryObject: removeKeyWithUndifienedValue(params),
        });

        return response;
    };

    const getProjectDetail = async (param: string) => {
        const id = param;

        const response = await apiClient<TProject>({
            endpoint: ENDPOINT.PROJECT.GET_DETAIL_PROJECT(id),
        });

        return response;
    };

    const upsertProject = async (params: TProjectSchema) => {
        const response = await apiClient<TProject>({
            endpoint: ENDPOINT.PROJECT.UPSERT_PROJECT,
            payload: {
                ...params,
            },
            method: 'post',
            message: appMessage.upsertModule(params?.id, 'Project'),
        });

        return response;
    };

    const deleteProject = async (param: string) => {
        const id = param;
        const response = await apiClient<TProject>({
            endpoint: ENDPOINT.PROJECT.DELETE_PROJECT(id),
            method: 'delete',
            message: appMessage.deleteModule('Project'),
        });

        return response;
    };

    return {
        getProjectDetail,
        getListProject,
        upsertProject,
        deleteProject,
    };
};

export default useProjectApi;
