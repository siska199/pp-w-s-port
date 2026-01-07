import React, { useEffect, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import useEducationApi from '@features/education/apis/use-education-api';
import EVENT_EDUCATION from '@features/education/event-emitters/education-event';
import educationSchema, { initialFormEducation, TEducationSchema, TOptionsFormEducation } from '@features/education/validations/education-schema';
import InputDate from '@components/ui/input/input-date';
import InputNumber from '@components/ui/input/input-number';
import InputSelect from '@components/ui/input/input-select/input-select';
import ContainerModalForm from '@components/ui/modal/container-modal-form';
import useMasterAPI from '@apis/use-master-api';

import useEventEmitter from '@hooks/use-event-emitter';
import { deepCopy, extractValueFromForm, generateOptions, mappingErrorsToForm, mappingValuesToForm } from '@lib/helper/function';
import { TTypeActionModalForm } from '@typescript/index-type';
import { TEventOnChange, TEventSubmitForm } from '@typescript/ui-types';

const InputTextEditor = React.lazy(() => import('@components/ui/input/input-text-editor'));

const FormEducation = () => {
    const { getListMasterEducationLevel, getListMasterEducationMajor, getListMasterEducationSchool } = useMasterAPI();
    const { upsertEducation } = useEducationApi();
    const [modalForm, setModalForm] = useState({
        moduleName: 'Education',
        isShow: false,
        action: TTypeActionModalForm.ADD,
        customeClass: { mdBody: '!overflow-y-visible md:min-w-[38rem]  space-y-4' },
    });
    const [form, setForm] = useState(deepCopy({ ...initialFormEducation }));
    const [options, setOptions] = useState<TOptionsFormEducation>({
        levels: [],
        majors: [],
        schools: [],
    });

    type TKeyFormEducation = keyof typeof form;
    type TExtractKeyEducation<TKey> = Extract<TKeyFormEducation, TKey>[];

    useEventEmitter(EVENT_EDUCATION.SET_MODAL_FORM_EDUCATION, (data) => {
        setModalForm({
            ...modalForm,
            ...data,
        });
    });

    useEventEmitter(EVENT_EDUCATION.SET_EDUCATION, (data) => {
        setForm({ ...mappingValuesToForm({ values: data, form }) });
    });

    useEffect(() => {
        handleInitialData();
    }, []);

    const handleInitialData = async () => {
        try {
            const updatedForm = form;
            const levels = generateOptions({
                options: (await getListMasterEducationLevel())?.data || [],
            });
            const majors = generateOptions({
                options: (await getListMasterEducationMajor())?.data || [],
                listSaveField: ['levels'],
                isFormatCapitalize: false,
            });
            const schools = generateOptions({
                options: (await getListMasterEducationSchool())?.data || [],
                listSaveField: ['levels'],
                isFormatCapitalize: false,
            });

            updatedForm['id_level'].options = [...levels];
            updatedForm['id_major'].options = [...majors];
            updatedForm['id_school'].options = [...schools];

            setOptions({
                levels: [...levels],
                majors: [...majors],
                schools: [...schools],
            });
            setForm({
                ...updatedForm,
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        }
    };

    const handleOnChange = (e: TEventOnChange) => {
        const name = e.target.name as TKeyFormEducation;
        const value = e.target.value;
        const currForm = form;
        currForm[name].value = value;

        if (name === 'id_level') {
            currForm['id_major'].disabled = !value;
            currForm['id_major'].options = options?.majors?.filter((option) => option?.levels?.some((level) => level?.id === value));

            const levelName = currForm['id_level'].options?.filter((option) => option?.value === value)?.[0]?.label;
            const isUniversity = !['High School', 'Middle School', 'Bootcamp']?.includes(levelName);

            currForm['gpa'].max = isUniversity ? 4.0 : 100.0;
            currForm['gpa'].value = 0.0;

            const keys = ['id_major', 'id_school'] as TExtractKeyEducation<'id_major' | 'id_school'>;
            keys?.map((key) => {
                currForm[key].value = '';
                currForm[key].disabled = key === 'id_major' ? !value : !value ? true : currForm[key].disabled;
            });
        }

        if (name === 'id_major') {
            currForm['id_school'].disabled = !value;
            currForm['id_school'].value = '';
            currForm['id_school'].options = options?.schools?.filter((option) => option?.levels?.some((level) => level?.id === currForm['id_level'].value));
        }

        if (name === 'start_at') {
            currForm['end_at'].disabled = !value;
        }

        if (name === 'gpa') {
            currForm[name].value = Number(value);
        }

        setForm({
            ...currForm,
        });
    };

    const handleCloseFormEducation = () => {
        initialFormEducation['id_level'].options = options?.levels;
        initialFormEducation['id_major'].options = options?.majors;
        initialFormEducation['id_school'].options = options?.schools;

        setForm(deepCopy({ ...initialFormEducation }));
        setModalForm({
            ...modalForm,
            isShow: false,
        });
    };

    const handleOnSubmit = async (e: TEventSubmitForm) => {
        e?.preventDefault();
        const { isValid, form: updatedForm } = mappingErrorsToForm<TEducationSchema, typeof form>({
            form: deepCopy({ ...form }),
            schema: educationSchema,
        });

        setForm({
            ...updatedForm,
        });
        if (!isValid) return;

        const extractForm = {
            ...extractValueFromForm(form),
        };
        const result = await upsertEducation({
            ...extractForm,
            gpa: Number(extractForm?.gpa),
            id: extractForm?.id || undefined,
        });
        if (!result?.status) return;
        handleCloseFormEducation();
        eventEmitter.emit(EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION_WITH_CURR_FILTER, true);
    };

    return (
        <ContainerModalForm {...modalForm} onClose={handleCloseFormEducation} onSubmit={handleOnSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
                <InputSelect {...form['id_level']} onChange={handleOnChange} />
                <InputSelect {...form['id_major']} onChange={handleOnChange} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
                <InputSelect {...form['id_school']} onChange={handleOnChange} />
                <InputNumber {...form['gpa']} value={String(form['gpa'].value)} onChange={handleOnChange} />
            </div>
            <div className="grid md:grid-cols-2 gap-4 overflow-visible">
                <InputDate {...form['start_at']} onChange={handleOnChange} />                
                <InputDate {...form['end_at']} minDate={form.start_at.value ?? undefined} onChange={handleOnChange} />
            </div>

            <InputTextEditor {...form['description']} onChange={handleOnChange} />
        </ContainerModalForm>
    );
};

export default FormEducation;
