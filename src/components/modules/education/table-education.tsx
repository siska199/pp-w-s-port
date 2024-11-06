
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import Table from "@components/ui/table"

import useTable from "@hooks/use-table"
import { handleSetModalConfirmation } from "@store/modules/ui/ui-slice"
import { useAppDispatch, useAppSelector } from "@store/store"
import { educationContext } from "@context/modules/education/education-context"
import educations from "@lib/data/dummy/educations.json"
import { delay } from "@lib/helper/function"
import { routes } from "@routes/constant"
import { TTypeActionModalForm } from "@typescript/global.d"
import { TSettingTable } from "@typescript/modules/ui/ui-types"

type TData = (typeof educations)[0]

const TableEducation = () => {
  const isLoading = useAppSelector((state) => state.ui.isLoading)
  const { handleToggleModalFormEducation, handelSetEducation } = useContext(educationContext)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const configTable = useTable<TData, false>({
    initialColumn: [
      {
        name: 'Level',
        key: 'level_name',
        isSorted: true,
        className: ' md:min-w-0'
      },
      {
        name: 'Major',
        key: 'major_name',
      },
      {
        name: 'Shool',
        key: 'school_name',
      },
      {
        name : 'Start At',
        key : 'start_at',
        isSorted: true,
        className:'min-w-[12rem]'
      },
      {
        name : 'End At',
        key : 'end_at',
        isSorted : true,
        className:'min-w-[12rem]'
      }

    ],
    initialSetting: {
      pagination: true,
      totalPage: 10
    },
    onFetchData: handleFetchData
  })
  async function handleFetchData(params: TSettingTable<TData>): Promise<TData[]> {
    console.log('params : ', params)
    delay(1500)
    return educations as TData[]
  }

  const handleEditData = (data: TData) => {
    handleToggleModalFormEducation({
      isShow: true,
      action: TTypeActionModalForm.EDIT
    })
    handelSetEducation({
      description: data.description,
      id_level: data.id_level,
      id_major: data.id_major,
      id_school: data.id_school,
      start_at: data.start_at,
      end_at: data.end_at
  })
}

  const handleViewData = (data: TData) => {
    navigate(routes.education.child.detail.fullPath(String(data?.id)))
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


  return     <div>
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
}

export default TableEducation