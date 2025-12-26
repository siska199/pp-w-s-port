import { eventEmitter } from '@event-emitters';
import React, { useContext, useEffect, useMemo } from 'react';

import Badge from '@components/ui/badge';
import Header from '@components/ui/header/header';
import Image from '@components/ui/image';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import useProjectMenu from '@features/project/hooks/use-project-menu';
import useEventEmitter from '@hooks/use-event-emitter';

import { IconDelete, IconEdit } from '@assets/icons';
import EmptyData from '@components/ui/empty-data';
import { TFileValue } from '@components/ui/input/input-file/input-file-v1';
import { contextFormProject } from '@features/project/context/form-project-context';
import { TProjectMenuParams } from '@features/project/types/project-type';
import useFile from '@hooks/use-file';
import { TKeyVariantBadge } from '@lib/helper/variant/variant-badge';
import { TTypeActionModalForm } from '@typescript/index-type';

const ProjectMenus = React.memo(() => {
    const { listProjectMenu, getListProjectMenu } = useProjectMenu();
    const { formInformationProject } = useContext(contextFormProject);

    const handleOnClickAddData = () => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.ADD,
        });
    };

    useEffect(() => {
        getListProjectMenu({
            id_project: formInformationProject.id.value,
        });
    }, []);

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
                {listProjectMenu?.map((projectMenu) => <CardProjectMenu key={projectMenu.id} {...projectMenu} />)}
            </div>
        </div>
    );
});

const CardProjectMenu = React.memo((props: TProjectMenuParams) => {
    const { name, id, description, main_image, features, related_images } = props;
    const { handleGetFileFromUrl } = useFile();
    const handleEditProject = async (id: string) => {
        eventEmitter.emit(EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });
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
        console.log('id:', id);
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

    return (
        <div className="border rounded-md p-4 w-full relative space-y-1 ">
            <div className="absolute right-4 flex gap-1">
                {listBtnAction?.map((btn, i) => <Badge key={i} {...btn} shape={'pilled'} className={'!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'} />)}
            </div>
            <h4 className="text-body-large text-normal">{name}</h4>
            {main_image && <Image src={(main_image as unknown as string) ?? ''} className="w-[5rem] aspect-video" />}
            <p className="line-clamp-2 ">{description}</p>
            <div>
                <h5 className="text-body-base font-medium">Features : </h5>
                <div className="container-list-disc-style " dangerouslySetInnerHTML={{ __html: features ?? '' }}></div>
            </div>
        </div>
    );
});
export default ProjectMenus;
