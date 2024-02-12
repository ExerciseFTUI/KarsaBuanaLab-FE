import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Table as DataTable,
  RowSelectionState,
  flexRender,
} from "@tanstack/react-table"
import React from "react"

interface props {
  table: DataTable<any>
}

export function GroupUnassignedTable({ table }: props) {
  const unassigned = table
    .getRowModel()
    .rows.filter((row) => row.getIsSelected() == false)

  return (
    <div id="unassigned-table" className="px-6">
      <div className="flex items-center justify-end space-x-2 py-4">
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
                )
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
    </div>
  )
}
