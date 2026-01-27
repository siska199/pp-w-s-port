import { useEffect, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import useExperianceAPI from '@features/experiance/apis/use-experiance-api';
import EVENT_EXPERIANCE from '@features/experiance/event-emitters/experiance-event';
import experianceSchema, { initialFormExperiance, TExperianceSchema, TOptionsFormExperiance } from '@features/experiance/validation/experiance-schema';
import InputCheckbox from '@components/ui/input/input-checkbox';
import InputDate from '@components/ui/input/input-date';
import InputSelect from '@components/ui/input/input-select/input-select';
import InputTextEditor from '@components/ui/input/input-text-editor';
import ContainerModalForm from '@components/ui/modal/container-modal-form';
import useMasterAPI from '@apis/use-master-api';

import useEventEmitter from '@hooks/use-event-emitter';
import { deepCopy, extractValueFromForm, generateOptions, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';

const FormExperiance = () => {
    const { getListMasterCompany, getListMasterProfession } = useMasterAPI();
    const { upsertExperiance } = useExperianceAPI();

    const [modalForm, setModalForm] = useState({
        moduleName: 'Experiance',
        isShow: false,
        action: TTypeActionModalForm.ADD,
        customeClass: { mdBody: 'md:min-w-[38rem] ' },
    });

    const [form, setForm] = useState(deepCopy({ ...initialFormExperiance }));
    const [options, setOptions] = useState<TOptionsFormExperiance>({
        companies: [],
        professions: [],
    });
    useEffect(() => {
        handleInitialData();
    }, []);

    const handleInitialData = async () => {
        try {
            const updatedForm = form;
            const professions = generateOptions({
                options: (await getListMasterProfession())?.data || [],
            });
            const companies = generateOptions({
                options: (await getListMasterCompany())?.data || [],
            });

            updatedForm['id_company'].options = [...companies];
            updatedForm['id_profession'].options = [...professions];

            setOptions({
                companies: [...companies],
                professions: [...professions],
            });
            setForm({
                ...updatedForm,
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        }
    };
    useEventEmitter(EVENT_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE, (data) => {
        setModalForm({ ...modalForm, ...data });
    });

    useEventEmitter(EVENT_EXPERIANCE.SET_EXPERIANCE, (data) => {
        setForm({ ...mappingValuesToForm({ values: data, form }) });
    });

    const handleOnChange = (e: TEventOnChange) => {
        const name = e.target.name as keyof typeof form;
        const value = e.target.value;
        const currForm = form;
        currForm[name].value = value;
        currForm[name].errorMessage = '';

        if (name === 'is_currently_work_here') {
            currForm.end_at.errorMessage = '';
        }

        setForm({
            ...currForm,
        });
    };

    const handleOnSubmit = async (e: TEventSubmitForm) => {
        e?.preventDefault();
        const { isValid, form: updatedForm } = mappingErrorsToForm<TExperianceSchema, typeof form>({
            form: deepCopy({ ...form }),
            schema: experianceSchema,
        });
        if (updatedForm.is_currently_work_here.value === 'true') {
            updatedForm.end_at.errorMessage = '';
        }
        setForm({
            ...updatedForm,
        });
        if (!isValid) return;

        const extractForm = {
            ...extractValueFromForm(form),
        } as unknown as TExperianceSchema;

        const result = await upsertExperiance({
            ...extractForm,
        });
        if (!result?.status) return;
        handleCloseFormExperiance();
        eventEmitter.emit(EVENT_EXPERIANCE.REFRESH_DATA_TABLE_EXPERIANCE, true);
    };

    const handleCloseFormExperiance = () => {
        initialFormExperiance['id_company'].options = options?.companies;
        initialFormExperiance['id_profession'].options = options?.professions;
        setForm(deepCopy({ ...initialFormExperiance }));
        setModalForm({ ...modalForm, isShow: false });
    };

    return (
        <ContainerModalForm {...modalForm} onClose={handleCloseFormExperiance} onSubmit={handleOnSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <InputSelect {...form['id_company']} onChange={handleOnChange} />
                <InputSelect {...form['id_profession']} onChange={handleOnChange} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <InputDate {...form['start_at']} onChange={handleOnChange} />
                    <InputCheckbox {...form['is_currently_work_here']} onChange={handleOnChange} />
                </div>
                <InputDate {...form['end_at']} disabled={!form['start_at'].value || form['is_currently_work_here'].value === 'true'} onChange={handleOnChange} />
            </div>
            <InputTextEditor {...form['description']} onChange={handleOnChange} />
        </ContainerModalForm>
    );
};

export default FormExperiance;
