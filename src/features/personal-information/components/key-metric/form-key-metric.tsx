import { useContext, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import EVENT_EDUCATION from '@features/education/event-emitters/education-event';
import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info';
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event';
import { TKeyMetric } from '@features/personal-information/types/personal-information-types';
import keyMetricSchema, { initialFormKeyMetric } from '@features/personal-information/validations/key-metric-schema';
import InputBase from '@components/ui/input/input-base';
import ContainerModalForm from '@components/ui/modal/container-modal-form';

import useEventEmitter from '@hooks/use-event-emitter';
import { deepCopy, extractValueFromForm, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';

const FormKeyMetric = () => {
    const { setListKeyMetric } = useContext(contextFormPersonalInfo);

    const [modalForm, setModalForm] = useState({
        moduleName: 'Key Metric',
        isShow: false,
        action: TTypeActionModalForm.ADD,
        customeClass: { mdBody: '  md:min-w-[38rem]  space-y-4' },
    });
    const [form, setForm] = useState(deepCopy({ ...initialFormKeyMetric }));

    type TKeyFormKeyMetric = keyof typeof form;

    useEventEmitter(EVENT_PERSONAL_INFO.SET_MODAL_FORM_KEY_METRIC, (data) => {
        setModalForm({
            ...modalForm,
            ...data,
        });
    });

    useEventEmitter(EVENT_PERSONAL_INFO.SET_KEY_METRIC, (data) => {
        setForm({ ...mappingValuesToForm({ values: data, form }) });
    });

    const handleOnChange = (e: TEventOnChange) => {
        const name = e.target.name as TKeyFormKeyMetric;
        const value = e.target.value;
        const currForm = form;
        currForm[name].value = value;
        setForm({
            ...currForm,
        });
    };

    const handleCloseFormKeyMetric = () => {
        setForm(deepCopy({ ...initialFormKeyMetric }));
        setModalForm({
            ...modalForm,
            isShow: false,
        });
    };

    const handleOnSubmit = async (event: TEventSubmitForm): Promise<void> => {
        event?.preventDefault();

        const { isValid, form: validatedForm } = mappingErrorsToForm<TKeyMetric, typeof form>({
            form: deepCopy(form),
            schema: keyMetricSchema,
        });

        setForm(validatedForm);
        if (!isValid) return;

        const extractedForm = extractValueFromForm(validatedForm);

        setListKeyMetric((prev) => {
            const existingIndex = prev.findIndex(({ id }) => id === extractedForm.id);

            if (existingIndex === -1) {
                return [
                    ...prev,
                    {
                        ...extractedForm,
                        id: `${Date.now()}-NEW`,
                    },
                ];
            }

            const updated = [...prev];
            updated[existingIndex] = {
                ...updated[existingIndex],
                ...extractedForm,
            };

            return updated;
        });

        handleCloseFormKeyMetric();
        eventEmitter.emit(EVENT_EDUCATION.REFRESH_DATA_TABLE_EDUCATION, true);
    };

    return (
        <ContainerModalForm {...modalForm} onClose={handleCloseFormKeyMetric} onSubmit={handleOnSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <InputBase {...form['key']} onChange={handleOnChange} />
                <InputBase {...form['value']} onChange={handleOnChange} />
            </div>
        </ContainerModalForm>
    );
};

export default FormKeyMetric;
