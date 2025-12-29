import { useState } from 'react';
import { eventEmitter } from '@event-emitters';

import EVENT_EXPERIANCE from '@features/experiance/event-emitters/experiance-event';
import InputBase from '@components/ui/input/input-base';
import InputDate, { TValueDate } from '@components/ui/input/input-date';

import { debounce, deepCopy, generateMaxDateOneYear } from '@lib/helper/function';
import { TEventOnChange } from '@typescript/ui-types';
import { IconSearch } from '@assets/icons';

const FormFilterExperiance = () => {
    const [form, setForm] = useState(deepCopy({ ...initialFormFilter }));

    const handleOnChange = (e: TEventOnChange) => {
        const currForm = form;
        const value = e.target.value;
        const name = e.target.name as keyof typeof form;
        currForm[name].value = value;

        if (name === 'start_at') {
            currForm['end_at'].value = null;
        }
        setForm({ ...currForm });
        handleEmitEventSearchDataTable();
    };

    const handleEmitEventSearchDataTable = debounce(() => {
        eventEmitter.emit(EVENT_EXPERIANCE.SEARCH_DATA_TABLE_EXPERIANCE, {
            keyword: form?.keyword?.value,
            start_at: form?.start_at?.value,
            end_at: form?.end_at?.value,
        });
    }, 1500);

    return (
        <div className="grid md:grid-cols-4 gap-4">
            <InputBase
                customeElement={{
                    start: <IconSearch className="icon-gray icon-gray-fill" />,
                }}
                {...form['keyword']}
                customeClass={{
                    ciV4: 'md:col-span-2',
                }}
                onChange={handleOnChange}
            />
            <InputDate {...form['start_at']} onChange={handleOnChange} />
            <InputDate {...form['end_at']} minDate={form['start_at'].value} maxDate={generateMaxDateOneYear(form['start_at'].value)} onChange={handleOnChange} />
        </div>
    );
};

const initialFormFilter = {
    keyword: {
        name: 'keyword',
        value: '',
        placeholder: 'Search by company or profession name...',
        customeClass: {},
    },
    start_at: {
        name: 'start_at',
        value: null as Date | null,
        placeholder: 'Start At',
    },
    end_at: {
        name: 'end_at',
        value: null as Date | null,
        placeholder: 'End At',
    },
};

export type TFilterExperiance = {
    keyword: string;
    start_at: TValueDate;
    end_at: TValueDate;
};

export default FormFilterExperiance;
