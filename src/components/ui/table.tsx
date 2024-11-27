import { useCallback, useEffect, useMemo, useState } from 'react'

import Button from '@components/ui/button'
import EmptyData from '@components/ui/empty-data'
import Tooltip from '@components/ui/tooltip'

import useDebounce from '@hooks/use-debounce'
import { cn } from '@lib/helper/function'
import { TKeyVariantButton } from '@lib/helper/variant/variant-button'
import { TColumn, TEventOnChange, TSettingTable } from '@typescript/ui-types'
import {
  IconArrowUp,
  IconDelete,
  IconEdit,
  IconEye,
  IconFastForward,
  IconFastRewind,
  IconSkipNext,
  IconSkipPrevious,
  IconSort
} from '@assets/icons'

type WithId<T> = T & { id: string | number }
type WithOptionalChecked<T, TInclude extends boolean> = TInclude extends true
  ? T & { isChecked: boolean }
  : T & { isChecked?: never }

export interface TTableProps<TData, TIncludeChecked extends boolean = false> {
  columns: TColumn<TData, keyof TData>[]
  data: WithId<WithOptionalChecked<TData, TIncludeChecked>>[]
  setting: TSettingTable<TData>
  onChange: (params: any) => void
  isLoading?: boolean
  withNo?: boolean
  actionBtn?: {
    view?: (data: TData) => void
    edit?: (data: TData) => void
    delete?: (data: TData) => void
  }
}

const Table = <TData, TIncludeChecked extends boolean = false>(
  props: TTableProps<TData, TIncludeChecked>
) => {
  const { data, setting, onChange, actionBtn, isLoading } = props

  const handleOnChangePage = (pageNumber: number) => {
    onChange({
      ...setting,
      currentPage: pageNumber
    })
  }

  const isShowColumnAction = useMemo(
    () => actionBtn?.delete || actionBtn?.edit || actionBtn?.view,
    [actionBtn]
  )

  return (
    <div className='border border-warning-100 rounded-lg w-full overflow-hidden'>
      <div className='relative  overflow-y-auto max-h-[30rem] '>
        <table className={`table-auto  w-full ${data?.length === 0 && 'flex flex-col'}`}>
          <TableHeader {...props} isShowColumnAction={Boolean(isShowColumnAction)} />
          <TableBody {...props} isShowColumnAction={Boolean(isShowColumnAction)} />
        </table>
        <EmptyStageTable dataLength={data?.length} isLoading={Boolean(isLoading)} />
      </div>
      <PaginationTable<TData, TIncludeChecked>
        setting={setting}
        onChangePage={handleOnChangePage}
        dataLength={data.length}
      />
    </div>
  )
}

type TTableHeaderProps<TData, TIncludeChecked extends boolean = false> = Omit<
  TTableProps<TData, TIncludeChecked>,
  ''
> & {
  isShowColumnAction?: boolean
}

const TableHeader = <TData, TIncludeChecked extends boolean = false>(
  props: TTableHeaderProps<TData, TIncludeChecked>
) => {
  const { withNo, columns, setting, isLoading, data, onChange, isShowColumnAction } = props

  const handleSortColumn = useCallback(
    ({ key }: { key: keyof TData }) => {
      const sortDir =
        key !== setting?.sortBy ? 'desc' : setting?.sortDir === 'desc' ? 'asc' : 'desc'
      if (data?.length && !isLoading) {
        onChange({
          ...setting,
          sortBy: key,
          sortDir
        })
      }
    },
    [data?.length, isLoading, onChange, setting]
  )

  const IconSorted = useCallback(
    (column: TColumn<TData, keyof TData>) => (
      <span
        onClick={() => handleSortColumn({ key: column.key })}
        className={`cursor-pointer ${(isLoading || data?.length === 0) && '!cursor-not-allowed'}`}
      >
        {setting?.sortBy === column.key ? (
          <IconArrowUp
            className={cn({
              'icon-warning h-[1.25rem] transition-transform duration-300': true,
              'rotate-180': setting?.sortDir === 'desc' && setting?.sortBy === column.key
            })}
          />
        ) : (
          <IconSort className='ml-1 w-[1.1rem] h-[1.1rem] icon-warning' />
        )}
      </span>
    ),
    [handleSortColumn, isLoading, data?.length, setting]
  )

  return (
    <thead className='sticky z-[2] top-0 text-warning-700 bg-warning-50'>
      <tr className='border-b border-warning-100'>
        {withNo && <th className='p-th-td'>No.</th>}
        {columns?.map((column, i) => (
          <th key={i}>
            <div className={`flex p-th-td items-center text-center ${column?.className}`}>
              {column?.name}
              {column?.isSorted && IconSorted(column)}
            </div>
          </th>
        ))}
        {isShowColumnAction && (
          <th className='p-th-td'>
            <div className='min-w-[5rem] flex justify-center items-center'>Action</div>
          </th>
        )}
      </tr>
    </thead>
  )
}

type TTableBodyProps<TData, TIncludeChecked extends boolean = false> = Omit<
  TTableProps<TData, TIncludeChecked>,
  'isLoading'
> & {
  isShowColumnAction?: boolean
}

