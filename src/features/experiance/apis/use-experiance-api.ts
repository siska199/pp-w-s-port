import { TExperiance } from '@features/experiance/types/experiance-type';
import { TExperianceSchema } from '@features/experiance/validation/experiance-schema';
import ENDPOINT from '@apis/endpoints';

import useAPI from '@hooks/use-api';
import appMessage from '@lib/data/app-message';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';
import { TPaginationQueryParams, TResponseDataPaginationAPI } from '@typescript/index-type';
export interface TParamsListExperiance extends TPaginationQueryParams {
    keyword?: string;
    start_at?: string;
    end_at?: string;
}

const useExperianceAPI = () => {
    const { apiClient } = useAPI();
    const getListExperiance = async (params: Partial<TParamsListExperiance>) => {
        const response = await apiClient<TResponseDataPaginationAPI<TExperiance>>({
            endpoint: ENDPOINT.EXPERIANCE.GET_LIST_EXPERIANCE,
            queryObject: removeKeyWithUndifienedValue(params),
        });
        return response;
    };

    const getDetailExperiance = async (id: string) => {
        const response = await apiClient({
            endpoint: ENDPOINT.EXPERIANCE.GET_DETAIL_EXPERIANCE(id),
        });

        return response;
    };

    const upsertExperiance = async (payload: TExperianceSchema) => {
        const response = await apiClient({
            endpoint: ENDPOINT.EXPERIANCE.UPSERT_EXPERIANCE,
            payload,
            method: 'post',
            message: appMessage.upsertModule(payload?.id, 'Experiance'),
        });

        return response;
    };

    const deleteExperiance = async (id: string) => {
        const response = await apiClient({
            endpoint: ENDPOINT.EXPERIANCE.DELETE_EXPERIANCE(id),
        });

        return response;
    };

    return {
        getListExperiance,
        getDetailExperiance,
        upsertExperiance,
        deleteExperiance,
    };
};

export default useExperianceAPI;
