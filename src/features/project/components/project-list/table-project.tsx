import { eventEmitter } from '@event-emitters';
import { useNavigate } from 'react-router-dom';

import Badge from '@components/ui/badge';
import Table from '@components/ui/table';
import EVENT_PROJECT from '@features/project/event-emitters/project-event';
import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event';

import { TProject, TTypeTypeProject } from '@features/project/types/project-type';
import useEventEmitter from '@hooks/use-event-emitter';
import useTable from '@hooks/use-table';
import { routes } from '@routes/constant';
import { useAppDispatch, useAppSelector } from '@store/store';
import { handleSetModalConfirmation } from '@store/ui-slice';
import { TResponseDataPaginationAPI, TTypeActionModalForm } from '@typescript/index-type';
import { TSettingTable } from '@typescript/ui-types';
import useProjectAPI from '@features/project/apis/use-project-api';

const TableProject = () => {
    const isLoading = useAppSelector((state) => state.ui.isLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { getListProject, deleteProject } = useProjectAPI();

    const configTable = useTable<TProject, false>({
        initialColumn: [
            {
                name: 'Title',
                key: 'title',
                className: ' md:min-w-[10rem]',
            },
            {
                name: 'Category',
                key: 'category',
                isSorted: true,
                className: ' md:min-w-[10rem]',
            },
            {
                name: 'Company',
                key: 'company_name',
                isSorted: true,
                className: ' md:min-w-[10rem]',
            },

            {
                name: 'Type',
                key: 'type',
                isSorted: true,
                className: ' md:min-w-[10rem]',
            },
            {
                name: 'Tech Stack',
                key: 'tech_stacks',
                className: ' min-w-[15rem]',
                customeComponent: (data: TProject) => {
                    return <div className="flex flex-col gap-2">{data?.tech_stacks.map((techStack, i) => <Badge key={i} variant={'soft-gray'} label={techStack} className="text-start px-4" />)}</div>;
                },
            },
        ],
        onFetchData: handleFetchData,
    });

    useEventEmitter(EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT, async (formFilter) => {
        await handleFetchData({
            ...configTable.setting,
            formFilter,
        });
    });

    useEventEmitter(EVENT_PROJECT.REFRESH_DATA_TABLE_PROJECT, async () => {
        await configTable.onChange({
            ...configTable.setting,
        });
    });

    async function handleFetchData(params: TSettingTable<TProject> & { keyword?: string; type?: TTypeTypeProject }): Promise<TResponseDataPaginationAPI<TProject>> {
        const results = await getListProject({
            sort_by: params.sortBy,
            sort_dir: params?.sortDir,
            items_perpage: params?.itemsPerPage,
            page_no: params?.currentPage,
            keyword: params?.keyword,
            type: params?.type,
        });
        return results.data as TResponseDataPaginationAPI<TProject>;
    }

    const handleEdiTProject = (data: TProject) => {
        eventEmitter.emit(EVENT_PROJECT.SET_FORM_PROJECT, {
            action: TTypeActionModalForm.EDIT,
            id: String(data?.id),
        });
        navigate(routes.project.child.detail.fullPath(String(data.id)));
    };

    const handleViewData = (data: TProject) => {
        navigate(routes.project.child.detail.fullPath(String(data?.id)));
    };

    const handleDeleteData = (data: TProject) => {
        dispatch(
            handleSetModalConfirmation({
                isShow: true,
                children: 'Are you sure want to delete this data?',
                button: {
                    confirm: {
                        onClick: async () => {
                            const id = data?.id;
                            await deleteProject(id);
                            dispatch(handleSetModalConfirmation({ isShow: false }));
                            eventEmitter.emit(EVENT_PROJECT.REFRESH_DATA_TABLE_PROJECT, true);
                        },
                    },
                },
            }),
        );
    };

    return (
        <div>
            <Table<TProject, false>
                {...configTable}
                withNo
                isLoading={isLoading}
                actionBtn={{
                    view: handleViewData,
                    edit: handleEdiTProject,
                    delete: handleDeleteData,
                }}
            />
        </div>
    );
};

export default TableProject;
