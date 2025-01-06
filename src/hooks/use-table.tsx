import React, { useEffect, useState } from 'react'

import { TTableProps } from '@components/ui/table'

import { TResponseDataPaginationAPI } from '@typescript/index-type'
import { TColumn, TSettingTable } from '@typescript/ui-types'

interface TProps<TData extends object, TIncludeChecked extends boolean = false> {
  initialColumn: TTableProps<TData, TIncludeChecked>['columns']
  initialData?: TData[]
  initialSetting?: Partial<TSettingTable<TData>>
  onFetchData: <TObject extends object>(
    params: TSettingTable<TData> & TObject
  ) => Promise<TResponseDataPaginationAPI<TData>>
}

const useTable = <TData extends object, TIncludeChecked extends boolean = false>(
  props: TProps<TData, TIncludeChecked> &
    Omit<
      TTableProps<TData, TIncludeChecked>,
      'setting' | 'data' | 'columns' | 'settings' | 'onChange' | 'setData'
    >
) => {
  const {
    initialColumn,
    initialData,
    initialSetting,
    onFetchData: handleFetchData,
    ...anotherConfigTable
  } = props
  const [data, setData] = useState<TData[]>(initialData || [])

  const [setting, setSetting] = useState<TSettingTable<TData>>({
    currentPage: 1,
    totalPage: 0,
    itemsPerPage: 10,
    pagination: true,
    ...initialSetting
  })

  const columns: TColumn<TData, keyof TData>[] = React.useMemo(() => initialColumn, [initialColumn])

  useEffect(() => {
    onChange({
      ...setting,
      ...initialSetting
    })
  }, [])

  const onChange = async (params: TSettingTable<TData>) => {
    const data = await handleFetchData(params)

    setData(data?.items)
    setSetting({
      ...setting,
      totalPage: data?.total_pages,
      currentPage: data?.current_page === 0 ? 1 : data?.current_page
    })
  }

  return {
    setting,
    columns,
    setData,
    data,
    onChange,
    ...anotherConfigTable
  }
}

export default useTable
