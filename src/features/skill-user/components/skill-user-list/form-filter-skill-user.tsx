import { useCallback, useEffect, useState } from 'react';
import { eventEmitter } from '@event-emitters';

import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event';
import { TTypeLevelSkill } from '@features/skill-user/types/skill-user-type';
import InputBase from '@components/ui/input/input-base';
import InputSelect from '@components/ui/input/input-select/input-select';
import useMasterAPI from '@apis/use-master-api';

import useEventEmitter from '@hooks/use-event-emitter';
import { debounce, deepCopy, generateOptions, generateOptionsFromEnum } from '@lib/helper/function';
import { TCustomeEventOnChange, TOption } from '@typescript/ui-types';
import { IconSearch } from '@assets/icons';

export interface TOptionsFormFilterSkillUser {
    categories: TOption[];
}

const FormFilterSkillUser = () => {
    const [form, setForm] = useState(deepCopy({ ...initialFormFilter }));
    const { getListMasterCategorySkill } = useMasterAPI();

    useEffect(() => {
        handleInitData();
    }, []);

    const handleInitData = async () => {
        try {
            const updateForm = form;
            const categories = generateOptions({
                options: (await getListMasterCategorySkill())?.data || [],
            });

            updateForm['id_category'].options = categories;
            setForm({
                ...updateForm,
            });
        } catch (error: any) {
            console.log('error: ', error?.message);
        }
    };

    const handleOnChange = useCallback((e: TCustomeEventOnChange<any>) => {
        const currForm = form;
        const value = e.target.value;
        const name = e.target.name as keyof typeof form;
        currForm[name].value = value;
        currForm[name].errorMessage = '';
        setForm({ ...currForm });
        handleEmitEventSearchDataTable();
    }, []);

    const handleEmitEventSearchDataTable = debounce(() => {
        eventEmitter.emit(EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER, {
            years_of_experiance: form.years_of_experiance.value,
            level: form.level.value,
            id_category: form.id_category.value,
            keyword: form?.keyword?.value,
        });
    }, 1500);

    useEventEmitter(EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER_WITH_CURR_FILTER, async () => {
        handleEmitEventSearchDataTable();
    });

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <InputSelect
                    onChange={handleOnChange}
                    customeClass={{
                        ciV4: 'md:col-span-2',
                    }}
                    {...form['id_category']}
                />
                <InputSelect onChange={handleOnChange} {...form['level']} />
                <InputSelect onChange={handleOnChange} {...form['years_of_experiance']} />
            </div>
        </>
    );
};

const initialFormFilter = {
    keyword: {
        name: 'keyword',
        value: '',
        placeholder: 'Search by category or skill name...',
        customeClass: {},
        errorMessage: '',
    },
    id_category: {
        name: 'id_category',
        options: [],
        placeholder: 'Category Skill',
        value: '',
        errorMessage: '',
    },
    years_of_experiance: {
        name: 'years_of_experiance',
        options: [...Array(40)]?.map((_, i) => ({
            label: `${i + 1} year`,
            value: `${i + 1}`,
        })),
        value: '',
        placeholder: 'Year of experiance',
        errorMessage: '',
    },
    level: {
        name: 'level',
        value: '',
        options: generateOptionsFromEnum(TTypeLevelSkill),
        placeholder: 'Level',
        errorMessage: '',
    },
};

export type TFilterSkillUser = {
    [K in keyof typeof initialFormFilter]: (typeof initialFormFilter)[K]['value'];
};

export default FormFilterSkillUser;
