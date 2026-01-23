import { useNavigate } from 'react-router-dom';
import { eventEmitter } from '@event-emitters';

import useExperianceAPI from '@features/experiance/apis/use-experiance-api';
import EVENT_EXPERIANCE from '@features/experiance/event-emitters/experiance-event';
import { TExperiance } from '@features/experiance/types/experiance-type';
import Badge from '@components/ui/badge';
import Table from '@components/ui/table';

import useEventEmitter from '@hooks/use-event-emitter';
import useTable from '@hooks/use-table';
import { useAppDispatch, useAppSelector } from '@store/store';
import { handleSetModalConfirmation } from '@store/ui-slice';
import appMessage from '@lib/data/app-message';
import { formatDate, toLocalDateInputValue } from '@lib/helper/function';
import { routes } from '@routes/constant';
import { TResponseDataPaginationAPI, TTypeActionModalForm } from '@typescript/index-type';
import { TSettingTable } from '@typescript/ui-types';

const TableExperiance = () => {
    const isLoading = useAppSelector((state) => state?.ui?.isLoading);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { getListExperiance, deleteExperiance } = useExperianceAPI();

    const configTable = useTable<TExperiance, false>({
        initialColumn: [
            {
                name: 'Company',
                key: 'company_name',
                isSorted: true,
                className: ' md:min-w-0',
            },
            {
                name: 'Profession',
                key: 'profession_name',
                isSorted: true,
            },
            {
                name: 'Start At',
                key: 'start_at',
                isSorted: true,
                className: 'min-w-[8rem]',
                customeComponent: (data: TExperiance) => {
                    return <div>{formatDate({ date: toLocalDateInputValue(data.start_at) })}</div>;
                },
            },
            {
                name: 'End At',
                key: 'end_at',
                className: 'min-w-[8rem]',
                isSorted: true,
                customeComponent: (data: TExperiance) => {
                    return <div>{formatDate({ date: toLocalDateInputValue(data.end_at) }) || '-'}</div>;
                },
            },
            {
                name: 'Related Project',
                key: 'projects',
                className: ' min-w-[15rem] flex items-center  justify-center',
                customeComponent: (data: TExperiance) => {
                    return (
                        <>
                            {data?.projects?.length == 0 && <div className="flex flex-col gap-2 flex-grow items-center">-</div>}
                            <ul className="list-disc ml-5">
                                {data?.projects?.map((project, i) => (
                                    <li key={i}>{project?.name}</li>
                                ))}
                            </ul>
                        </>
                    );
                },
            },
            {
                name: 'Tech Stack',
                key: 'tech_stacks',
                className: ' min-w-[15rem] flex justify-center',
                customeComponent: (data: TExperiance) => {
                    return (
                        <div className="gap-2 flex flex-wrap justify-center items-center ">
                            {(!data?.tech_stacks || data?.tech_stacks?.length == 0) && <div>-</div>}
                            {data?.tech_stacks.map((stack, i) => (
                                <div key={i}>
                                    <Badge key={i} variant={stack.color} label={stack.name} className=" px-4 text-start" />
                                </div>
                            ))}
                        </div>
                    );
                },
            },
        ],
        initialSetting: {
            pagination: true,
            totalPage: 10,
        },
        onFetchData: handleFetchData,
    });

    useEventEmitter(EVENT_EXPERIANCE.SEARCH_DATA_TABLE_EXPERIANCE, async (formFilter) => {
        await handleFetchData({
            ...configTable.setting,
            formFilter,
        });
    });
    useEventEmitter(EVENT_EXPERIANCE.REFRESH_DATA_TABLE_EXPERIANCE, async () => {
        await configTable.onChange({
            ...configTable.setting,
        });
    });

    async function handleFetchData(
        params: TSettingTable<TExperiance> & {
            keyword?: string;
            start_at?: string;
            end_at?: string;
        },
    ): Promise<TResponseDataPaginationAPI<TExperiance>> {
        const results = await getListExperiance({
            sort_by: params.sortBy,
            sort_dir: params?.sortDir,
            items_perpage: params?.itemsPerPage,
            page_no: params?.currentPage,
            keyword: params?.keyword,
            start_at: params?.start_at,
            end_at: params?.end_at,
        });
        return results?.data as TResponseDataPaginationAPI<TExperiance>;
    }

    const handleEdiTExperiance = (data: TExperiance) => {
        eventEmitter.emit(EVENT_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });
        eventEmitter.emit(EVENT_EXPERIANCE.SET_EXPERIANCE, {
            id: data?.id,
            id_company: data.id_company,
            id_profession: data.id_profession,
            start_at: data.start_at,
            end_at: data.end_at,
            description: data?.description,
            is_currently_work_here: data?.is_currently_work_here ? 'true' : 'false',
        });
    };

    const handleViewData = (data: TExperiance) => {
        navigate(routes.experiance.child.detail.fullPath(String(data?.id)));
    };

    const handleDeleteData = (data: TExperiance) => {
        dispatch(
            handleSetModalConfirmation({
                isShow: true,
                children: appMessage.warning.deleteData,
                button: {
                    confirm: {
                        onClick: async () => {
                            const id = data?.id;
                            await deleteExperiance(id);
                            dispatch(handleSetModalConfirmation({ isShow: false }));
                            eventEmitter.emit(EVENT_EXPERIANCE.REFRESH_DATA_TABLE_EXPERIANCE, true);
                        },
                    },
                },
            }),
        );
    };

    return (
        <div>
            <Table<TExperiance, false>
                {...configTable}
                withNo
                isLoading={isLoading}
                actionBtn={{
                    view: handleViewData,
                    edit: handleEdiTExperiance,
                    delete: handleDeleteData,
                }}
            />
        </div>
    );
};

export default TableExperiance;
