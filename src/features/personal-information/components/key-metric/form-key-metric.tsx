import { eventEmitter } from '@event-emitters';
import { useContext, useState } from 'react';

import ContainerModalForm from '@components/ui/modal/container-modal-form';
import EVENT_EDUCATION from '@features/education/event-emitters/education-event';
import educationSchema, { TEducationSchema } from '@features/education/validations/education-schema';

import InputBase from '@components/ui/input/input-base';
import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info';
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event';
import { initialFormKeyMetric } from '@features/personal-information/validations/key-metric-schema';
import useEventEmitter from '@hooks/use-event-emitter';
import { deepCopy, extractValueFromForm, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';

const FormKeyMetric = () => {
    const { listKeyMetric } = useContext(contextFormPersonalInfo);

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

        const { isValid, form: validatedForm } = mappingErrorsToForm<TEducationSchema, typeof form>({
            form: deepCopy(form),
            schema: educationSchema,
        });

        setForm(validatedForm);

        if (!isValid) return;

        const extractedForm = extractValueFromForm(validatedForm);

        const existingIndex = listKeyMetric.findIndex(({ id }) => id === extractedForm.id);

        if (existingIndex >= 0) {
            listKeyMetric[existingIndex] = {
                ...listKeyMetric[existingIndex],
                ...extractedForm,
            };
        } else {
            listKeyMetric.push(extractedForm);
        }

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
