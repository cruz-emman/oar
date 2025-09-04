
"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,

} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Filter, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DateRangeFilter } from "./report-table-date-range-filter"
import dateBetweenFilterFn from "@/utils/date-between-filter"
import { DateRangePicker } from "@/components/ui/date-range-picker/date-range-picker"
import { differenceInDays, endOfMonth, startOfMonth } from "date-fns"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
    setOpen?: (value: boolean) => void
    from?: Date
    to?: Date
    setDateRange: any;
}



export function ReportTable<TData, TValue>({
    columns,
    data,
    setOpen,
    onRowClick,
    from,
    to,
    setDateRange
}: DataTableProps<TData, TValue>) {



    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    })

    const [globalFilter, setGlobalFilter] = useState<any>([])


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
            dateBetweenFilterFn: dateBetweenFilterFn,
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination,
            globalFilter
        },
    })

    const isFiltered = table.getState().columnFilters.length > 0


    return (
        <>
            <div className="w-full space-y-6 px-6 py-2 mx-auto max-w-screen-2xl">
                <div className="relative flex-1 w-full">
                    <div className="flex items-center justify-between gap-2 ">
                        <div>
                            <div className="flex flex-row gap-2 bg-white">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-10 w-[450px]"
                                    placeholder="Search reports..."
                                    value={globalFilter ?? ""}
                                    onChange={(event) => setGlobalFilter(String(event.target.value))}
                                />
                                {/* <DateRangeFilter column={table.getColumn("date_request")} /> */}
                                <DateRangePicker
                                    initialDateFrom={from}
                                    initialDateTo={to}
                                    showCompare={false}
                                    onUpdate={(values) => {
                                        const { from, to } = values.range;

                                        setDateRange({ from, to });
                                    }}
                                />
                            </div>



                            {isFiltered && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => table.resetColumnFilters()}
                                >
                                    Reset
                                    <X />
                                </Button>
                            )}
                        </div>


                    </div>
                </div>



                <div className="rounded-lg border bg-background overflow-hidden">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead style={{ position: 'relative', width: header.getSize() }} key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        onClick={() => onRowClick?.(row.original)}
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="text-sm p-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-19 text-center text-muted-foreground">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-end space-x-2 py-4 px-2">
                        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}