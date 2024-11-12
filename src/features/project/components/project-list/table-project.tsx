import { useNavigate } from 'react-router-dom'
import { eventEmitter } from '@event-emitters'
import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import EVENT_SKILL from '@features/skill/event-emitters/skill-event'

import Badge from '@components/ui/badge'
import Table from '@components/ui/table'

import useEventEmitter from '@hooks/use-event-emitter'
import useTable from '@hooks/use-table'
import { useAppDispatch, useAppSelector } from '@store/store'
import { handleSetModalConfirmation } from '@store/ui-slice'
import { projects } from '@lib/data/dummy/dummy'
import { delay } from '@lib/helper/function'
import { routes } from '@routes/constant'
import { TTypeActionModalForm } from '@typescript/global.d'
import { TSettingTable } from '@typescript/ui-types'

type TData = (typeof projects)[0]

const TableProject = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const configTable = useTable<TData, false>({
    initialColumn: [
      {
        name: 'Title',
        key: 'title',
        className: ' md:min-w-0'
      },
      {
        name: 'Company',
        key: 'company_name',
        isSorted: true
      },
      {
        name: 'Category',
        key: 'category',
        isSorted: true
      },
      {
        name: 'Type',
        key: 'type',
        isSorted: true
      },
      {
        name: 'Tech Stack',
        key: 'tech_stacks',
        className: ' min-w-[15rem]',
        customeComponent: (data: TData) => {
          return (
            <div className='flex flex-col gap-2'>
              {data?.tech_stacks.map((techStack, i) => (
                <Badge
                  key={i}
                  variant={'soft-gray'}
                  label={techStack}
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
    return projects as TData[]
  }

  const handleEditData = (data: TData) => {
    eventEmitter.emit(EVENT_PROJECT.SET_FORM_PROJECT, {
      action: TTypeActionModalForm.EDIT,
      id: String(data?.id)
    })
    navigate(routes.project.child.detail.fullPath(String(data.id)))
  }

  const handleViewData = (data: TData) => {
    navigate(routes.project.child.detail.fullPath(String(data?.id)))
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

export default TableProject
