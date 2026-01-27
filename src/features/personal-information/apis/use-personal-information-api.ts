import { TKeyMetric, TPersonalInformation, TSocialLink } from '@features/personal-information/types/personal-information-types';
import { TOptionalFormGeneralPersonalInfo } from '@features/personal-information/validations/general-personal-info-schema';
import ENDPOINT from '@apis/endpoints';

import useAPI from '@hooks/use-api';

const usePersonalInformationAPI = () => {
    const { apiClient } = useAPI();

    const getDetailPersonalInformation = async () => {
        const result = await apiClient<TPersonalInformation>({
            endpoint: `${ENDPOINT.PERSONAL_INFORMATION.GET_DETAIL_PERSONAL_INFORMATION}`,
            isLoading: false,
        });
        return result;
    };

    const getListSocialLink = async () => {
        const result = await apiClient<TSocialLink[]>({
            endpoint: `${ENDPOINT.SOCIAL_LINK.GET_LIST_SOCIAL_LINK}`,
            isLoading: false,
        });
        return result;
    };

    const upsertPersonalInformation = async (params: TOptionalFormGeneralPersonalInfo) => {
        const result = await apiClient({
            endpoint: ENDPOINT.PERSONAL_INFORMATION.UPSERT_PERSONAL_INFORMATION,
            payload: params,
            method: 'post',
            isForm: true,
            isShowAlert: false,
            isLoading: false,
        });

        return result;
    };

    const upsertBulkSocialLink = async (params: Omit<TSocialLink, 'id_user' | 'category'>[]) => {
        const result = await apiClient({
            endpoint: ENDPOINT.SOCIAL_LINK.UPSERT_BULK_SOCIAL_LINKS,
            payload: params,
            method: 'post',
            isShowAlert: false,
            isLoading: false,
        });

        return result;
    };

    const deleteBulkSocialLink = async (params: string[]) => {
        const result = await apiClient({
            endpoint: ENDPOINT.SOCIAL_LINK.DELETE_BULK_SOCIAL_LINKS,
            payload: params,
            method: 'delete',
            isShowAlert: false,
            isLoading: false,
        });

        return result;
    };

    const getListKeyMetric = async () => {
        const result = await apiClient<TKeyMetric[]>({
            endpoint: `${ENDPOINT.KEY_METRIC.GET_LIST_KEY_METRIC}`,
            isLoading: false,
        });
        return result;
    };

    const upsertBulkKeyMetric = async (params: TKeyMetric[]) => {
        const result = await apiClient({
            endpoint: ENDPOINT.KEY_METRIC.UPSERT_BULK_KEY_METRICS,
            payload: params,
            method: 'post',
            isShowAlert: false,
            isLoading: false,
        });

        return result;
    };

    const deleteBulkKeyMetric = async (params: string[]) => {
        const result = await apiClient({
            endpoint: ENDPOINT.KEY_METRIC.DELETE_BULK_KEY_METRICS,
            payload: params,
            method: 'delete',
            isShowAlert: false,
            isLoading: false,
        });

        return result;
    };

    return {
        getDetailPersonalInformation,
        getListSocialLink,
        upsertPersonalInformation,
        upsertBulkSocialLink,
        getListKeyMetric,
        upsertBulkKeyMetric,
        deleteBulkKeyMetric,
        deleteBulkSocialLink,
    };
};

export default usePersonalInformationAPI;
