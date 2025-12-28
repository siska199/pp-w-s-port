import { TEducation } from '@features/education/types/education-type';
import { TEducationSchema } from '@features/education/validations/education-schema';
import ENDPOINT from '@apis/endpoints';

import useAPI from '@hooks/use-api';
import appMessage from '@lib/data/app-message';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';
import { TPaginationQueryParams, TResponseDataPaginationAPI } from '@typescript/index-type';

const useEducationApi = () => {
    const { apiClient } = useAPI();

    interface TParamsListEducation extends TPaginationQueryParams {
        keyword?: string;
        id_level?: string;
    }
    const getListEducation = async (params: TParamsListEducation) => {
        const response = await apiClient<TResponseDataPaginationAPI<TEducation>>({
            endpoint: ENDPOINT.EDUCATION.GET_LIST_EDUCATION,
            queryObject: removeKeyWithUndifienedValue(params),
        });

        return response;
    };

    const getEducationDetail = async (param: string) => {
        const id = param;

        const response = await apiClient<TEducation>({
            endpoint: ENDPOINT.EDUCATION.GET_DETAIL_EDUCATION(id),
        });

        return response;
    };

    const upsertEducation = async (params: TEducationSchema) => {
        const response = await apiClient<TEducation>({
            endpoint: ENDPOINT.EDUCATION.UPSERT_EDUCATION,
            payload: {
                ...params,
            },
            method: 'post',
            message: appMessage.upsertModule(params?.id, 'Education'),
        });

        return response;
    };

    const deleteEducation = async (param: string) => {
        const id = param;
        const response = await apiClient<TEducation>({
            endpoint: ENDPOINT.EDUCATION.DELETE_EDUCATION(id),
            method: 'delete',
            message: appMessage.deleteModule('Education'),
        });

        return response;
    };

    return {
        getEducationDetail,
        getListEducation,
        upsertEducation,
        deleteEducation,
    };
};

export default useEducationApi;
