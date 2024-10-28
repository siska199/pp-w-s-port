import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Badge from '@components/ui/badge'
import Table from '@components/ui/table'

import useTable from '@hooks/use-table'
import { handleSetModalConfirmation } from '@store/modules/ui/ui-slice'
import { useAppDispatch, useAppSelector } from '@store/store'
import { ACTION_TYPE_SKILL, skillContext } from '@context/modules/skill/skill-context'
import skills from '@lib/data/dummy/skills_user.json'
import { delay } from '@lib/helper'
import variantBadge from '@lib/variant/variant-badge'
import { routes } from '@routes/constant'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TSettingTable } from '@typescript/modules/ui/ui-types'

type TData = (typeof skills)[0]

const TableSkill = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const { dispatch } = useContext(skillContext)
  const dispatchR = useAppDispatch()
  const navigate = useNavigate()

  const configTable = useTable<TData, false>({
    initialColumn: [
      {
        name: 'Categgory',
        key: 'category_name',
        isSorted: true,
        className: ' md:min-w-0'
      },
      {
        name: 'Name',
        key: 'skill_name',
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
                <Badge
                  key={i}
                  variant={'soft-gray'}
                  label={project.name}
                  className='text-start px-4'
                />
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
        id_category: data?.id_category,
        id_skill: data?.id_skill,
        level: data?.level,
        year_of_experiances: String(data?.years_of_experience)
      }
    })
  }

  const handleViewData = (data: TData) => {
    navigate(routes.skill.child.detail.fullPath(String(data?.id)))
  }

  const handleDeleteData = (data: TData) => {
    console.log('data: ', data)
    dispatchR(
      handleSetModalConfirmation({
        isShow: true,
        children: 'Are you sure want to delete this data?',
        button: {
          confirm: {
            onClick: () => dispatchR(handleSetModalConfirmation({ isShow: false }))
          }
        }
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