const TableBody = <TData, TIncludeChecked extends boolean = false>(
  props: TTableBodyProps<TData, TIncludeChecked>
) => {
  const { data, columns, withNo, setting, actionBtn = {}, isShowColumnAction } = props

  const renderActionButtons = useCallback(
    (dataRow: TData) => {
      return Object.entries(actionBtn).map(([key, onClick]) => {
        let Icon = <IconEye className='icon-blue' />
        let variant: TKeyVariantButton = 'softborder-blue'
        let tooltipInformation = 'See detail data'
        switch (key) {
          case 'edit':
            Icon = <IconEdit className='icon-warning' />
            variant = 'softborder-warning'
            tooltipInformation = 'Edit detail data'
            break
          case 'delete':
            Icon = <IconDelete className='icon-error' />
            variant = 'softborder-error'
            tooltipInformation = 'Delete data'
            break
          default:
            break
        }

        return (
          <Tooltip text={tooltipInformation} variant='bottom'>
            <Button
              key={key}
              className=''
              variant={variant}
              shape='circle'
              onClick={() => onClick(dataRow)}
            >
              {Icon}
            </Button>
          </Tooltip>
        )
      })
    },
    [actionBtn]
  )

  if (data?.length === 0) return null

  return (
    <tbody>
      {data?.map((dataRow, i) => {
        return (
          <tr key={i} className='border-b border-warning-100'>
            {withNo && (
              <td className={`p-th-td `}>
                {(setting?.currentPage - 1) * setting?.itemsPerPage + i + 1}
              </td>
            )}

            {columns?.map((column, j) => (
              <td key={j}>
                <div className={`flex p-th-td  ${column?.className}`}>
                  {column?.customeComponent
                    ? column?.customeComponent(dataRow)
                    : (dataRow[column.key] as string)}
                </div>
              </td>
            ))}

            {isShowColumnAction && (
              <td>
                <div className='min-w-[5rem] overflow-visible flex justify-center items-center pr-2'>
                  {renderActionButtons(dataRow)}
                </div>
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}

type TPropsPagination<TData, TIncludeChecked extends boolean> = Pick<
  TTableProps<TData, TIncludeChecked>,
  'setting'
> & {
  onChangePage: (params: any) => void
  dataLength: number
}

const PaginationTable = <TData, TIncludeChecked extends boolean>(
  props: TPropsPagination<TData, TIncludeChecked>
) => {
  const { setting, onChangePage: handleOnChangePage, dataLength } = props
  const iShowPagination = setting.pagination && dataLength > 0
  const [valuePage, setValuePage] = useState(setting.currentPage)
  const debounceValue = useDebounce({ value: valuePage, delay: 500 })

  useEffect(() => {
    handleOnChangePage(valuePage)
  }, [debounceValue])

  const listButton = useMemo(
    () => ({
      left: [
        {
          icon: <IconFastRewind />,
          onClick: () => handleOnChangePage(1),
          title: 'fast rewind button'
        },
        {
          icon: <IconSkipPrevious />,
          onClick: () => handleOnChangePage(setting.currentPage - 1),
          title: 'previous button'
        }
      ],
      right: [
        {
          icon: <IconSkipNext />,
          onClick: () => handleOnChangePage(setting.currentPage + 1),
          title: 'next button'
        },
        {
          icon: <IconFastForward />,
          onClick: () => handleOnChangePage(setting.totalPage),
          title: 'fast forward button'
        }
      ]
    }),
    [JSON.stringify(setting)]
  )

  const handleOnChange = (e: TEventOnChange) => {
    setValuePage(e.target.value)
  }

  if (!iShowPagination) return null

  return (
    <div className='flex w-full justify-end px-4 py-2'>
      <div className=' flex border rounded-md overflow-hidden'>
        {listButton?.left?.map((btn, i) => (
          <Button
            title={btn.title}
            key={i}
            onClick={btn.onClick}
            variant='no-style'
            className='rounded-none !border-r h-full'
            disabled={setting.currentPage == 1}
          >
            {btn.icon}
          </Button>
        ))}
        <div className='px-2 py-1 !border-r flex items-center justify-center gap-2'>
          <input
            value={valuePage}
            onChange={handleOnChange}
            aria-label='current-page'
            className='outline-none w-10 text-center focus:border-primary border  p-0 rounded-md'
          />
          <span>of {setting.currentPage}</span>
        </div>

        {listButton?.right?.map((btn, i) => (
          <Button
            title={btn.title}
            key={i}
            onClick={btn.onClick}
            variant='no-style'
            className='rounded-none !border-r h-full'
            disabled={setting.currentPage == setting.totalPage}
          >
            {btn.icon}
          </Button>
        ))}
      </div>
    </div>
  )
}

interface TPropsEmptyStageTable {
  isLoading: boolean
  dataLength: number
}

const EmptyStageTable = (props: TPropsEmptyStageTable) => {
  const { isLoading, dataLength } = props

  return (
    dataLength === 0 && (
      <div className='w-full h-[20rem] flex items-center justify-center'>
        {isLoading ? (
          'Loading...'
        ) : (
          <EmptyData
            customeClass={{
              container: 'w-full !border-none',
              img: 'h-[5rem]'
            }}
          />
        )}
      </div>
    )
  )
}

export default Table
