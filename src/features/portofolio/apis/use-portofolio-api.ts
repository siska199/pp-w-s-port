import { useParams } from 'react-router-dom';

import { TParamsListEducation } from '@features/education/apis/use-education-api';
import { TEducation } from '@features/education/types/education-type';
import { TParamsListExperiance } from '@features/experiance/apis/use-experiance-api';
import { TExperiance } from '@features/experiance/types/experiance-type';
import { TKeyMetric, TPersonalInformation, TSocialLink } from '@features/personal-information/types/personal-information-types';
import { TParamsListProject } from '@features/project/apis/use-project-api';
import { TProject } from '@features/project/types/project-type';
import { TParamsListSkillUser } from '@features/skill-user/apis/use-skill-user-api';
import { TSkillUser } from '@features/skill-user/types/skill-user-type';
import ENDPOINT from '@apis/endpoints';

import useAPI from '@hooks/use-api';
import { removeKeyWithUndifienedValue } from '@lib/helper/function';
import { TResponseDataPaginationAPI } from '@typescript/index-type';
import { TMasterCategorySkill } from '@typescript/master-module-types';

const usePortofolioAPI = () => {
    const { apiClient } = useAPI();
    const { username } = useParams<{ username: string }>();

    const getDetailPersonalInformationPortofolio = async () => {
        const result = await apiClient<TPersonalInformation>({
            endpoint: `${ENDPOINT.PORTOFOLIO.GET_DETAIL_PERSONAL_INFORMATION}`,
            isLoading: false,
            queryObject: {
                username,
            },
        });
        return result;
    };

    const getListCategorySkillPortofolio = async () => {
        const result = await apiClient<TMasterCategorySkill[]>({
            endpoint: ENDPOINT.PORTOFOLIO.GET_LIST_CATEGORY_SKILL,
            isLoading: false,
            queryObject: {
                username,
            },
        });
        return result;
    };

    const getListSkillPortofolio = async (params: Partial<TParamsListSkillUser>) => {
        const result = await apiClient<TResponseDataPaginationAPI<TSkillUser>>({
            endpoint: ENDPOINT.PORTOFOLIO.GET_LIST_SKILL,
            queryObject: removeKeyWithUndifienedValue({
                ...params,
                username,
            }),
            isLoading: false,
        });
        return result;
    };

    const getListProjectPortofolio = async (params: Partial<TParamsListProject>) => {
        const response = await apiClient<TResponseDataPaginationAPI<TProject>>({
            endpoint: ENDPOINT.PORTOFOLIO.GET_LIST_PROJECT,
            queryObject: removeKeyWithUndifienedValue({
                ...params,
                username,
            }),
            isLoading: false,
        });

        return response;
    };

    const getListExperiancePortofolio = async (params: Partial<TParamsListExperiance>) => {
        const response = await apiClient<TResponseDataPaginationAPI<TExperiance>>({
            endpoint: ENDPOINT.PORTOFOLIO.GET_LIST_EXPERIANCE,
            queryObject: removeKeyWithUndifienedValue({
                ...params,
                username,
            }),
            isLoading: false,
        });
        return response;
    };

    const getListEducationPortofolio = async (params?: Partial<TParamsListEducation>) => {
        const response = await apiClient<TResponseDataPaginationAPI<TEducation>>({
            endpoint: ENDPOINT.PORTOFOLIO.GET_LIST_EDUCATION,
            queryObject: removeKeyWithUndifienedValue({
                ...params,
                username,
            }),
            isLoading: false,
        });

        return response;
    };

    const getListSocialLinkPortofolio = async () => {
        const result = await apiClient<TSocialLink[]>({
            endpoint: `${ENDPOINT.PORTOFOLIO.GET_LIST_SOCIAL_LINK}`,
            isLoading: false,
            queryObject: removeKeyWithUndifienedValue({
                username,
            }),
        });
        return result;
    };

    const getListKeyMetricPortofolio = async () => {
        const result = await apiClient<TKeyMetric[]>({
            endpoint: `${ENDPOINT.PORTOFOLIO.GET_LIST_KEY_METRIC}`,
            isLoading: false,
            queryObject: removeKeyWithUndifienedValue({
                username,
            }),
        });
        return result;
    };
    return {
        getDetailPersonalInformationPortofolio,
        getListCategorySkillPortofolio,
        getListSkillPortofolio,
        getListProjectPortofolio,
        getListExperiancePortofolio,
        getListEducationPortofolio,
        getListSocialLinkPortofolio,
        getListKeyMetricPortofolio,
    };
};

export default usePortofolioAPI;
