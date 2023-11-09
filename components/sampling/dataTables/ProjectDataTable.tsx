"use client"
import * as React from "react"
import useSWR from "swr"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { samplingProjectPageColumns } from "@/components/columns"
import { cn } from "@/lib/utils"
import { ProjectSamplingType } from "@/lib/type"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data)
  }
  return JSON.parse(data)
}

export function DataTable() {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]) // prettier-ignore
  const [statusFilter, setStatusFilter] = React.useState("")

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data, error, isLoading } = useSWR("/api/sampling/project", fetcher)

  const table = useReactTable({
    data: data,
    columns: samplingProjectPageColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>no data</div>

  return (
    <div className="w-full">
      {/* Top Search Title */}
      <div className="flex items-center py-4">
        <div className="flex gap-2">
          {/* Seach Input */}
          <Input
            placeholder="Filter By Project Title"
            value={(table.getColumn("judul")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("judul")?.setFilterValue(event.target.value)
            }
            className="max-w-sm border-pastel_moss_green rounded-full focus-visible:ring-0 bg-pastel_moss_green pl-5 placeholder:text-moss_green"
          />

          {["", "Need Schedule", "On Discuss", "Revision"].map((s, i) => (
            <Button
              key={i}
              className={cn(
                "min-w-fit bg-transparent text-moss_green rounded-full border-2 shadow-none border-pastel_moss_green hover:bg-pastel_moss_green",
                statusFilter == s && "bg-pastel_moss_green"
              )}
              onClick={() => {
                table.getColumn("status")?.setFilterValue(s)
                setStatusFilter(s)
              }}
            >
              {s.length ? s : "All"}
            </Button>
          ))}
        </div>

        {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto text-moss_green focus-visible:ring-0 hover:bg-transparent hover:text-moss_green border-pastel_moss_green border-2 shadow-none"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="text-moss_green">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize focus:bg-pastel_moss_green focus:text-moss_green"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Content */}
      <div className=" text-moss_green ">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-center text-moss_green font-light italic"
                      key={header.id}
                    >
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
                  className="hover:bg-pastel_moss_green ease-in-out duration-500 text-xs hover:cursor-pointer hover:rounded-xl text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    router.push("project/" + row.getValue("no_penawaran"))
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={samplingProjectPageColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4 max-sm:flex-col gap-5">
        <div className="flex-1 text-sm text-moss_green">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Total : {table.getFilteredRowModel().rows.length} project(s).
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-moss_green">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-moss_green border-pastel_moss_green border-2 shadow-none focus:ring-0">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent side="top" className="text-moss_green">
              {[5, 10, 15, 20, 50].map((pageSize) => (
                <SelectItem
                  className="focus:bg-pastel_moss_green focus:text-moss_green"
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-moss_green">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex text-moss_green border-pastel_moss_green hover:bg-pastel_moss_green hover:text-moss_green"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 text-moss_green border-pastel_moss_green hover:bg-pastel_moss_green hover:text-moss_green"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 text-moss_green border-pastel_moss_green hover:bg-pastel_moss_green hover:text-moss_green"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex text-moss_green border-pastel_moss_green hover:bg-pastel_moss_green hover:text-moss_green"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
