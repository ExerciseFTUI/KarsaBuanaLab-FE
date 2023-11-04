"use client"
import * as React from "react"
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
import { samplingLetterPageColumns } from "@/components/columns"
import { ProjectSamplingType, ProjectType } from "@/lib/type"
import { cn } from "@/lib/utils"

// Create an array of 15 objects with the specified type
const data: ProjectSamplingType[] = [
  {
    id: "1",
    noPenawaran: "PNW1",
    judul: "Project 1 daaaa",
    namaCustomer: "Customer A",
    lokasi: "Location 1 dad",
    cp: "Contact Person 1",
    nilaiPenawaran: 10000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "2",
    noPenawaran: "PNW2",
    judul: "Project 2",
    namaCustomer: "Customer B",
    lokasi: "Location 2",
    cp: "Contact Person 2",
    nilaiPenawaran: 15000,
    createdAt: "2023-10-14",
    status: "Revision",
  },
  {
    id: "3",
    noPenawaran: "PNW3",
    judul: "Project 3",
    namaCustomer: "Customer C",
    lokasi: "Location 3",
    cp: "Contact Person 3",
    nilaiPenawaran: 20000,
    createdAt: "2023-10-14",
    status: "Revision",
  },
  {
    id: "4",
    noPenawaran: "PNW4",
    judul: "Project 4",
    namaCustomer: "Customer D",
    lokasi: "Location 4",
    cp: "Contact Person 4",
    nilaiPenawaran: 25000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "5",
    noPenawaran: "PNW5",
    judul: "Project 5",
    namaCustomer: "Customer E",
    lokasi: "Location 5",
    cp: "Contact Person 5",
    nilaiPenawaran: 30000,
    createdAt: "2023-10-14",
    status: "Verifying",
  },
  {
    id: "6",
    noPenawaran: "PNW6",
    judul: "Project 6",
    namaCustomer: "Customer F",
    lokasi: "Location 6",
    cp: "Contact Person 6",
    nilaiPenawaran: 35000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "7",
    noPenawaran: "PNW7",
    judul: "Project 7",
    namaCustomer: "Customer G",
    lokasi: "Location 7",
    cp: "Contact Person 7",
    nilaiPenawaran: 40000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "8",
    noPenawaran: "PNW8",
    judul: "Project 8",
    namaCustomer: "Customer H",
    lokasi: "Location 8",
    cp: "Contact Person 8",
    nilaiPenawaran: 45000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "9",
    noPenawaran: "PNW9",
    judul: "Project 9",
    namaCustomer: "Customer I",
    lokasi: "Location 9",
    cp: "Contact Person 9",
    nilaiPenawaran: 50000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "10",
    noPenawaran: "PNW10",
    judul: "Project 10",
    namaCustomer: "Customer J",
    lokasi: "Location 10",
    cp: "Contact Person 10",
    nilaiPenawaran: 55000,
    createdAt: "2023-10-14",
    status: "Verifying",
  },
  {
    id: "11",
    noPenawaran: "PNW11",
    judul: "Project 11",
    namaCustomer: "Customer K",
    lokasi: "Location 11",
    cp: "Contact Person 11",
    nilaiPenawaran: 60000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "12",
    noPenawaran: "PNW12",
    judul: "Project 12",
    namaCustomer: "Customer L",
    lokasi: "Location 12",
    cp: "Contact Person 12",
    nilaiPenawaran: 65000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "13",
    noPenawaran: "PNW13",
    judul: "Project 13",
    namaCustomer: "Customer M",
    lokasi: "Location 13",
    cp: "Contact Person 13",
    nilaiPenawaran: 70000,
    createdAt: "2024-10-14",
    status: "Get Sample",
  },
  {
    id: "14",
    noPenawaran: "PNW14",
    judul: "Project 14",
    namaCustomer: "Customer N",
    lokasi: "Location 14",
    cp: "Contact Person 14",
    nilaiPenawaran: 75000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
  {
    id: "15",
    noPenawaran: "PNW15",
    judul: "Project 15",
    namaCustomer: "Customer O",
    lokasi: "Location 15",
    cp: "Contact Person 15",
    nilaiPenawaran: 80000,
    createdAt: "2023-10-14",
    status: "Get Sample",
  },
]

export function DataTable() {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [statusFilter, setStatusFilter] = React.useState("")

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns: samplingLetterPageColumns,
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

  return (
    <div className="w-full">
      {/* Top Search Title */}
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
                    router.push(
                      "assignmentletter/" + row.getValue("noPenawaran")
                    )
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="py-4" key={cell.id}>
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
                  colSpan={samplingLetterPageColumns.length}
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
          Total : {table.getFilteredRowModel().rows.length} row(s).
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
