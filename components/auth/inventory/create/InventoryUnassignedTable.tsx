"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Table as DataTable,
  RowSelectionState,
  flexRender,
} from "@tanstack/react-table";
import React from "react";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryUnAssignedTableProps {
  table: DataTable<any>;
}

const InventoryUnAssignedTable: FC<InventoryUnAssignedTableProps> = ({
  table,
}) => {
  const unassigned = table
    .getRowModel()
    .rows.filter((row) => row.getIsSelected() == false);

  return (
    <div id="unassigned-table" className="px-6">
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-base text-light_brown">
          Unassigned:{" "}
          {table.getCoreRowModel().rows.length -
            table.getFilteredSelectedRowModel().rows.length}{" "}
        </div>
      </div>

      <Table className="text-base text-light_brown">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-light_brown hover:bg-light_green hover:bg-opacity-5"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-center  text-light_brown"
                  >
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
          {unassigned.length ? (
            unassigned.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-light_brown hover:bg-light_green hover:bg-opacity-5 data-[state=selected]:bg-light_green data-[state=selected]:bg-opacity-5"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center"
              >
                All assigned.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Bottom Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4 max-sm:flex-col gap-5">
        <div className="flex-1 text-sm text-moss_green">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Total :{" "}
          {table.getCoreRowModel().rows.length -
            table.getFilteredSelectedRowModel().rows.length}
          row(s).
        </div>

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium text-moss_green">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px] text-moss_green border-pastel_moss_green border-2 shadow-none focus:ring-0">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="text-moss_green">
              {[5, 10, 15].map((pageSize) => (
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
  );
};

export default InventoryUnAssignedTable;
