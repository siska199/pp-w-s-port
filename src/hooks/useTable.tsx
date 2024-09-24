import { TTableProps } from "@components/ui/Table";
import { TColumn, TSettingTable } from "types/ui-types";
import React, { useEffect, useState } from "react";

interface TProps<TData, TIncludeChecked extends boolean = false> {
    initialColumn   : TTableProps<TData, TIncludeChecked>["columns"]
    initialData?    : TData[]
    initialSetting  : Partial<TSettingTable<TData>>
    onFetchData     : (params: TSettingTable<TData>) => Promise<TData[]>;
}

const useTable = <TData extends object, TIncludeChecked extends boolean = false> (props: TProps<TData, TIncludeChecked> & Omit<TTableProps<TData, TIncludeChecked>,"setting" |"data" | "columns" | "settings" | "onChange" | "setData">) => {
    const { initialColumn, initialData, initialSetting, onFetchData: handleFetchData, ...anotherConfigTable } = props
    const [data, setData] = useState<TData[]>(initialData || [])


    const [setting, setSetting] = useState<TSettingTable<TData>>({
        currentPage     : 1,
        totalPage       : 10,
        itemsPerPage    : 10,
        ...initialSetting,
    })

    const columns: TColumn<TData, keyof TData>[] = React.useMemo(
        () => initialColumn,
        [initialColumn]
    );

    useEffect(() => {
        onChange(setting)
    }, [])

    const onChange = async (params: TSettingTable<TData>) => {
        const data = await handleFetchData(params)
        setData(data)
        params && setSetting(params)
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