import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type PaginationState,
    type SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useContext, useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MonsterContext} from "@/contexts/monster-context.tsx";
import type {Monster} from "@/lib/monster-types.ts";
import {DatatableContext} from "@/contexts/datatable-context.tsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[],
    data: TData[],
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 15})
    const {setSelectedMonsters} = useContext(MonsterContext)
    const {rowSelection, setRowSelection} = useContext(DatatableContext)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            pagination,
            rowSelection
        }
    })

    useEffect(() => {
        if (table.getSelectedRowModel().rows.length > 0) {
            const monsters = table.getSelectedRowModel().rows.map((tRow) => tRow.original as Monster)
            setSelectedMonsters(monsters)
        } else {
            setSelectedMonsters([])
        }
    }, [rowSelection, table, setSelectedMonsters])


    return (
        <div>
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                    className="max-w-sm bg-[#F7F3E8] drop-shadow-lg"
                />
                <Button onClick={() => table.getColumn("name")?.setFilterValue("")} className="drop-shadow-lg">Clear
                    Filter</Button>
                <Button onClick={() => {
                    setSelectedMonsters([])
                    table.toggleAllRowsSelected(false)
                }} className="drop-shadow-lg">Clear Selection</Button>
            </div>
            <div className="overflow-hidden rounded-md border drop-shadow-lg">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-[#CBB994]">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(
                                                header.column.columnDef.header, header.getContext()
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className={`${index % 2 === 0 ? "bg-[#F7F3E8]" : "bg-[#EDE5D1]"} hover:bg-[#D8CBA8] data-[state=selected]:bg-[#BBAE89]`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="drop-shadow-lg"
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="drop-shadow-lg">
                    Next
                </Button>
            </div>
        </div>
    )
}