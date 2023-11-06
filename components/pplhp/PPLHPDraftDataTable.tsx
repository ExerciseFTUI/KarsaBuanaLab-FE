"use client";
import * as React from "react";
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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { BiFilterAlt } from "react-icons/bi";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { LHPDraftPageColumns, columns } from "@/components/columns";
import { ProjectLHPType } from "@/lib/type";

// Create an array of 15 objects with the specified type
const data: ProjectLHPType[] = [
  {
    id: "1",
    noPenawaran: "PNW1",
    judul: "Project 1 daaaa",
    cp: "Contact Person 1",
    lokasi: "Location 1 dad",
    lokasiPengambilanSampel: "Jl kukusan",
  },
  {
    id: "2",
    noPenawaran: "PNW2",
    judul: "Project 2",
    cp: "Contact Person 2",
    lokasi: "Location 2",
    lokasiPengambilanSampel: "Jl. Mawar",
  },
  {
    id: "3",
    noPenawaran: "PNW3",
    judul: "Project 3",
    cp: "Contact Person 3",
    lokasi: "Location 3",
    lokasiPengambilanSampel: "Jl. Kenari",
  },
  {
    id: "4",
    noPenawaran: "PNW4",
    judul: "Project 4",
    cp: "Contact Person 4",
    lokasi: "Location 4",
    lokasiPengambilanSampel: "Jl. Melati",
  },
  {
    id: "5",
    noPenawaran: "PNW5",
    judul: "Project 5",
    cp: "Contact Person 5",
    lokasi: "Location 5",
    lokasiPengambilanSampel: "Jl. Dahlia",
  },
  {
    id: "6",
    noPenawaran: "PNW6",
    judul: "Project 6",
    cp: "Contact Person 6",
    lokasi: "Location 6",
    lokasiPengambilanSampel: "Jl. Anggrek",
  },
  {
    id: "7",
    noPenawaran: "PNW7",
    judul: "Project 7",
    cp: "Contact Person 7",
    lokasi: "Location 7",
    lokasiPengambilanSampel: "Jl. Kenanga",
  },
  {
    id: "8",
    noPenawaran: "PNW8",
    judul: "Project 8",
    cp: "Contact Person 8",
    lokasi: "Location 8",
    lokasiPengambilanSampel: "Jl. Cempaka",
  },
  {
    id: "9",
    noPenawaran: "PNW9",
    judul: "Project 9",
    cp: "Contact Person 9",
    lokasi: "Location 9",
    lokasiPengambilanSampel: "Jl. Surya",
  },
  {
    id: "10",
    noPenawaran: "PNW10",
    judul: "Project 10",
    cp: "Contact Person 10",
    lokasi: "Location 10",
    lokasiPengambilanSampel: "Jl. Pelangi",
  },
  {
    id: "11",
    noPenawaran: "PNW11",
    judul: "Project 11",
    cp: "Contact Person 11",
    lokasi: "Location 11",
    lokasiPengambilanSampel: "Jl. Matahari",
  },
  {
    id: "12",
    noPenawaran: "PNW12",
    judul: "Project 12",
    cp: "Contact Person 12",
    lokasi: "Location 12",
    lokasiPengambilanSampel: "Jl. Bunga",
  },
  {
    id: "13",
    noPenawaran: "PNW13",
    judul: "Project 13",
    cp: "Contact Person 13",
    lokasi: "Location 13",
    lokasiPengambilanSampel: "Jl. Nusa Indah",
  },
  {
    id: "14",
    noPenawaran: "PNW14",
    judul: "Project 14",
    cp: "Contact Person 14",
    lokasi: "Location 14",
    lokasiPengambilanSampel: "Jl. Bumi Damai",
  },
  {
    id: "15",
    noPenawaran: "PNW15",
    judul: "Project 15",
    cp: "Contact Person 15",
    lokasi: "Location 15",
    lokasiPengambilanSampel: "Jl. Purnama",
  },
  {
    id: "16",
    noPenawaran: "PNW16",
    judul: "Project 16",
    cp: "Contact Person 16",
    lokasi: "Location 16",
    lokasiPengambilanSampel: "Jl. Taman Sari",
  },
  {
    id: "17",
    noPenawaran: "PNW17",
    judul: "Project 17",
    cp: "Contact Person 17",
    lokasi: "Location 17",
    lokasiPengambilanSampel: "Jl. Harmoni",
  },
  {
    id: "18",
    noPenawaran: "PNW18",
    judul: "Project 18",
    cp: "Contact Person 18",
    lokasi: "Location 18",
    lokasiPengambilanSampel: "Jl. Seruni",
  },
  {
    id: "19",
    noPenawaran: "PNW19",
    judul: "Project 19",
    cp: "Contact Person 19",
    lokasi: "Location 19",
    lokasiPengambilanSampel: "Jl. Rafflesia",
  },
  {
    id: "20",
    noPenawaran: "PNW20",
    judul: "Project 20",
    cp: "Contact Person 20",
    lokasi: "Location 20",
    lokasiPengambilanSampel: "Jl. Flamboyan",
  }
];

export function PPLHPDataTable() {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: LHPDraftPageColumns,
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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <BiFilterAlt className="text-xl translate-x-8"/>
        <Input
          placeholder="Filter Projects On LHP Draft"
          value={(table.getColumn("judul")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("judul")?.setFilterValue(event.target.value)
          }
          className="max-w-sm pl-10"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className=" text-moss_green">
        <Table className="italic font-dm-sans">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="italic" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-[#c2c5aa]">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:bg-light_green ease-in-out duration-500 text-xs hover:cursor-pointer hover:rounded-xl"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // onClick={() =>
                  //   router.push("lhpdraft/sampel/" + row.getValue("noPenawaran"))
                  // }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 max-sm:flex-col gap-5">
        <div className="flex-1 text-sm text-moss_green">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Total : {table.getFilteredRowModel().rows.length} row(s).
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-dark_green">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 15, 20, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-dark_green">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
