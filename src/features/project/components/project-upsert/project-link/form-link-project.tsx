import { useContext, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import useProjectLinkApi from '@features/project/apis/use-project-link-api';
import { contextFormProject } from '@features/project/context/form-project-context';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import projectLinkSchema, { initialFormProjectLink, TProjectLink } from '@features/project/validation/project-link-schema';
import InputBase from '@components/ui/input/input-base';
import ContainerModalForm from '@components/ui/modal/container-modal-form';

import useEventEmitter from '@hooks/use-event-emitter';
import { deepCopy, extractValueFromForm, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventSubmitForm } from '@typescript/ui-types';

const FormLinkProject = () => {
    const [modalForm, setModalForm] = useState({
        moduleName: 'Project Link',
        isShow: false,
        action: TTypeActionModalForm.ADD,
        customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' },
    });
    const { isEditAction, formLinkProject: form, formInformationProject, handleOnChangeFormLinkProject: handleOnChange, setFormLinkProject: setForm } = useContext(contextFormProject);
    const { upsertProjectLink } = useProjectLinkApi();

    useEventEmitter(EVENT_PROJECT.SET_LINK_PROJECT, (data) => {
        setForm({ ...mappingValuesToForm({ values: data, form }) });
    });

    useEventEmitter(EVENT_PROJECT.SET_MODAL_FORM_LINK_PROJECT, (data) => {
        setModalForm({
            ...modalForm,
            ...data,
        });
    });

    const handleCloseModalForm = () => {
        setForm(deepCopy({ ...initialFormProjectLink }));
        setModalForm({
            ...modalForm,
            isShow: false,
        });
    };

    const handleOnSubmit = async (e: TEventSubmitForm) => {
        e?.preventDefault();
        const { isValid, form: updatedForm } = mappingErrorsToForm<TProjectLink, typeof form>({
            form,
            schema: projectLinkSchema,
        });

        setForm({
            ...updatedForm,
        });
        if (!isValid) return;

        const extractForm = {
            ...extractValueFromForm(form),
            isEditAction,
        } as TProjectLink;

        const result = await upsertProjectLink({
            ...extractForm,
            id_project: formInformationProject.id.value,
        });

        if (!result?.status) return;
        handleCloseModalForm();
        eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_LIST_LINK_PROJECT, true);
    };

    return (
        <ContainerModalForm {...modalForm} onClose={handleCloseModalForm} onSubmit={handleOnSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <InputBase {...form['label']} onChange={handleOnChange} />
                <InputBase {...form['url']} onChange={handleOnChange} />
            </div>
        </ContainerModalForm>
    );
};

export default FormLinkProject;
