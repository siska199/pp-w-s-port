import { useNavigate } from 'react-router-dom'
import { eventEmitter } from '@event-emitters'

import useEducationApi from '@features/education/apis/use-education-api'
import EVENT_EDUCATION from '@features/education/event-emitters/education-event'
import { TEducation } from '@features/education/types/education-type'
import Table from '@components/ui/table'

import useEventEmitter from '@hooks/use-event-emitter'
import useTable from '@hooks/use-table'
import { useAppDispatch, useAppSelector } from '@store/store'
import { handleSetModalConfirmation } from '@store/ui-slice'
import { formatDate } from '@lib/helper/function'
import { routes } from '@routes/constant'
import { TTypeActionModalForm } from '@typescript/index-type'
import { TResponseDataPaginationAPI } from '@typescript/index-type'
import { TSettingTable } from '@typescript/ui-types'

const TableEducation = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { getListEducation } = useEducationApi()
  const configTable = useTable<TEducation, false>({
    initialColumn: [
      {
        name: 'Level',
        key: 'level_name',
        isSorted: true,
        className: ' md:min-w-[10rem]'
      },
      {
        name: 'Major',
        key: 'major_name',
        className: ' md:min-w-[10rem]'
      },
      {
        name: 'Shool',
        key: 'school_name',
        className: ' md:min-w-[10rem]'
      },
      {
        name: 'Start At',
        key: 'start_at',
        isSorted: true,
        className: 'min-w-[10rem]',
        customeComponent: (data) => {
          return <div>{formatDate({ date: data.start_at })}</div>
        }
      },
      {
        name: 'End At',
        key: 'end_at',
        isSorted: true,
        className: 'min-w-[10rem]',
        customeComponent: (data) => {
          return <div>{formatDate({ date: data.end_at })}</div>
        }
      }
    ],
    initialSetting: {
      pagination: true,
      itemsPerPage: 10,
      currentPage: 1
    },
    onFetchData: handleFetchData
  })

  useEventEmitter(EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION, async (formFilter) => {
    await configTable.onChange({
      ...configTable.setting,
      formFilter
    })
  })

  useEventEmitter(EVENT_EDUCATION.REFRESH_DATA_TABLE_EDUCATION, async () => {
    await configTable.onChange({
      ...configTable.setting
    })
  })

  async function handleFetchData(
    params: TSettingTable<TEducation> & { keyword?: string; id_level?: string }
  ): Promise<TResponseDataPaginationAPI<TEducation>> {
    const results = await getListEducation({
      sort_by: params.sortBy,
      sort_dir: params?.sortDir,
      items_perpage: params?.itemsPerPage,
      page_no: params?.currentPage,
      keyword: params?.keyword,
      id_level: params?.id_level
    })
    return results?.data as TResponseDataPaginationAPI<TEducation>
  }

  const handleEditData = (data: TEducation) => {
    eventEmitter.emit(EVENT_EDUCATION.SET_MODAL_FORM_EDUCATION, {
      isShow: true,
      action: TTypeActionModalForm.EDIT
    })

    eventEmitter.emit(EVENT_EDUCATION.SET_EDUCATION, {
      id: data?.id,
      description: data.description,
      id_level: data.id_level,
      id_major: data.id_major,
      id_school: data.id_school,
      start_at: data.start_at,
      end_at: data.end_at,
      gpa: String(Number(data.gpa)?.toFixed(2))
    })
  }

  const handleViewData = (data: TEducation) => {
    const id = data.id
    navigate(routes.education.child.detail.fullPath(id))
  }

  const handleDeleteData = (data: TEducation) => {
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
      <Table<TEducation, false>
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

export default TableEducation
