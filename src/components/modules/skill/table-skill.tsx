import { useContext } from 'react'
import Badge from '@components/ui/badge'
import Table from '@components/ui/table'
import { ACTION_TYPE_SKILL, skillContext } from '@context/modules/skill/skill-context'
import useTable from '@hooks/use-table'
import { skills } from '@lib/data/dummy'
import { delay } from '@lib/helper'
import variantBadge from '@lib/variant/variant-badge'
import { handleSetModalConfirmation } from '@store/modules/ui/ui-slice'
import { useAppDispatch, useAppSelector } from '@store/store'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TSettingTable } from '@typescript/modules/ui/ui-types'

type TData = (typeof skills)[0]

const TableSkill = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const { dispatch } = useContext(skillContext)
  const dispatchR = useAppDispatch()

  const configTable = useTable<TData, false>({
    initialColumn: [
      {
        name: 'Categgory',
        key: 'category',
        isSorted: true,
        className: ' md:min-w-0'
      },
      {
        name: 'Name',
        key: 'name',
        isSorted: true
      },
      {
        name: 'Year of Experiance',
        key: 'years_of_experience',
        isSorted: true,
        className: ' flex items-center  justify-center md:min-w-[10rem]'
      },
      {
        name: 'Level',
        key: 'level',
        isSorted: true,
        className: '   md:min-w-[10rem]',
        customeComponent: (data: TData) => {
          const level = data.level
          let variant = 'soft-primary' as keyof typeof variantBadge
          switch (level) {
            case 'Beginner':
              variant = 'soft-warning'
              break
            case 'Intermediate':
              variant = 'soft-sucess'
              break
            case 'Advanced':
              variant = 'soft-blue'
              break
          }
          return <Badge variant={variant} label={level} />
        }
      },
      {
        name: 'Related Project',
        key: 'projects',
        className: ' min-w-[15rem]',
        customeComponent: (data: TData) => {
          return (
            <div className='flex flex-col gap-2'>
              {data?.projects.map((project, i) => (
                <Badge key={i} variant={'soft-gray'} label={project} className='text-start px-4' />
              ))}
            </div>
          )
        }
      }
    ],
    initialSetting: {
      pagination: true,
      totalPage: 10
    },
    onFetchData: handleFetchData
  })

  async function handleFetchData(params: TSettingTable<TData>): Promise<TData[]> {
    console.log('params: ', params)
    delay(1500)
    return skills as TData[]
  }

  const handleEditData = (data: TData) => {
    console.log('data: ', data)
    dispatch({
      type: ACTION_TYPE_SKILL.SET_MODAL_FORM_SKILL,
      payload: {
        isShow: true,
        action: TTypeActionModalForm.EDIT
      }
    })
    dispatch({
      type: ACTION_TYPE_SKILL.SET_SKILL,
      payload: {
        id_category: '',
        id_skill: '',
        level: '',
        year_of_experiance: ''
      }
    })
  }

  const handleViewData = (data: TData) => {
    console.log('data: ', data)
  }

  const handleDeleteData = (data: TData) => {
    console.log('data: ', data)
    dispatchR(
      handleSetModalConfirmation({
        isShow: true,
        // title: 'Modal Confirmation',
        children: <>Are you sure want to delete this data?</>
      })
    )
  }

  return (
    <div>
      <Table<TData, false>
        {...configTable}
        withNo
        isLoading={isLoading}
        actionBtn={{
          view: handleViewData,
          edit: handleEditData,
          delete: handleDeleteData
        }}
      />
    </div>
  )
}

export default TableSkill
