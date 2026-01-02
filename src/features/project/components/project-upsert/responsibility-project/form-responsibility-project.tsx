import { useContext, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import useProjectResponsibilityApi from '@features/project/apis/use-project-responsibility-api';
import { contextFormProject } from '@features/project/context/form-project-context';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import projectResponsibilitySchema, { initialFormProjectResponsibility, TProjectResponsibility } from '@features/project/validation/project-responsibility-schema';
import InputTextEditor from '@components/ui/input/input-text-editor';
import ContainerModalForm from '@components/ui/modal/container-modal-form';

import useEventEmitter from '@hooks/use-event-emitter';
import { deepCopy, extractValueFromForm, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventSubmitForm } from '@typescript/ui-types';

const FormResponsibilityProject = () => {
    const [modalForm, setModalForm] = useState({
        moduleName: 'Project Responsibility',
        isShow: false,
        action: TTypeActionModalForm.ADD,
        customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' },
    });
    const { formResponsibilityProject: form, formInformationProject, handleOnChangeFormResponsibilityProject: handleOnChange, setFormResponsibilityProject: setForm } = useContext(contextFormProject);
    const { upsertProjectResponsibility } = useProjectResponsibilityApi();

    useEventEmitter(EVENT_PROJECT.SET_RESPONSIBILITY_PROJECT, (data) => {
        setForm({ ...mappingValuesToForm({ values: data, form }) });
    });

    useEventEmitter(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, (data) => {
        setModalForm({
            ...modalForm,
            ...data,
        });
    });

    const handleCloseModalForm = () => {
        setForm(deepCopy({ ...initialFormProjectResponsibility }));
        setModalForm({
            ...modalForm,
            isShow: false,
        });
    };

    const handleOnSubmit = async (e: TEventSubmitForm) => {
        e?.preventDefault();
        const { isValid, form: updatedForm } = mappingErrorsToForm<TProjectResponsibility, typeof form>({
            form,
            schema: projectResponsibilitySchema,
        });

        setForm({
            ...updatedForm,
        });
        if (!isValid) return;

        const extractForm = {
            ...extractValueFromForm(form),
        };

        const result = await upsertProjectResponsibility({
            ...extractForm,
            id_project: formInformationProject.id.value,
        });

        if (!result?.status) return;
        handleCloseModalForm();
        eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_LIST_RESPONSIBILITY_PROJECT, true);
    };

    return (
        <ContainerModalForm {...modalForm} onClose={handleCloseModalForm} onSubmit={handleOnSubmit}>
            <InputTextEditor onChange={handleOnChange} {...form['description']} />
        </ContainerModalForm>
    );
};

export default FormResponsibilityProject;
