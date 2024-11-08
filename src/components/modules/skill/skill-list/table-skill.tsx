import { useNavigate } from 'react-router-dom'
import { eventEmitter } from '@event-emmitter'
import { default as EVENT_SKILL } from '@event-emmitter/modules/skill/skill-event'

import Badge from '@components/ui/badge'
import Table from '@components/ui/table'

import useEventEmitter from '@hooks/use-event-emitter'
import useTable from '@hooks/use-table'
import { handleSetModalConfirmation } from '@store/modules/ui/ui-slice'
import { useAppDispatch, useAppSelector } from '@store/store'
import skills from '@lib/data/dummy/skills_user.json'
import { delay } from '@lib/helper/function'
import variantBadge from '@lib/variant/variant-badge'
import { routes } from '@routes/constant'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TSettingTable } from '@typescript/modules/ui/ui-types'

type TData = (typeof skills)[0]

const TableSkill = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const dispatch = useAppDispatch()
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

  useEventEmitter(EVENT_SKILL.SEARCH_DATA_TABLE_SKILL, async (formFilter) => {
    await handleFetchData({
      ...configTable.setting,
      formFilter
    })
  })

  async function handleFetchData(params: TSettingTable<TData>): Promise<TData[]> {
    console.log('params : ', params)
    delay(1500)
    return skills as TData[]
  }

  const handleEditData = (data: TData) => {
    eventEmitter.emit(EVENT_SKILL.SET_MODAL_FORM_SKILL, {
      isShow: true,
      action: TTypeActionModalForm.EDIT
    })

    eventEmitter.emit(EVENT_SKILL.SET_SKILL, {
      id_category: data?.id_category,
      id_skill: data?.id_skill,
      level: data?.level,
      year_of_experiances: String(data?.years_of_experience)
    })
  }

  const handleViewData = (data: TData) => {
    navigate(routes.skill.child.detail.fullPath(String(data?.id)))
  }

  const handleDeleteData = (data: TData) => {
    console.log('data: ', data)
    dispatch(
      handleSetModalConfirmation({
        isShow: true,
        children: 'Are you sure want to delete this data?',
        button: {
          confirm: {
            onClick: () => dispatch(handleSetModalConfirmation({ isShow: false }))
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
