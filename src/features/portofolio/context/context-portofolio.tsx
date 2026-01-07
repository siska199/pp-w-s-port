import { createContext, SetStateAction, useCallback, useState } from 'react';

import { TParamsListEducation } from '@features/education/apis/use-education-api';
import { TEducation } from '@features/education/types/education-type';
import { TParamsListExperiance } from '@features/experiance/apis/use-experiance-api';
import { TExperiance } from '@features/experiance/types/experiance-type';
import { TKeyMetric, TPersonalInformation, TSocialLink } from '@features/personal-information/types/personal-information-types';
import usePortofolioAPI from '@features/portofolio/apis/use-portofolio-api';
import { TParamsListProject } from '@features/project/apis/use-project-api';
import { TProject } from '@features/project/types/project-type';
import { TParamsListSkillUser } from '@features/skill-user/apis/use-skill-user-api';
import { TSkillUser } from '@features/skill-user/types/skill-user-type';

import { TMasterCategorySkill } from '@typescript/master-module-types';
import { useNavigate } from 'react-router-dom';

export enum EPortfolioLoading {
    PERSONAL_INFORMATION = 'PERSONAL_INFORMATION',
    SKILL_CATEGORY = 'SKILL_CATEGORY',
    SKILL_LIST = 'SKILL_LIST',
    PROJECT_LIST = 'PROJECT_LIST',
    EXPERIENCE_LIST = 'EXPERIENCE_LIST',
    EDUCATION_LIST = 'EDUCATION_LIST',
    SOCIAL_LINK = 'SOCIAL_LINK',
    KEY_METRIC = 'KEY_METRIC',
}
type TLoadingState = Record<EPortfolioLoading, boolean>;

export interface TContextPortfolio {
    personalInformation: TPersonalInformation | null;
    skillCategoryList: TMasterCategorySkill[];
    skillList: TSkillUser[];
    projectConfig: {
        projectList: TProject[];
        currentPage: number;
        totalPage: number;
    };

    experienceList: TExperiance[];
    educationList: TEducation[];
    socialLinkList: TSocialLink[];
    keyMetricList: TKeyMetric[];

    setPersonalInformation: React.Dispatch<SetStateAction<TPersonalInformation | null>>;
    setSkillCategoryList: React.Dispatch<SetStateAction<TMasterCategorySkill[]>>;
    setSkillList: React.Dispatch<SetStateAction<TSkillUser[]>>;
    setExperienceList: React.Dispatch<SetStateAction<TExperiance[]>>;
    setEducationList: React.Dispatch<SetStateAction<TEducation[]>>;
    setSocialLinkList: React.Dispatch<SetStateAction<TSocialLink[]>>;
    setKeyMetricList: React.Dispatch<SetStateAction<TKeyMetric[]>>;

    setProjectConfig: React.Dispatch<
        SetStateAction<{
            projectList: TProject[];
            currentPage: number;
            totalPage: number;
        }>
    >;

    getPersonalInformation: () => Promise<void>;
    getSkillCategoryList: () => Promise<void>;
    getSkillList: (params?: Partial<TParamsListSkillUser>) => Promise<void>;
    getProjectList: (params: Partial<TParamsListProject>) => Promise<void>;
    getExperienceList: (params?: TParamsListExperiance) => Promise<void>;
    getEducationList: (params?: TParamsListEducation) => Promise<void>;
    getSocialLinkList: () => Promise<void>;
    getKeyMetricList: () => Promise<void>;

    isLoading: TLoadingState;

    activeIdCat: string;
    setActiveIdCat: React.Dispatch<SetStateAction<string>>;
}

const initialContextPortfolio: TContextPortfolio = {
    personalInformation: null,
    skillCategoryList: [],
    skillList: [],
    projectConfig: {
        projectList: [],
        currentPage: 0,
        totalPage: 0,
    },
    experienceList: [],
    educationList: [],
    socialLinkList: [],
    keyMetricList: [],

    setPersonalInformation: () => null,
    setSkillCategoryList: () => null,
    setSkillList: () => null,
    setProjectConfig: () => null,
    setExperienceList: () => null,
    setEducationList: () => null,
    setSocialLinkList: () => null,
    setKeyMetricList: () => null,

    getPersonalInformation: async () => {},
    getSkillCategoryList: async () => {},
    getSkillList: async () => {},
    getProjectList: async () => {},
    getExperienceList: async () => {},
    getEducationList: async () => {},
    getSocialLinkList: async () => {},
    getKeyMetricList: async () => {},

    isLoading: {
        [EPortfolioLoading.PERSONAL_INFORMATION]: false,
        [EPortfolioLoading.SKILL_CATEGORY]: false,
        [EPortfolioLoading.SKILL_LIST]: false,
        [EPortfolioLoading.PROJECT_LIST]: false,
        [EPortfolioLoading.EXPERIENCE_LIST]: false,
        [EPortfolioLoading.EDUCATION_LIST]: false,
        [EPortfolioLoading.SOCIAL_LINK]: false,
        [EPortfolioLoading.KEY_METRIC]: false,
    },

    activeIdCat: '',
    setActiveIdCat: () => null,
};

export const contextPortfolio = createContext<TContextPortfolio>(initialContextPortfolio);

const ContextPortfolioProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const navigate = useNavigate();
    const {
        getDetailPersonalInformationPortofolio,
        getListCategorySkillPortofolio,
        getListSkillPortofolio,
        getListProjectPortofolio,
        getListExperiancePortofolio,
        getListEducationPortofolio,
        getListSocialLinkPortofolio,
        getListKeyMetricPortofolio,
    } = usePortofolioAPI();

    const [isLoading, setIsLoading] = useState<TLoadingState>(initialContextPortfolio['isLoading']);

    const [personalInformation, setPersonalInformation] = useState<TPersonalInformation | null>(null);
    const [skillCategoryList, setSkillCategoryList] = useState<TMasterCategorySkill[]>([]);
    const [skillList, setSkillList] = useState<TSkillUser[]>([]);
    const [projectConfig, setProjectConfig] = useState<TContextPortfolio['projectConfig']>({
        projectList: [],
        currentPage: 0,
        totalPage: 0,
    });
    const [experienceList, setExperienceList] = useState<TExperiance[]>([]);
    const [educationList, setEducationList] = useState<TEducation[]>([]);
    const [socialLinkList, setSocialLinkList] = useState<TSocialLink[]>([]);
    const [keyMetricList, setKeyMetricList] = useState<TKeyMetric[]>([]);

    const [activeIdCat, setActiveIdCat] = useState<string>('');

    const getPersonalInformation = useCallback(
        withLoading(
            async () => {
                const result = await getDetailPersonalInformationPortofolio();
                if (!result?.data) {
                    navigate(`/`, { replace: true });
                    return;
                }

                setPersonalInformation(result.data);
            },
            setIsLoading,
            EPortfolioLoading.PERSONAL_INFORMATION,
        ),
        [],
    );

    const getSkillCategoryList = useCallback(
        withLoading(
            async () => {
                const result = await getListCategorySkillPortofolio();
                if (result?.data) setSkillCategoryList(result.data);
            },
            setIsLoading,
            EPortfolioLoading.SKILL_CATEGORY,
        ),
        [],
    );

    const getSkillList = useCallback(
        withLoading(
            async (params?: Partial<TParamsListSkillUser>) => {
                setActiveIdCat(params?.id_category || '');
                const result = await getListSkillPortofolio(params || {});
                if (result?.data?.items) setSkillList(result.data.items);
            },
            setIsLoading,
            EPortfolioLoading.SKILL_LIST,
        ),
        [],
    );

    const getProjectList = useCallback(
        withLoading(
            async (params?: Partial<TParamsListProject>) => {
                const result = await getListProjectPortofolio({
                    ...params,
                    items_perpage: 12,
                });
                if (result?.data?.items)
                    setProjectConfig({
                        projectList: result.data.items,
                        currentPage: result.data.current_page,
                        totalPage: result.data.total_pages,
                    });
            },
            setIsLoading,
            EPortfolioLoading.PROJECT_LIST,
        ),
        [],
    );

    const getExperienceList = useCallback(
        withLoading(
            async (params?: Partial<TParamsListExperiance>) => {
                const result = await getListExperiancePortofolio(params || {});
                if (result?.data?.items) setExperienceList(result.data.items);
            },
            setIsLoading,
            EPortfolioLoading.EXPERIENCE_LIST,
        ),
        [],
    );

    const getEducationList = useCallback(
        withLoading(
            async (params?: Partial<TParamsListEducation>) => {
                const result = await getListEducationPortofolio(params);
                if (result?.data?.items) setEducationList(result.data.items);
            },
            setIsLoading,
            EPortfolioLoading.EDUCATION_LIST,
        ),
        [],
    );

    const getSocialLinkList = useCallback(
        withLoading(
            async () => {
                const result = await getListSocialLinkPortofolio();
                if (result?.data) setSocialLinkList(result.data);
            },
            setIsLoading,
            EPortfolioLoading.SOCIAL_LINK,
        ),
        [],
    );

    const getKeyMetricList = useCallback(
        withLoading(
            async () => {
                const result = await getListKeyMetricPortofolio();
                if (result?.data) setKeyMetricList(result.data);
            },
            setIsLoading,
            EPortfolioLoading.KEY_METRIC,
        ),
        [],
    );

    return (
        <contextPortfolio.Provider
            value={{
                personalInformation,
                skillCategoryList,
                skillList,
                projectConfig,
                experienceList,
                educationList,
                socialLinkList,
                keyMetricList,

                setPersonalInformation,
                setSkillCategoryList,
                setSkillList,
                setProjectConfig,
                setExperienceList,
                setEducationList,
                setSocialLinkList,
                setKeyMetricList,

                getPersonalInformation,
                getSkillCategoryList,
                getSkillList,
                getProjectList,
                getExperienceList,
                getEducationList,
                getSocialLinkList,
                getKeyMetricList,
                isLoading,

                setActiveIdCat,
                activeIdCat,
            }}
        >
            {children}
        </contextPortfolio.Provider>
    );
};

const withLoading =
    <T extends any[], R>(asyncFn: (...args: T) => Promise<R>, setLoading: React.Dispatch<React.SetStateAction<TLoadingState>>, key: EPortfolioLoading) =>
    async (...args: T): Promise<R | undefined> => {
        setLoading((prev) => ({
            ...prev,
            [key]: true,
        }));

        try {
            return await asyncFn(...args);
        } catch (error) {
            console.error(`[${key}]`, error);
            return undefined;
        } finally {
            setLoading((prev) => ({
                ...prev,
                [key]: false,
            }));
        }
    };

export default ContextPortfolioProvider;
