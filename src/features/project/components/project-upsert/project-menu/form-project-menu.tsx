import React, { useContext, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import useProjectMenuApi from '@features/project/apis/use-project-menu-api';
import { contextFormProject } from '@features/project/context/form-project-context';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import projectMenuSchema, { initialFormProjectMenu, TProjectMenu } from '@features/project/validation/project-menu-schema';
import InputBase from '@components/ui/input/input-base';
import InputFileV1 from '@components/ui/input/input-file/input-file-v1';
import InputFileV2 from '@components/ui/input/input-file/input-file-v2';
import InputTextArea from '@components/ui/input/input-text-area';
import InputTextEditor from '@components/ui/input/input-text-editor';
import ContainerModalForm from '@components/ui/modal/container-modal-form';

import useEventEmitter from '@hooks/use-event-emitter';
import { buildFormData, deepCopy, extractValueFromForm, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventSubmitForm } from '@typescript/ui-types';

const FormProjectMenu = () => {
    const { formProjectMenu: form, formInformationProject, handleOnChangeFormProjectMenu: handleOnChange, setFormProjectMenu: setForm } = useContext(contextFormProject);
    const { upsertProjectMenu } = useProjectMenuApi();

    const [modalForm, setModalForm] = useState({
        moduleName: 'Menu Project',
        isShow: false,
        action: TTypeActionModalForm.ADD,
        customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' },
    });

    useEventEmitter(EVENT_PROJECT.SET_MENU_PROJECT, (data) => {
        setForm({ ...mappingValuesToForm({ values: data, form }) });
    });

    useEventEmitter(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, (data) => {
        setModalForm({
            ...modalForm,
            ...data,
        });
    });

    const handleCloseFormProjectMenu = () => {
        initialFormProjectMenu.main_image.value = null;
        setForm(deepCopy({ ...initialFormProjectMenu }));
        setModalForm({
            ...modalForm,
            isShow: false,
        });
    };

    const handleOnSubmit = async (e: TEventSubmitForm) => {
        e?.preventDefault();
        const { isValid, form: updatedForm } = mappingErrorsToForm<TProjectMenu, typeof form>({
            form,
            schema: projectMenuSchema,
        });


        setForm({
            ...updatedForm,
        });
        if (!isValid) return;

        const extractForm = {
            ...extractValueFromForm(form),
        };

        const formData = buildFormData(extractForm);
        formData.append('id_project', formInformationProject.id.value);

        const result = await upsertProjectMenu(formData);

        if (!result?.status) return;
        handleCloseFormProjectMenu();
        eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_LIST_MENU_PROJECT, true);
    };

    return (
        <ContainerModalForm {...modalForm} onClose={handleCloseFormProjectMenu} onSubmit={handleOnSubmit}>
            <InputBase {...form['name']} onChange={handleOnChange} />
            <InputFileV1 {...form['main_image']} onChange={handleOnChange} />
            <InputTextArea {...form['description']} onChange={handleOnChange} />
            <InputTextEditor {...form['features']} onChange={handleOnChange} />
            <InputFileV2 {...form['related_images']} onChange={handleOnChange} />
        </ContainerModalForm>
    );
};

export default React.memo(FormProjectMenu);
