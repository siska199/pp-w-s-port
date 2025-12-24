import { eventEmitter } from '@event-emitters';

import CardAction from '@components/ui/card/card-action';
import Header from '@components/ui/header/header';

import { contextFormPersonalInfo } from '@features/personal-information/context/context-form-personal-info';
import EVENT_PERSONAL_INFO from '@features/personal-information/event-emitters/personal-info-event';
import { TTypeActionModalForm } from '@typescript/index-type';
import { useCallback, useContext } from 'react';
import EmptyData from '@components/ui/empty-data';

const KeyMetrics = (): JSX.Element => {
    const { listKeyMetric } = useContext(contextFormPersonalInfo);

    const handleAdd = useCallback((): void => {
        eventEmitter.emit(EVENT_PERSONAL_INFO.SET_MODAL_FORM_KEY_METRIC, {
            isShow: true,
            action: TTypeActionModalForm.ADD,
        });
    }, []);

    return (
        <div className="space-y-10">
            <Header title="Key Metrics" onClickAddData={handleAdd} />

            {listKeyMetric.length === 0 ? (
                <EmptyData
                    customeClass={{
                        container: 'w-full !border-none',
                        img: 'h-[5rem]',
                    }}
                />
            ) : (
                <ul className="space-y-4 list-disc">
                    {listKeyMetric.map((item) => (
                        <CardKeyMetric {...item} />
                    ))}
                </ul>
            )}
        </div>
    );
};

interface TPropsCardKeyMetric {
    id: string;
    key: string;
    value: string;
}
const CardKeyMetric = (props: TPropsCardKeyMetric) => {
    const { setListKeyMetric } = useContext(contextFormPersonalInfo);

    const { id, key, value } = props;

    const handleEditData = (id: string) => {
        eventEmitter.emit(EVENT_PERSONAL_INFO.SET_MODAL_FORM_KEY_METRIC, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });

        eventEmitter.emit(EVENT_PERSONAL_INFO.SET_KEY_METRIC, {
            id,
            key,
            value,
        });
    };

    const handleDeleteData = (idData: string): void => {
        setListKeyMetric((prev) => {
            const index = prev.findIndex(({ id }) => id === idData);
            if (index < 0) return prev;
            return prev.filter((_, i) => i !== index);
        });
    };

    return (
        <CardAction onEditData={() => handleEditData(id)} onDeleteData={() => handleDeleteData(id)}>
            <li className="ml-4">
                {key} : {value}
            </li>
        </CardAction>
    );
};

export default KeyMetrics;
