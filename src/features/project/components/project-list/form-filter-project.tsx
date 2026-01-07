import { eventEmitter } from '@event-emitters';
import { useEffect, useState } from 'react';

import useMasterAPI from '@apis/use-master-api';
import InputBase from '@components/ui/input/input-base';
import InputSelect from '@components/ui/input/input-select/input-select';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import { TTypeCategoryProject } from '@features/project/types/project-type';

import { IconSearch } from '@assets/icons';
import { debounce, deepCopy, generateOptions, generateOptionsFromEnum } from '@lib/helper/function';
import { TEventOnChange, TOption } from '@typescript/ui-types';

const FormFilterProject = () => {
    const [form, setForm] = useState(deepCopy({ ...initialFormFilter }));
    const { getListMasterSkill } = useMasterAPI();

    useEffect(() => {
        handleInitData();
    }, []);

    const handleInitData = async () => {
        try {
            const currForm = form;
            currForm['id_skills'].options = await generateOptions({
                options: (await getListMasterSkill())?.data || [],
            });
            currForm['categories'].options = generateOptionsFromEnum(TTypeCategoryProject);
            currForm['types'].options = generateOptionsFromEnum(TTypeCategoryProject);

            setForm({
                ...currForm,
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        }
    };

    const handleOnChange = (e: TEventOnChange) => {
        const currForm = form;
        const value = e.target.value;
        const name = e.target.name as keyof typeof form;
        currForm[name].value = value;
        setForm({ ...currForm });
        handleEmitEventSearchDataTable();
    };

    const handleEmitEventSearchDataTable = debounce(() => {
        eventEmitter.emit(EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT, {
            id_skills: form.id_skills.value,
            keyword: form?.keyword?.value,
            categories: form?.categories?.value,
            types: form?.types?.value,
        });
    }, 1500);
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputBase
                customeElement={{
                    start: <IconSearch className="icon-gray icon-gray-fill" />,
                }}
                {...form['keyword']}
                onChange={handleOnChange}
                customeClass={{
                    ciV4: 'md:col-span-2',
                }}
            />
            <InputSelect onChange={handleOnChange} {...form['categories']} isMultiple />
            <InputSelect onChange={handleOnChange} {...form['types']} isMultiple />
            <InputSelect onChange={handleOnChange} {...form['id_skills']} isMultiple />
        </div>
    );
};

const initialFormFilter = {
    keyword: {
        name: 'keyword',
        value: '',
        placeholder: 'Search by project or company name...',
    },
    categories: {
        name: 'categories',
        placeholder: 'Categories',
        value: [],
        options: [] as TOption[],
        isMultiple: true,
    },
    types: {
        name: 'types',
        placeholder: 'Types',
        value: [],
        options: [] as TOption[],
        isMultiple: true,
    },
    id_skills: {
        name: 'id_skills',
        placeholder: 'Skil',
        value: [],
        options: [],
        isMultiple: true,
    },
};

export type TFormFilterProject = {
    keyword: string;
    categories: string[];
    types: string[];
    id_skills: string[];
};

export default FormFilterProject;
