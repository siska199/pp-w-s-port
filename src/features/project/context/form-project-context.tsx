import React, { createContext, SetStateAction, useCallback, useEffect, useState } from 'react';

import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import informationProjectSchema, { initialFormInformationProject, TInformationProjectSchema } from '@features/project/validation/information-project-schema';
import { initialFormProjectMenu } from '@features/project/validation/project-menu-schema';
import { initialFormProjectResponsibility } from '@features/project/validation/project-responsibility-schema';

import useExperianceAPI from '@features/experiance/apis/use-experiance-api';
import useProjectAPI from '@features/project/apis/use-project-api';
import useSkillUserAPI from '@features/skill-user/apis/use-skill-user-api';
import useEventEmitter from '@hooks/use-event-emitter';
import useFile from '@hooks/use-file';
import { deepCopy, extractValueFromForm, generateOptions, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { useAppDispatch } from '@store/store';
import { handleSetIsloading } from '@store/ui-slice';
import { TTypeActionData } from '@typescript/index-type';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';
import { useNavigate, useSearchParams } from 'react-router-dom';

export interface TContextFormProject {
    formInformationProject: typeof initialFormInformationProject;
    formProjectMenu: typeof initialFormProjectMenu;
    formResponsibilityProject: typeof initialFormProjectResponsibility;
    setFormInformationProject: React.Dispatch<SetStateAction<TContextFormProject['formInformationProject']>>;
    setFormProjectMenu: React.Dispatch<SetStateAction<TContextFormProject['formProjectMenu']>>;
    setFormResponsibilityProject: React.Dispatch<SetStateAction<TContextFormProject['formResponsibilityProject']>>;
    handleOnChangeFormInformationProject: (e: TEventOnChange) => void;
    handleOnChangeFormProjectMenu: (e: TEventOnChange) => void;
    handleOnChangeFormResponsibilityProject: (e: TEventOnChange) => void;
    handleOnSubmitInformationProject: (e: TEventSubmitForm) => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const initialContextFormProject = {
    formInformationProject: initialFormInformationProject,
    formProjectMenu: initialFormProjectMenu,
    formResponsibilityProject: initialFormProjectResponsibility,
    handleOnChangeFormInformationProject: () => null,
    handleOnChangeFormProjectMenu: () => null,
    handleOnChangeFormResponsibilityProject: () => null,
    setFormInformationProject: () => null,
    setFormProjectMenu: () => null,
    setFormResponsibilityProject: () => null,

    handleOnSubmitInformationProject: (_e: TEventSubmitForm) => null,
    isLoading: false,
    setIsLoading: () => null,
};

export const contextFormProject = createContext<TContextFormProject>(initialContextFormProject);

const ContextFormProjectProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { getListSkillUser } = useSkillUserAPI();
    const { getListExperiance } = useExperianceAPI();
    const { upsertProject, getProjectDetail } = useProjectAPI();
    const { handleGetFileFromUrl } = useFile();

    const [isLoading, setIsLoading] = useState(false);

    const [formInformationProject, setFormInformationProject] = useState(deepCopy({ ...initialFormInformationProject }));
    const [formProjectMenu, setFormProjectMenu] = useState(deepCopy({ ...initialFormProjectMenu }));
    const [formResponsibilityProject, setFormResponsibilityProject] = useState(deepCopy({ ...initialFormProjectResponsibility }));

    useEffect(() => {
        handleInitData();
    }, []);

    const handleInitData = async () => {
        dispatch(handleSetIsloading(true));
        try {
            let updatedFormInformationProject = formInformationProject;
            updatedFormInformationProject.id_skill_users.options = await generateOptions({
                options: (await getListSkillUser({}))?.data?.items || [],
                labelField: 'skill_name',
            });
            updatedFormInformationProject.id_experiance.options = await generateOptions({
                options: (await getListExperiance({}))?.data?.items || [],
                labelField: 'company_name',
            });
            const id = searchParams.get('id');
            const resultInformationProject = id ? await getProjectDetail(id) : null;
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

    type TKeyFormInformationProject = keyof typeof formInformationProject;
    type TKeyFormProjectMenu = keyof typeof formProjectMenu;
    type TKeyFormResponsibilityProject = keyof typeof formResponsibilityProject;

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

    const handleOnSubmitInformationProject = async (e: TEventSubmitForm) => {
        dispatch(handleSetIsloading(true));
        setIsLoading(true);
        try {
            e?.preventDefault();
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
                handleOnChangeFormInformationProject,
                handleOnChangeFormProjectMenu,
                handleOnChangeFormResponsibilityProject,
                setFormInformationProject,
                setFormProjectMenu,
                setFormResponsibilityProject,
                handleOnSubmitInformationProject,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </contextFormProject.Provider>
    );
};
export default ContextFormProjectProvider;
