import { eventEmitter } from '@event-emitters';

import CardAction from '@components/ui/card/card-action';
import Header from '@components/ui/header/header';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';

import { contextFormProject } from '@features/project/context/form-project-context';
import useProjectResponsibility from '@features/project/hooks/use-project-responsibility';
import { TTypeActionModalForm } from '@typescript/index-type';
import { useContext, useEffect } from 'react';
import { useAppDispatch } from '@store/store';
import useProjectResponsibilityApi from '@features/project/apis/use-project-responsibility-api';
import { handleSetModalConfirmation } from '@store/ui-slice';
import appMessage from '@lib/data/app-message';

const ResponsibilityProjects = () => {
    const { listProjectResponsibility, getListProjectResponsibility } = useProjectResponsibility();
    const { formInformationProject } = useContext(contextFormProject);

    useEffect(() => {
        getListProjectResponsibility({
            id_project: formInformationProject.id.value,
        });
    }, []);

    const handleOnClickAddData = () => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.ADD,
        });
    };
    return (
        <div className="space-y-10">
            <Header title="Responsibility Project" onClickAddData={handleOnClickAddData} />
            <ul className="space-y-4 list-disc">{listProjectResponsibility?.map((responsibility, i) => <CardResponsibility key={i} {...responsibility} />)}</ul>
        </div>
    );
};

interface TPropsCardResponsibility {
    id: string;
    description: string;
}
const CardResponsibility = (props: TPropsCardResponsibility) => {
    const { id, description } = props;
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
            <li className="ml-4">{description}</li>
        </CardAction>
    );
};

export default ResponsibilityProjects;
