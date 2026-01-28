import { useEffect, useRef, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import { TTypeCategoryProject, TTypeTypeProject } from '@features/project/types/project-type';
import InputBase from '@components/ui/input/input-base';
import InputSelect from '@components/ui/input/input-select/input-select';
import useMasterAPI from '@apis/use-master-api';

import { debounce, deepCopy, generateOptions, generateOptionsFromEnum } from '@lib/helper/function';
import { TEventOnChange, TOption } from '@typescript/ui-types';
import { IconSearch } from '@assets/icons';

const FormFilterProject = () => {
    const [form, setForm] = useState(deepCopy({ ...initialFormFilter }));
    const { getListMasterSkill } = useMasterAPI();

    useEffect(() => {
        handleInitData();
        return () => {
            emitSearchRef.current.cancel();
        };
    }, []);

    const handleInitData = async () => {
        try {
            const currForm = form;
            currForm['id_skills'].options = await generateOptions({
                options: (await getListMasterSkill())?.data || [],
            });
            currForm['categories'].options = generateOptionsFromEnum(TTypeCategoryProject);
            currForm['types'].options = generateOptionsFromEnum(TTypeTypeProject);

            setForm({
                ...currForm,
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        }
    };

    const handleOnChange = (e: TEventOnChange) => {
        const { name, value } = e.target;

        setForm((prev) => {
            const next = {
                ...prev,
                [name]: {
                    ...prev[name as keyof typeof prev],
                    value,
                },
            };
            emitSearchRef.current({
                id_skills: next.id_skills.value,
                keyword: next.keyword.value,
                categories: next.categories.value,
                types: next.types.value,
            });

            return next;
        });
    };

    // const handleEmitEventSearchDataTable = debounce(() => {
    //     eventEmitter.emit(EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT, {
    //         keyword: form?.keyword?.value,
    //         id_skills: form.id_skills.value,
    //         categories: form?.categories?.value,
    //         types: form?.types?.value,
    //     });
    // }, 1500);

    const emitSearchRef = useRef(
        debounce((payload) => {
            eventEmitter.emit(EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT, payload);
        }, 1500),
    );

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
    types: TTypeTypeProject[];
    id_skills: string[];
};

export default FormFilterProject;
