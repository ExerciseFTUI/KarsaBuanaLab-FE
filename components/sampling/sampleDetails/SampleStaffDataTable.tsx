import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { staffSampleListColumns } from "../sampleListDataTables/DataTableColumns"
import useSWR from "swr"
import { getSampleByAccount } from "@/lib/actions/sampling.actions"

export function SampleStaffDataTable() {
  const { data, error, isLoading } = useSWR(["2023", "2"], ([year, accountId]) => getSampleByAccount(year, accountId))

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Sample not found!</div>

  const table = useReactTable({
    data: data.result,
    columns: staffSampleListColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="border-light_brown border-2 rounded-xl">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow className="hover:bg-transparent" key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className="text-center text-light_brown font-semibold"
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
              className="hover:bg-pastel_moss_green ease-in-out duration-500 text-sm hover:cursor-pointer hover:rounded-xl text-center"
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
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
            <TableCell
              colSpan={staffSampleListColumns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
