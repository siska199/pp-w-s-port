


import { TColumn, TSettingTable } from "types/ui-types";
import React, { useMemo } from "react";
import InputCheckbox from "@components/ui/input/input-checkbox";
import { cn } from "@lib/helper";
import Button from "@components/ui/button";
import { IconArrowUp, IconChevronLeft, IconChevronRight, IconDelete, IconEdit, IconEye, IconSort, } from '@assets/icons';
import EmptyData from "@components/ui/empty-data";
import Badge from "@components/ui/badge";


type WithId<T> = T & { id: string | number };
type WithOptionalChecked<T, TInclude extends boolean> = TInclude extends true ? 
                                                        T & { isChecked: boolean } : 
                                                        T & { isChecked?: never }; 

export interface TTableProps<TData, TIncludeChecked extends boolean = false> {
    columns     : TColumn<TData, keyof TData>[];
    data        : WithId<WithOptionalChecked<TData, TIncludeChecked>>[];
    setData     : React.Dispatch<React.SetStateAction<WithOptionalChecked<TData, TIncludeChecked>[]>>
    setting     : TSettingTable<TData>
    onChange    : (params: any) => void;
    isLoading?  : boolean;
    withNo?     : boolean;
    actionBtn?   : {
        view?   : (data:TData)=>void;
        edit?   : (data:TData)=>void;
        delete? : (data:TData)=>void;
    }
}


