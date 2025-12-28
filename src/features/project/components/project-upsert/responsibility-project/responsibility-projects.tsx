import { useContext } from 'react';
import { eventEmitter } from '@event-emitters';

import useProjectResponsibilityApi from '@features/project/apis/use-project-responsibility-api';
import { contextFormProject } from '@features/project/context/form-project-context';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import CardAction from '@components/ui/card/card-action';
import EmptyData from '@components/ui/empty-data';
import Header from '@components/ui/header/header';

import useEventEmitter from '@hooks/use-event-emitter';
import { useAppDispatch } from '@store/store';
import { handleSetModalConfirmation } from '@store/ui-slice';
import appMessage from '@lib/data/app-message';
import { TTypeActionModalForm } from '@typescript/index-type';

const ResponsibilityProjects = () => {
    const { formInformationProject, listProjectResponsibility, getListProjectResponsibility } = useContext(contextFormProject);

    const handleOnClickAddData = () => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.ADD,
        });
    };

    useEventEmitter(EVENT_PROJECT.REFRESH_DATA_LIST_RESPONSIBILITY_PROJECT, async () => {
        await getListProjectResponsibility({
            id_project: formInformationProject.id.value,
        });
    });
    return (
        <div className="space-y-10">
            <Header title="Responsibility Project" onClickAddData={handleOnClickAddData} />
            {listProjectResponsibility?.length === 0 && (
                <EmptyData
                    customeClass={{
                        container: 'w-full !border-none',
                        img: 'h-[5rem]',
                    }}
                />
            )}
            <ul className="space-y-4 list-disc">
                {listProjectResponsibility?.map((responsibility, i) => (
                    <CardResponsibility key={i} {...responsibility} />
                ))}
            </ul>
        </div>
    );
};

interface TPropsCardResponsibility {
    id: string;
    description: string;
    id_project: string;
}
const CardResponsibility = (props: TPropsCardResponsibility) => {
    const { id, description, id_project } = props;
    const dispatch = useAppDispatch();
    const { deleteProjectResponsibility } = useProjectResponsibilityApi();

    const handleEditData = (id: string) => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });
        eventEmitter.emit(EVENT_PROJECT.SET_RESPONSIBILITY_PROJECT, {
            id,
            description,
            id_project,
        });
    };

    const handleDeleteData = (id: string) => {
        dispatch(
            handleSetModalConfirmation({
                isShow: true,
                children: appMessage.warning.deleteData,
                button: {
                    confirm: {
                        onClick: async () => {
                            await deleteProjectResponsibility(id);
                            dispatch(handleSetModalConfirmation({ isShow: false }));
                            eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_LIST_RESPONSIBILITY_PROJECT, true);
                        },
                    },
                },
            }),
        );
    };
    return (
        <CardAction onEditData={() => handleEditData(id)} onDeleteData={() => handleDeleteData(id)}>
            <li className="ml-4" dangerouslySetInnerHTML={{ __html: description ?? '' }}></li>
        </CardAction>
    );
};

export default ResponsibilityProjects;
