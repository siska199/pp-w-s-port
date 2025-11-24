import { useNavigate } from 'react-router-dom'
import { eventEmitter } from '@event-emitters'

import EVENT_PROJECT from '@features/project/event-emitters/project-event'
import EVENT_SKILL_USER from '@features/skill-user/event-emitters/skill-user-event'
import Badge from '@components/ui/badge'
import Table from '@components/ui/table'

import useEventEmitter from '@hooks/use-event-emitter'
import useTable from '@hooks/use-table'
import { useAppDispatch, useAppSelector } from '@store/store'
import { handleSetModalConfirmation } from '@store/ui-slice'
import { projects } from '@lib/data/dummy/dummy'
import { delay } from '@lib/helper/function'
import { routes } from '@routes/constant'
import { TResponseDataPaginationAPI, TTypeActionModalForm } from '@typescript/index-type'
import { TSettingTable } from '@typescript/ui-types'
import { TProject } from '@features/project/types/project-type'


const TableProject = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const configTable = useTable<TProject, false>({
    initialColumn: [
      {
        name: 'Title',
        key: 'title',
        className: ' md:min-w-0'
      },
      {
        name: 'Category',
        key: 'category',
        isSorted: true
      },
      {
        name: 'Company',
        key: 'company_name',
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
        customeComponent: (data: TProject) => {
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

  useEventEmitter(EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER, async (formFilter) => {
    await handleFetchData({
      ...configTable.setting,
      formFilter
    })
  })

  async function handleFetchData(params: TSettingTable<TProject>): Promise<TProject[]> {
    const results = await getListEducation({
      sort_by: params.sortBy,
      sort_dir: params?.sortDir,
      items_perpage: params?.itemsPerPage,
      page_no: params?.currentPage,
 
    })
    return results as TResponseDataPaginationAPI<TProject[]>
  }

  const handleEdiTProject = (data: TProject) => {
    eventEmitter.emit(EVENT_PROJECT.SET_FORM_PROJECT, {
      action: TTypeActionModalForm.EDIT,
      id: String(data?.id)
    })
    navigate(routes.project.child.detail.fullPath(String(data.id)))
  }

  const handleViewData = (data: TProject) => {
    navigate(routes.project.child.detail.fullPath(String(data?.id)))
  }

  const handleDeleteData = (data: TProject) => {
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
      <Table<TProject, false>
        {...configTable}
        withNo
        isLoading={isLoading}
        actionBtn={{
          view: handleViewData,
          edit: handleEdiTProject,
          delete: handleDeleteData
        }}
      />
    </div>
  )
}

export default TableProject
