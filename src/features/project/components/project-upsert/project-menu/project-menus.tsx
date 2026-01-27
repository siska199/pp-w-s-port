import React, { useContext, useMemo } from 'react';
import { eventEmitter } from '@event-emitters';

import useProjectMenuApi from '@features/project/apis/use-project-menu-api';
import { contextFormProject } from '@features/project/context/form-project-context';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import { TProjectMenuItem } from '@features/project/types/project-type';
import Badge from '@components/ui/badge';
import EmptyData from '@components/ui/empty-data';
import Header from '@components/ui/header/header';
import Image from '@components/ui/image';
import { TFileValue } from '@components/ui/input/input-file/input-file-v1';

import useEventEmitter from '@hooks/use-event-emitter';
import useFile from '@hooks/use-file';
import { useAppDispatch } from '@store/store';
import { handleSetIsloading, handleSetModal, handleSetModalConfirmation } from '@store/ui-slice';
import appMessage from '@lib/data/app-message';
import { TKeyVariantBadge } from '@lib/helper/variant/variant-badge';
import { TTypeActionModalForm } from '@typescript/index-type';
import { IconDelete, IconEdit } from '@assets/icons';
import SliderRelatedImageMenu from '@features/project/components/project-detail/menu-section/slider-related-image-menu';

const ProjectMenus = React.memo(() => {
    const { formInformationProject, listProjectMenu, getListProjectMenu } = useContext(contextFormProject);

    const handleOnClickAddData = () => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.ADD,
        });
    };

    useEventEmitter(EVENT_PROJECT.REFRESH_DATA_LIST_MENU_PROJECT, async () => {
        await getListProjectMenu({
            id_project: formInformationProject.id.value,
        });
    });

    return (
        <div className="space-y-10">
            <Header title="Menu Project" onClickAddData={handleOnClickAddData} />
            <div className=" space-y-4">
                {listProjectMenu?.length === 0 && (
                    <EmptyData
                        customeClass={{
                            container: 'w-full !border-none',
                            img: 'h-[5rem]',
                        }}
                    />
                )}
                {listProjectMenu?.map((projectMenu) => (
                    <CardProjectMenu key={projectMenu.id} {...projectMenu} />
                ))}
            </div>
        </div>
    );
});

const CardProjectMenu = React.memo((props: TProjectMenuItem) => {
    const { name, id, description, main_image, features, related_images } = props;
    const { handleGetFileFromUrl } = useFile();
    const dispatch = useAppDispatch();
    const { deleteProjectMenu } = useProjectMenuApi();

    const handleEditProject = async (id: string) => {
        dispatch(handleSetIsloading(true));

        const dMainImage = await handleGetFileFromUrl({
            url: main_image as unknown as string,
            filename: 'main_image',
        });
        const dRelatedImages = await Promise.all(
            related_images?.map(async (rm, i) => {
                const result = await handleGetFileFromUrl({
                    url: rm.image,
                    filename: `related_image_${i + 1}`,
                });
                return result;
            }),
        );
        dispatch(handleSetIsloading(false));
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });
        eventEmitter.emit(EVENT_PROJECT.SET_MENU_PROJECT, {
            id,
            name,
            main_image: dMainImage,
            description,
            features,
            related_images: dRelatedImages as [TFileValue, ...TFileValue[]],
        });
    };

    const handleDeleteProject = (id: string) => {
        dispatch(
            handleSetModalConfirmation({
                isShow: true,
                children: appMessage.warning.deleteData,
                button: {
                    confirm: {
                        onClick: async () => {
                            await deleteProjectMenu(id);
                            dispatch(handleSetModalConfirmation({ isShow: false }));
                            eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_LIST_MENU_PROJECT, true);
                        },
                    },
                },
            }),
        );
    };

    const listBtnAction = useMemo(
        () => [
            {
                name: 'edit',
                variant: 'softborder-warning' as TKeyVariantBadge,
                label: <IconEdit className="icon-warning" />,
                onClick: () => handleEditProject(id),
                isShow: true,
            },
            {
                name: 'delete',
                variant: 'softborder-error' as TKeyVariantBadge,
                label: <IconDelete className="icon-error" />,
                onClick: () => handleDeleteProject(id),
                isShow: true,
            },
        ],
        [id, handleDeleteProject, handleEditProject],
    );

    const handleShowRelatedImages = () => {
        dispatch(
            handleSetModal({
                isShow: true,
                children: <SliderRelatedImageMenu listImage={related_images?.map((image) => image?.image)} activeIndex={1} />,
                customeClass: {
                    mdBody: 'scrollbar-hidden',
                    mdContent: 'bg-white/0  h-[90vh]',
                    btnClose: {
                        icon: '!w-[2rem] !h-[2rem] icon-white',
                    },
                },
            }),
        );
    };

    return (
        <div className="border rounded-md p-4 w-full relative space-y-1 ">
            <div className="absolute right-4 flex gap-1">
                {listBtnAction?.map((btn, i) => (
                    <Badge key={i} {...btn} shape={'pilled'} className={'!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'} />
                ))}
            </div>
            <h4 className="text-body-large text-normal">{name}</h4>
            {main_image && <Image src={(main_image as unknown as string) ?? ''} className="w-[5rem] aspect-video" />}
            <p className="line-clamp-2 ">{description}</p>
            <div>
                <h5 className="text-body-base font-medium">Features : </h5>
                <div className="container-list-disc-style " dangerouslySetInnerHTML={{ __html: features ?? '' }}></div>
            </div>
            <div>
                <h5 className="text-body-base font-medium">Related Images : </h5>
                <div onClick={handleShowRelatedImages} className="text-gray cursor-pointer ">
                    {related_images?.length || 0} Item
                </div>
            </div>
        </div>
    );
});
export default ProjectMenus;
