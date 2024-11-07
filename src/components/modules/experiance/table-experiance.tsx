import { useNavigate } from "react-router-dom"
import { eventEmitter } from "@event-emmitter"
import EVENT_NAME_EXPERIANCE from "@event-emmitter/modules/experiance/experiance-event"

import Badge from "@components/ui/badge"
import Table from "@components/ui/table"

import useEventEmitter from "@hooks/use-event-emitter"
import useTable from "@hooks/use-table"
import { handleSetModalConfirmation } from "@store/modules/ui/ui-slice"
import { useAppDispatch, useAppSelector } from "@store/store"
import experiances from "@lib/data/dummy/experiances.json"
import { delay } from "@lib/helper/function"
import { routes } from "@routes/constant"
import { TTypeActionModalForm } from "@typescript/global.d"
import { TSettingTable } from "@typescript/modules/ui/ui-types"

type TData = (typeof experiances)[0]


const TableExperiance = () => {
  const isLoading = useAppSelector((state) => state?.ui?.isLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const configTable = useTable<TData, false>({
    initialColumn: [
      {
        name: 'Company',
        key: 'company_name',
        isSorted: true,
        className: ' md:min-w-0'
      },
      {
        name: 'Profession',
        key: 'profession_name',
        isSorted: true
      },
      {
        name: 'Start At',
        key: 'start_at',
        isSorted: true
      },
      {
        name: 'End At',
        key: 'end_at',
        isSorted: true
      },
      {
        name: 'Project',
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
      },
      {
        name: 'Tech Stack',
        key: 'tech_stacks',
        className: 'md:min-w-[10rem]',
        customeComponent: (data: TData) => {
          return (
            <div className='flex flex-col gap-2'>
            {data?.tech_stacks.map((stack, i) => (
              <Badge
                key={i}
                variant={'soft-gray'}
                label={stack}
                className='text-start px-4'
              />
            ))}
          </div>
          )
        }
      },

    ],
    initialSetting: {
      pagination: true,
      totalPage: 10
    },
    onFetchData: handleFetchData
  })

  useEventEmitter(EVENT_NAME_EXPERIANCE.SEARCH_DATA_TABLE_EXPERIANCE,async(formFilter)=>{
    await handleFetchData({
      ...configTable.setting,
      formFilter
    })
  })

  async function handleFetchData(params: TSettingTable<TData>): Promise<TData[]> {
    console.log('params : ', params)
    delay(1500)
    return experiances as TData[]
  }

  const handleEditData = (data: TData) => {
    eventEmitter.emit(EVENT_NAME_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE, {
      isShow: true,
      action: TTypeActionModalForm.EDIT
    })

    eventEmitter.emit(EVENT_NAME_EXPERIANCE.SET_EXPERIANCE, {
      id_company: data.id_company,
      id_profession: data.id_profession,
      start_at: data.start_at,
      end_at: data.end_at,
      description: ''
    })
  }

  const handleViewData = (data: TData) => {
    navigate(routes.experiance.child.detail.fullPath(String(data?.id)))
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


  return <div>
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

export default TableExperiance
