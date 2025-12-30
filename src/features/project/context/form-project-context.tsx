import React, { createContext, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useExperianceAPI from '@features/experiance/apis/use-experiance-api';
import useProjectAPI from '@features/project/apis/use-project-api';
import useProjectMenuApi, { TParamsListProjectMenu } from '@features/project/apis/use-project-menu-api';
import useProjectResponsibilityApi, { TParamsListProjectResponsibility } from '@features/project/apis/use-project-responsibility-api';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import { TProjectLinkItem, TProjectMenuItem, TProjectResponsibilityItem } from '@features/project/types/project-type';
import informationProjectSchema, { initialFormInformationProject, TInformationProjectSchema } from '@features/project/validation/information-project-schema';
import { initialFormProjectMenu } from '@features/project/validation/project-menu-schema';
import useSkillUserAPI from '@features/skill-user/apis/use-skill-user-api';

import useEventEmitter from '@hooks/use-event-emitter';
import useFile from '@hooks/use-file';
import { useAppDispatch } from '@store/store';
import { handleSetIsloading } from '@store/ui-slice';
import { deepCopy, extractValueFromForm, generateOptions, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionData } from '@typescript/index-type';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';

import { initialFormProjectResponsibility } from '../validation/project-responsibility-schema';
import useMasterAPI from '@apis/use-master-api';
import { initialFormProjectLink } from '@features/project/validation/project-link-schema';
import useProjectLinkApi, { TParamsListProjectLink } from '../apis/use-project-link-api';

export interface TContextFormProject {
    formInformationProject: typeof initialFormInformationProject;
    formProjectMenu: typeof initialFormProjectMenu;
    formResponsibilityProject: typeof initialFormProjectResponsibility;
    formLinkProject: typeof initialFormProjectLink;

    setFormInformationProject: React.Dispatch<SetStateAction<TContextFormProject['formInformationProject']>>;
    setFormProjectMenu: React.Dispatch<SetStateAction<TContextFormProject['formProjectMenu']>>;
    setFormResponsibilityProject: React.Dispatch<SetStateAction<TContextFormProject['formResponsibilityProject']>>;
    setFormLinkProject: React.Dispatch<SetStateAction<TContextFormProject['formLinkProject']>>;

    handleOnChangeFormInformationProject: (e: TEventOnChange) => void;
    handleOnChangeFormProjectMenu: (e: TEventOnChange) => void;
    handleOnChangeFormResponsibilityProject: (e: TEventOnChange) => void;
    handleOnChangeFormLinkProject: (e: TEventOnChange) => void;

    handleOnSubmitInformationProject: (e: TEventSubmitForm) => void;

    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;

    listProjectMenu: TProjectMenuItem[];
    getListProjectMenu: (params: TParamsListProjectMenu) => Promise<void>;

    listProjectResponsibility: TProjectResponsibilityItem[];
    getListProjectResponsibility: (params: TParamsListProjectResponsibility) => Promise<void>;

    listProjectLink: TProjectLinkItem[];
    getListProjectLink: (params: TParamsListProjectLink) => Promise<void>;
}

const initialContextFormProject = {
    formInformationProject: initialFormInformationProject,
    formProjectMenu: initialFormProjectMenu,
    formResponsibilityProject: initialFormProjectResponsibility,
    formLinkProject: initialFormProjectLink,

    handleOnChangeFormInformationProject: () => null,
    handleOnChangeFormProjectMenu: () => null,
    handleOnChangeFormResponsibilityProject: () => null,
    handleOnChangeFormLinkProject: () => null,

    setFormInformationProject: () => null,
    setFormProjectMenu: () => null,
    setFormResponsibilityProject: () => null,
    setFormLinkProject: () => null,

    handleOnSubmitInformationProject: (_e: TEventSubmitForm) => null,
    isLoading: false,
    setIsLoading: () => null,
    listProjectMenu: [],
    getListProjectMenu: async () => {},
    listProjectResponsibility: [],
    getListProjectResponsibility: async () => {},

    listProjectLink: [],
    getListProjectLink: async () => {},
};

export const contextFormProject = createContext<TContextFormProject>(initialContextFormProject);

const ContextFormProjectProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { getListMasterProfession } = useMasterAPI();
    const { getListSkillUser } = useSkillUserAPI();
    const { getListExperiance } = useExperianceAPI();
    const { upsertProject, getProjectDetail } = useProjectAPI();
    const { handleGetFileFromUrl } = useFile();
    const { getListProjectMenu: getListProjectMenuApi } = useProjectMenuApi();
    const { getListProjectResponsibility: getListProjectResponsibilityApi } = useProjectResponsibilityApi();
    const { getListProjectLink: getListProjectLinkApi } = useProjectLinkApi();
    const [isLoading, setIsLoading] = useState(false);

    const [formInformationProject, setFormInformationProject] = useState(deepCopy({ ...initialFormInformationProject }));
    const [formProjectMenu, setFormProjectMenu] = useState(deepCopy({ ...initialFormProjectMenu }));
    const [formResponsibilityProject, setFormResponsibilityProject] = useState(deepCopy({ ...initialFormProjectResponsibility }));
    const [formLinkProject, setFormLinkProject] = useState(deepCopy({ ...initialFormProjectLink }));

    const [listProjectMenu, setListProjectMenu] = useState<TProjectMenuItem[]>([]);
    const [listProjectResponsibility, setListProjectResponsibility] = useState<TProjectResponsibilityItem[]>([]);
    const [listProjectLink, setListProjectLink] = useState<TProjectLinkItem[]>([]);

    useEffect(() => {
        handleInitData();
    }, []);

    const handleInitData = async () => {
        dispatch(handleSetIsloading(true));
        try {
            let updatedFormInformationProject = formInformationProject;
            updatedFormInformationProject['id_profession'].options = generateOptions({
                options: (await getListMasterProfession())?.data || [],
            });
            updatedFormInformationProject.id_skill_users.options = await generateOptions({
                options: (await getListSkillUser({}))?.data?.items || [],
                labelField: 'skill_name',
            });
            updatedFormInformationProject.id_experiance.options = await generateOptions({
                options: (await getListExperiance({}))?.data?.items || [],
                labelField: 'company_name',
            });
            const id = searchParams.get('id');
            const result = id
                ? await Promise.all([
                      getProjectDetail(id),
                      getListProjectMenu(
                          {
                              id_project: id,
                          },
                          false,
                      ),
                      getListProjectResponsibility(
                          {
                              id_project: id,
                          },
                          false,
                      ),
                  ])
                : null;
            const resultInformationProject = result?.[0];

            if (resultInformationProject?.data) {
                updatedFormInformationProject = mappingValuesToForm({
                    form: updatedFormInformationProject,
                    values: resultInformationProject.data,
                });
                updatedFormInformationProject['thumbnail_image'].value = await handleGetFileFromUrl({
                    url: resultInformationProject.data?.thumbnail_image,
                    filename: 'thumbnail_image',
                });
            }
            setFormInformationProject({
                ...updatedFormInformationProject,
            });
        } catch (error: any) {
            console.log('error in function handle init data: ', error?.message);
        } finally {
            dispatch(handleSetIsloading(false));
        }
    };

    const getListProjectMenu = async (params: TParamsListProjectMenu, isLoading: boolean = true) => {
        const result = await getListProjectMenuApi(
            {
                ...params,
            },
            isLoading,
        );
        if (!result.data) return;
        setListProjectMenu(result.data);
    };

    const getListProjectResponsibility = async (params: TParamsListProjectResponsibility, isLoading: boolean = true) => {
        const result = await getListProjectResponsibilityApi(params, isLoading);
        if (!result.data) return;
        setListProjectResponsibility(result.data);
    };
    const getListProjectLink = async (params: TParamsListProjectLink, isLoading: boolean = true) => {
        const result = await getListProjectLinkApi(params, isLoading);
        if (!result.data) return;
        setListProjectLink(result.data);
    };

    type TKeyFormInformationProject = keyof typeof formInformationProject;
    type TKeyFormProjectMenu = keyof typeof formProjectMenu;
    type TKeyFormResponsibilityProject = keyof typeof formResponsibilityProject;
    type TKeyFormLinkProject = keyof typeof formLinkProject;

    useEventEmitter(EVENT_PROJECT.SET_SELECTED_MENU_PROJECT, ({ data, action }) => {
        if (action === TTypeActionData.EDIT) {
            setFormProjectMenu({ ...mappingValuesToForm({ values: data, form: formProjectMenu }) });
        }
    });

    useEventEmitter(EVENT_PROJECT.SET_SELECTED_RESPONSIBILITY_PROJECT, ({ data, action }) => {
        if (action === TTypeActionData.EDIT) {
            setFormResponsibilityProject({
                ...mappingValuesToForm({ values: data, form: formResponsibilityProject }),
            });
        }
    });

    useEventEmitter(EVENT_PROJECT.SET_SELECTED_LINK_PROJECT, ({ data, action }) => {
        if (action === TTypeActionData.EDIT) {
            setFormLinkProject({
                ...mappingValuesToForm({ values: data, form: formLinkProject }),
            });
        }
    });

    const handleOnChangeFormInformationProject = useCallback((e: TEventOnChange) => {
        const currForm = formInformationProject;
        const name = e.target.name as TKeyFormInformationProject;
        const value = e.target.value;
        currForm[name].value = value;
        currForm[name].errorMessage = '';
        setFormInformationProject({
            ...currForm,
        });
    }, []);

    const handleOnChangeFormProjectMenu = (e: TEventOnChange) => {
        const currForm = formProjectMenu;
        const name = e.target.name as TKeyFormProjectMenu;
        const value = e.target.value;
        currForm[name].value = value;
        currForm[name].errorMessage = '';
        setFormProjectMenu({
            ...currForm,
        });
    };

    const handleOnChangeFormResponsibilityProject = useCallback((e: TEventOnChange) => {
        const currForm = formResponsibilityProject;
        const name = e.target.name as TKeyFormResponsibilityProject;
        const value = e.target.value;
        currForm[name].value = value;

        setFormResponsibilityProject({
            ...currForm,
        });
    }, []);

    const handleOnChangeFormLinkProject = useCallback((e: TEventOnChange) => {
        const currForm = formLinkProject;
        const name = e.target.name as TKeyFormLinkProject;
        const value = e.target.value;
        currForm[name].value = value;

        setFormLinkProject({
            ...currForm,
        });
    }, []);

    const handleOnSubmitInformationProject = async (e: TEventSubmitForm) => {
        dispatch(handleSetIsloading(true));
        setIsLoading(true);
        try {
            e?.preventDefault();
            const id = searchParams.get('id');

            const { isValid, form: updatedFormInformationProject } = mappingErrorsToForm<TInformationProjectSchema, typeof formInformationProject>({
                form: formInformationProject,
                schema: informationProjectSchema,
            });

            setFormInformationProject({
                ...updatedFormInformationProject,
            });
            if (!isValid) return;

            const informationProject = {
                ...extractValueFromForm({ ...formInformationProject }),
            };
            const result = await upsertProject({
                ...informationProject,
                ...(id && { id }),
            });
            result?.status && navigate(`?id=${result?.data?.id}`, { replace: true });
            updatedFormInformationProject.id.value = result?.data?.id || '';
            setFormInformationProject({
                ...updatedFormInformationProject,
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        } finally {
            setIsLoading(false);
            dispatch(handleSetIsloading(false));
        }
    };

    return (
        <contextFormProject.Provider
            value={{
                formInformationProject,
                formProjectMenu,
                formResponsibilityProject,
                formLinkProject,

                handleOnChangeFormInformationProject,
                handleOnChangeFormProjectMenu,
                handleOnChangeFormResponsibilityProject,
                handleOnChangeFormLinkProject,
                setFormInformationProject,
                setFormProjectMenu,
                setFormResponsibilityProject,
                setFormLinkProject,

                handleOnSubmitInformationProject,
                isLoading,
                setIsLoading,
                listProjectMenu,
                getListProjectMenu,
                listProjectResponsibility,
                getListProjectResponsibility,
                listProjectLink,
                getListProjectLink,
            }}
        >
            {children}
        </contextFormProject.Provider>
    );
};
export default ContextFormProjectProvider;