const Table = <TData, TIncludeChecked extends boolean = false>(props: TTableProps<TData, TIncludeChecked>) => {
    const { columns, isLoading, data, setData, setting, onChange, withNo ,actionBtn} = props

    const isCheckedAll = useMemo(()=>data?.length > 0 ? 
                                    !data?.some((dataRow: WithOptionalChecked<TData, TIncludeChecked>) => !dataRow.isChecked) 
                                    : false,
                        [data])

    const handleOnChangeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e?.target?.value
        const isChecked = e?.target?.checked
        
        if (name === "cheked-all") {
            const newData = data?.map((dataRow) => ({
                ...dataRow, isChecked
            }))
            setData(newData)
        } else {
            const valueParse = JSON.parse(value)
            const dataChecked = data?.map((data) => {
                const isCheckedCurrData = valueParse?.id === data?.id ? isChecked : data?.isChecked
                return { ...data, isChecked: isCheckedCurrData }
            })
            setData(dataChecked)
        }
    }

    const handleSortColumn = (params: { key: keyof TData }) => {
        const sortDir = params?.key !== setting?.sortBy ? 'desc' : setting?.sortDir === 'desc' ? 'asc' : 'desc'
        if (data?.length !== 0 && !isLoading) {
            onChange({
                ...setting,
                sortBy: params.key,
                sortDir: sortDir
            })
        }
    }

    const handleOnChangePage = (pageNumber: number) => {
        onChange({
            ...setting,
            currentPage: pageNumber
        })
    }

    const style = {
        columnChecked   : "flex items-center justify-center py-2 px-4 ",
        columnData      : "py-2 px-6 ",
        columnNo        : "py-2 px-4 ",
        iconAction      : '!p-1 !min-h-auto !min-w-auto cursor-pointer-custome'
    }

    const isShowColumnAction = useMemo(()=>actionBtn?.delete || actionBtn?.edit || actionBtn?.view,[actionBtn])

    return (
        <div className="border border-warning-100 rounded-lg w-full overflow-hidden">
            <div className="relative  overflow-y-auto   max-h-[30rem] ">
                <table className={`table-auto  w-full ${data?.length === 0 && 'flex flex-col'}`}>
                    <thead className="sticky z-[2] top-0  text-warning-700 bg-warning-50 ">
                        <tr className="border-b border-warning-100">
                            {
                                (setting?.checked) && (
                                    <th className={`${style.columnChecked}`}>
                                        <InputCheckbox
                                            checked={isCheckedAll}
                                            value={'cheked-all'}
                                            onChange={handleOnChangeChecked}
                                            name={"cheked-all"} 
                                        />
                                    </th>
                                )
                            }
                            {
                                withNo && (
                                    <th className={`${style.columnNo}`}>
                                        No.
                                    </th>
                                )
                            }
                            {
                                columns?.map((column, i) => <th key={i}>
                                    <div className={`flex ${style.columnData}  items-center text-center ${column?.className}`}>
                                        {column?.name}
                                        {column?.isSorted && (
                                            <span onClick={() => handleSortColumn({ key: column.key })} className={`cursor-pointer ${(isLoading || data?.length === 0) && "!cursor-not-allowed"}`}>
                                                {
                                                    setting?.sortBy === column?.key ? (
                                                        <IconArrowUp
                                                            className={cn({
                                                                'icon-warning h-[1.25rem] transition-transform duration-300': true,
                                                                "rotate-180": setting?.sortDir === "desc" && setting?.sortBy === column?.key
                                                            })} />
                                                    ) : (
                                                        <IconSort
                                                            className="ml-1 w-[1.1rem] h-[1.1rem] icon-warning"
                                                        />
                                                    )
                                                }
                                            </span>
                                        )}
                                    </div>
                                </th>)
                            }
                            {
                                isShowColumnAction && <th> <div className="min-w-[5rem] flex justify-center items-center">Action</div></th>
                            }
                        </tr>
                    </thead>
                    {
                        data?.length >= 0 && (
                            <tbody className={`text-gray `}>
                                {
                                    data?.map((dataRow, i) => {
                                        return (
                                            <tr key={i} className="border-b border-warning-100">
                                                {
                                                    setting?.checked && handleOnChangeChecked && <td className={`${style.columnChecked}`}><InputCheckbox onChange={handleOnChangeChecked} checked={dataRow?.isChecked} value={JSON.stringify(dataRow)} name={`checked-${i}`} /></td>
                                                }
                                                {
                                                    withNo && (
                                                        <td className={`${style.columnNo}`}>
                                                            {(setting?.currentPage - 1) * setting?.itemsPerPage + i + 1}
                                                        </td>
                                                    )
                                                }
                                                {
                                                    columns?.map((column, j) =>
                                                        <td key={j} >
                                                            <div className={`flex ${style.columnData} ${column?.className}`}>
                                                                {
                                                                    column?.customeComponent ? column?.customeComponent(dataRow) : dataRow[column.key] as string
                                                                }
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                {
                                                    isShowColumnAction && (
                                                        <td>
                                                            <div className="min-w-[5rem] flex justify-center items-center gap-2">
                                                                {actionBtn?.view && <Badge variant={'softborder-blue'} label={ <IconEye className="icon-blue"/>} shape={'pilled'} className={style.iconAction}/>}
                                                                {actionBtn?.edit && <Badge variant={'softborder-warning'} label={ <IconEdit className="icon-warning"/>} shape={'pilled'} className={style.iconAction}/>}
                                                                {actionBtn?.delete && <Badge variant={'softborder-warning'} label={ <IconDelete className="icon-error"/>} shape={'pilled'} className={style.iconAction}/>}
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        )
                    }
                </table>
                {
                    data?.length === 0 && (
                        <div className="w-full h-[20rem] flex items-center justify-center">
                            {
                                isLoading ? "Loading..." : <EmptyData customeClass={{ container: "w-full !border-none", img: "h-[5rem]" }} />

                            }
                        </div>
                    )
                }
            </div>
            {
                (setting?.pagination && data?.length !== 0) && <PaginationTable<TData, TIncludeChecked>
                    setting={setting}
                    onChangePage={handleOnChangePage}
                />

            }
        </div >
    )
}


type TPropsPagination<TData, TIncludeChecked extends boolean> = Pick<TTableProps<TData, TIncludeChecked>, "setting"> & {
    onChangePage: (params: any) => void;
}

const PaginationTable = <TData, TIncludeChecked extends boolean>(props: TPropsPagination<TData, TIncludeChecked>) => {
    const { setting, onChangePage: handleOnChangePage } = props

    const pageNumbers = React.useMemo(() => Array.from({ length: setting.totalPage }, (_, index) => index + 1), [setting.totalPage]);
    const currentPage = setting?.currentPage

    const [listPageNumberStart, listPageNumberEnd] = React.useMemo(() => {
        if (setting?.totalPage <= 6) return [pageNumbers, []];

        const adjacentPageCount = 1;
        let startIndex = currentPage - adjacentPageCount - 1;
        let endIndex = currentPage + adjacentPageCount;
        
        if (startIndex < 0) {
            startIndex = 0;
            endIndex = Math.min(3, setting?.totalPage);
        } else if (endIndex == pageNumbers.length - 2) {
            startIndex -= 1
            endIndex -= 1
        } else if (endIndex >= pageNumbers?.length - 1) {
            startIndex = 0
            endIndex = 3
        }

        const startPages = pageNumbers.slice(startIndex, endIndex);
        const endPages = pageNumbers.slice(setting?.totalPage - 3, setting?.totalPage);

        return [startPages, endPages];
    }, [setting.totalPage, currentPage, pageNumbers]);

    const ButtonPageNumber = (pageNumber: number) => (
        <Button
            onClick={() => handleOnChangePage(pageNumber)}
            variant={"plain"}
            className={cn({
                "w-[2.5rem] h-[2.5rem]": true,
                "!bg-gray-100 font-bold": pageNumber === currentPage
            })}
        >
            {pageNumber}
        </Button>
    )


    return (
        <div className="flex items-center justify-between px-4 py-2 border-t">
            <Button variant={"solid-white"} disabled={currentPage <= 1} onClick={() => handleOnChangePage(setting?.currentPage - 1)} 
            className="font-medium text-gray">
                <><IconChevronLeft /><span className="hidden md:block">Previous</span></>
            </Button>

            <div className="items-center hidden md:flex">
                {
                    setting?.totalPage > 6 ? (
                        <div className="flex items-center gap-1">
                            {listPageNumberStart.map((pageNumber, i) => <span key={i}>{ButtonPageNumber(pageNumber)}</span>)}
                            {listPageNumberEnd[0] - listPageNumberStart[listPageNumberStart?.length - 1] !== 1 && <div>...</div>}
                            {listPageNumberEnd?.map((pageNumber, i) => <span key={i}>{ButtonPageNumber(pageNumber)}</span>)}
                        </div>
                    ) : (
                        pageNumbers.map((pageNumber, i) => <span key={i}>{ButtonPageNumber(pageNumber)}</span>)
                    )
                }
            </div>
            <div className="md:hidden">
                <p><span className="font-medium">{setting?.currentPage} </span>of <span className="font-medium">{setting.totalPage}</span></p>
            </div>

            <Button disabled={setting?.currentPage >= setting?.totalPage} onClick={() => handleOnChangePage(setting?.currentPage + 1)} 
            variant={"solid-white"} className="font-medium text-gray">
                <><span className="hidden md:block">Next</span><IconChevronRight /></>
            </Button>
        </div>
    )
}

export default Table