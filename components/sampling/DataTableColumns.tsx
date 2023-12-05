"use client"

import { BaseSampleType, ProjectType, UserType } from "@/lib/type"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Table Column for Sampling Project
export const samplingProjectPageColumns: ColumnDef<ProjectType>[] = [
  //No Penawaran
  {
    accessorKey: "no_penawaran",
    header: "No Penawaran",
    cell: ({ row }) => <div className="">{row.getValue("no_penawaran")}</div>,
  },
  // Project Title
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return (
        <Button
          className="font-light hover:bg-transparent italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Title
          <ArrowUpDown strokeWidth={1.5} className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("project_name")}</div>
    ),
  },
  //Lokasi
  {
    accessorKey: "alamat_kantor",
    header: "Lokasi",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("alamat_kantor")}</div>
      )
    },
  },
  //Contact Person
  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("contact_person")}
        </div>
      )
    },
  },
  // Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: any = row.getValue("status")

      const color =
        status == "Need Schedule" || status == "Get Sample"
          ? "bg-moss_green"
          : status == "On Discuss" || status == "Verifying"
          ? "bg-light_brown"
          : "bg-brick_red"

      return (
        <div
          className={
            "px-4 py-1.5 inline-block min-w-[8rem] rounded-full text-ghost_white " +
            color
          }
        >
          {status}
        </div>
      )
    },
  },
]

export const samplingLetterPageColumns: ColumnDef<ProjectType>[] =
  samplingProjectPageColumns.slice(0, -1)

export const groupUserSelectableColumns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-dark_brown data-[state=checked]:bg-light_brown"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-dark_brown data-[state=checked]:bg-light_brown"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "division",
    header: "Role",
    cell: ({ row }) => <div className="">{row.getValue("division")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
  },
]

export const groupUserStaffColumns: ColumnDef<UserType>[] =
  groupUserSelectableColumns.slice(1, groupUserSelectableColumns.length)

export const staffGroupListColumns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-light_brown text-sm">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="text-light_brown text-sm">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-light_brown text-sm">{row.getValue("phone")}</div>
    ),
  },
]

export const staffSampleListColumns: ColumnDef<BaseSampleType>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => (
      <div className="text-light_brown">{Number.parseInt(row.id) + 1}</div>
    ),
  },
  {
    accessorKey: "sample_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-light_brown">{row.getValue("sample_name")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="text-light_brown">{row.getValue("amount")} mL</div>
    ),
  },
]
