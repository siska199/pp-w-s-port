import { eventEmitter } from '@event-emitters';

import useSkillUserAPI from '@features/skill-user/apis/use-skill-user-api';
import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event';
import { TSkillUser, TTypeLevelSkill } from '@features/skill-user/types/skill-user-type';
import Badge from '@components/ui/badge';
import Table from '@components/ui/table';

import useEventEmitter from '@hooks/use-event-emitter';
import useTable from '@hooks/use-table';
import { useAppDispatch, useAppSelector } from '@store/store';
import { handleSetModalConfirmation } from '@store/ui-slice';
import variantBadge from '@lib/helper/variant/variant-badge';
import { TResponseDataPaginationAPI, TTypeActionModalForm } from '@typescript/index-type';
import { TSettingTable } from '@typescript/ui-types';

const TableSkillUser = () => {
    const isLoading = useAppSelector((state) => state.ui.isLoading);
    const dispatch = useAppDispatch();

    const { getListSkillUser, deleteSkillUser } = useSkillUserAPI();

    const configTable = useTable<TSkillUser, false>({
        initialColumn: [
            {
                name: 'Categgory',
                key: 'category_name',
                isSorted: true,
                className: ' md:min-w-0',
            },
            {
                name: 'Name',
                key: 'skill_name',
                isSorted: true,
            },
            {
                name: 'Year of Experiance',
                key: 'years_of_experiance',
                isSorted: true,
                className: ' flex items-center  justify-center md:min-w-[10rem]',
            },
            {
                name: 'Level',
                key: 'level',
                isSorted: true,
                className: ' flex items-center  justify-center  md:min-w-[10rem]',
                customeComponent: (data: TSkillUser) => {
                    const level = data?.level;
                    let variant = 'soft-primary' as keyof typeof variantBadge;
                    switch (level) {
                        case TTypeLevelSkill.BEGINNER:
                            variant = 'soft-warning';
                            break;
                        case TTypeLevelSkill.INTERMEDIATE:
                            variant = 'soft-sucess';
                            break;
                        case TTypeLevelSkill.ADVANCE:
                            variant = 'soft-blue';
                            break;
                    }
                    return <Badge variant={variant} label={level} />;
                },
            },
            {
                name: 'Related Project',
                key: 'project_tech_stacks',
                className: ' flex items-center  justify-center md:min-w-[15rem]',
                customeComponent: (data: TSkillUser) => {
                    return (
                        <div className="flex flex-col gap-2 flex-grow items-center">
                            {(!data?.project_tech_stacks || data?.project_tech_stacks?.length == 0) && <div>-</div>}
                            <ul className="list-disc ml-5">
                                {data?.project_tech_stacks?.map((project, i) => (
                                    <li key={i}>{project?.name}</li>
                                ))}
                            </ul>
                        </div>
                    );
                },
            },
        ],
        onFetchData: handleFetchData,
    });
    useEventEmitter(EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER, async (formFilter) => {
        await configTable.onChange({
            ...configTable.setting,
            ...formFilter,
        });
    });
    useEventEmitter(EVENT_SKILL_USER.REFRESH_DATA_TABLE_SKILL_USER, async () => {
        configTable.onChange({
            ...configTable.setting,
        });
    });

    async function handleFetchData(
        params: TSettingTable<TSkillUser> & {
            keyword?: string;
            level?: TTypeLevelSkill;
            years_of_experiance?: string;
            id_category?: string;
        },
    ): Promise<TResponseDataPaginationAPI<TSkillUser>> {
        const result = await getListSkillUser({
            sort_by: params.sortBy,
            sort_dir: params?.sortDir,
            items_perpage: params?.itemsPerPage,
            page_no: params?.currentPage,
            keyword: params?.keyword,
            level: params?.level,
            years_of_experiance: params?.years_of_experiance,
            id_category: params?.id_category,
        });
        return result?.data as TResponseDataPaginationAPI<TSkillUser>;
    }

    const handleEditData = (data: TSkillUser) => {
        eventEmitter.emit(EVENT_SKILL_USER.SET_MODAL_FORM_SKILL_USER, {
            isShow: true,
            action: TTypeActionModalForm.EDIT,
        });
        eventEmitter.emit(EVENT_SKILL_USER.SET_SKILL_USER, {
            id: data?.id,
            id_category: data?.id_category,
            id_skill: data?.id_skill,
            level: data?.level,
            years_of_experiance: data?.years_of_experiance,
        });
    };

    const handleDeleteData = (data: TSkillUser) => {
        dispatch(
            handleSetModalConfirmation({
                isShow: true,
                children: 'Are you sure want to delete this data?',
                button: {
                    confirm: {
                        onClick: async () => {
                            const id = data?.id;
                            await deleteSkillUser(id);
                            dispatch(handleSetModalConfirmation({ isShow: false }));
                            eventEmitter.emit(EVENT_SKILL_USER.REFRESH_DATA_TABLE_SKILL_USER, true);
                        },
                    },
                },
            }),
        );
    };

    return (
        <div>
            <Table<TSkillUser, false>
                {...configTable}
                withNo
                isLoading={isLoading}
                actionBtn={{
                    edit: handleEditData,
                    delete: handleDeleteData,
                }}
            />
        </div>
    );
};

export default TableSkillUser;
