import { eventEmitter } from '@event-emitters';
import { useContext } from 'react';

import CardAction from '@components/ui/card/card-action';
import EmptyData from '@components/ui/empty-data';
import Header from '@components/ui/header/header';
import { contextFormProject } from '@features/project/context/form-project-context';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';

import useProjectLinkApi from '@features/project/apis/use-project-link-api';
import { TProjectLinkItem } from '@features/project/types/project-type';
import useEventEmitter from '@hooks/use-event-emitter';
import appMessage from '@lib/data/app-message';
import { useAppDispatch } from '@store/store';
import { handleSetModalConfirmation } from '@store/ui-slice';
import { TTypeActionModalForm } from '@typescript/index-type';

const LinkProjects = () => {
    const { formInformationProject, listProjectLink, getListProjectLink } = useContext(contextFormProject);

    const handleOnClickAddData = () => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_LINK_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.ADD,
        });
    };

    useEventEmitter(EVENT_PROJECT.REFRESH_DATA_LIST_LINK_PROJECT, async () => {
        await getListProjectLink({
            id_project: formInformationProject.id.value,
        });
    });
    return (
        <div className="space-y-10">
            <Header title="LINK Project" onClickAddData={handleOnClickAddData} />
            {listProjectLink?.length === 0 && (
                <EmptyData
                    customeClass={{
                        container: 'w-full !border-none',
                        img: 'h-[5rem]',
                    }}
                />
            )}
            <ul className="space-y-4 list-disc">
                {listProjectLink?.map((link, i) => (
                    <CardLink key={i} {...link} />
                ))}
            </ul>
        </div>
    );
};

type TPropsCardLink = TProjectLinkItem;
const CardLink = (props: TPropsCardLink) => {
    const { id, label, url, id_project } = props;
    const dispatch = useAppDispatch();
    const { deleteProjectLink } = useProjectLinkApi();

    const handleEditData = (id: string) => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_LINK_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });
        eventEmitter.emit(EVENT_PROJECT.SET_LINK_PROJECT, {
            id,
            url,
            label,
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
                            await deleteProjectLink(id);
                            dispatch(handleSetModalConfirmation({ isShow: false }));
                            eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_LIST_LINK_PROJECT, true);
                        },
                    },
                },
            }),
        );
    };
    return (
        <CardAction onEditData={() => handleEditData(id)} onDeleteData={() => handleDeleteData(id)}>
            <li className="ml-4">
                {label} : {url}
            </li>
        </CardAction>
    );
};

export default LinkProjects;
