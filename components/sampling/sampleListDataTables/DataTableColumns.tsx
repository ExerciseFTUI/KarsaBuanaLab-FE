"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { User } from "@/lib/models/user.model"
import { Project } from "@/lib/models/project.model"
import { Sampling } from "@/lib/models/sampling.model"

// Table Column for Sampling Project
export const samplingProjectPageColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "no_penawaran",
    header: "No Penawaran",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("no_penawaran")}</div>
    ),
  },
  {
    accessorKey: "project_name",
    header: "Nama Project",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("project_name")}</div>
    ),
  },
  {
    accessorKey: "no_sampling",
    header: "No Sampling",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("no_sampling")}</div>
    ),
  },
  {
    accessorKey: "alamat_sampling",
    header: "Alamat",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("alamat_sampling")}</div>
    ),
  },
]

export const samplingLetterPageColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "no_penawaran",
    header: "No Penawaran",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("no_penawaran")}</div>
    ),
  },
  {
    accessorKey: "project_name",
    header: "Nama Project",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("project_name")}</div>
    ),
  },
  {
    accessorKey: "no_sampling",
    header: "No Sampling",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("no_sampling")}</div>
    ),
  },
  {
    accessorKey: "alamat_sampling",
    header: "Alamat",
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("alamat_sampling")}</div>
    ),
  },
]

export const groupUserSelectableColumns: ColumnDef<User>[] = [
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

export const groupUserStaffColumns: ColumnDef<User>[] =
  groupUserSelectableColumns.slice(1, groupUserSelectableColumns.length)

export const staffGroupListColumns: ColumnDef<User>[] = [
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

export const staffSampleListColumns: ColumnDef<Sampling>[] = [
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
