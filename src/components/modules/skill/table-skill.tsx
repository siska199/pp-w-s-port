import Badge from '@components/ui/badge';
import Table from '@components/ui/table';
import {
  ACTION_TYPE_SKILL,
  skillContext,
  TTypeActionModalFormSkill,
} from '@context/modules/skill/skill-context';
import useTable from '@hooks/useTable';
import { skills } from '@lib/data/dummy';
import { delay } from '@lib/helper';
import variantBadge from '@lib/variant/variant-badge';
import { handleSetModalConfirmation } from '@store/features/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { useContext } from 'react';
import { TSettingTable } from 'types/ui-types';

type TData = (typeof skills)[0];

const TableSkill = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const { dispatch } = useContext(skillContext);
  const dispatchR = useAppDispatch();

  const configTable = useTable<TData, false>({
    initialColumn: [
      {
        name: 'Categgory',
        key: 'category',
        isSorted: true,
        className: ' md:min-w-0',
      },
      {
        name: 'Name',
        key: 'name',
        isSorted: true,
      },
      {
        name: 'Year of Experiance',
        key: 'years_of_experience',
        isSorted: true,
        className: ' flex items-center  justify-center md:min-w-[10rem]',
      },
      {
        name: 'Level',
        key: 'level',
        isSorted: true,
        className: '   md:min-w-[10rem]',
        customeComponent: (data) => {
          const level = data.level;
          let variant = 'soft-primary' as keyof typeof variantBadge;
          switch (level) {
            case 'Beginner':
              variant = 'soft-warning';
              break;
            case 'Intermediate':
              variant = 'soft-sucess';
              break;
            case 'Advanced':
              variant = 'soft-blue';
              break;
          }
          return <Badge variant={variant} label={level} />;
        },
      },
      {
        name: 'Related Project',
        key: 'projects',
        className: ' min-w-[15rem]',
        customeComponent: (data) => {
          return (
            <div className="flex flex-col gap-2">
              {data?.projects.map((project, i) => (
                <Badge
                  key={i}
                  variant={'soft-gray'}
                  label={project}
                  className="text-start px-4"
                />
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

  async function handleFetchData(
    params: TSettingTable<TData>
  ): Promise<TData[]> {
    delay(1500);
    return skills as TData[];
  }

  const handleEditData = (data: TData) => {
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: true,
        action: TTypeActionModalFormSkill.EDIT,
      },
    });
    dispatch({
      type: ACTION_TYPE_SKILL.SET_SKILL,
      payload: {
        category: '',
        skill: '',
        level: '',
        yearOfExperiance: '',
      },
    });
  };

  const handleViewData = (data: TData) => {};

  const handleDeleteData = (data: TData) => {
    dispatchR(
      handleSetModalConfirmation({
        isShow: true,
        // title: 'Modal Confirmation',
        children: <>Are you sure want to delete this data?</>,
      })
    );
  };

  return (
    <div>
      <Table<TData, false>
        {...configTable}
        withNo
        isLoading={isLoading}
        actionBtn={{
          view: handleViewData,
          edit: handleEditData,
          delete: handleDeleteData,
        }}
      />
    </div>
  );
};

export default TableSkill;
