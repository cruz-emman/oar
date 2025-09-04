
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
import StudentDialog from "./admin/form/add-new-student-dialog"
import FilterComponent from "./FilterComponent"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onRowClick?: (row: TData) => void
    setOpen?: (value: boolean) => void
}




export function DataTableResulTable<TData, TValue>({
    columns,
    data,
    setOpen,
    onRowClick
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


            <div className="w-full space-y-6 p-6 mx-auto max-w-screen-2xl">
                <div className="relative flex-1 w-full">
                    <div className="flex items-center justify-between gap-2 ">
                        <div>
                            <FilterComponent
                                placeholder="e.g. John Doe"
                                value={globalFilter ?? ""}
                                onChange={(event) => setGlobalFilter(String(event.target.value))}
                                setOpen={setOpen}
                            />

                            <div className="flex gap-2">
                                {/* {table.getColumn("college") && (
                            <DataTableFacetedFilter
                                column={table.getColumn("college")}
                                title="College"
                                options={categoryCollegeSmall}
                            />
                        )} */}

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