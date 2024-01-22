"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { User } from "@/lib/models/user.model"
import { Project } from "@/lib/models/project.model"
import { Sampling } from "@/lib/models/sampling.model"

// Table Column for Sampling Project
export const samplingProjectPageColumns: ColumnDef<Sampling>[] = [
  // Sample Name
  {
    accessorKey: "sample_name",
    header: ({ column }) => {
      return (
        <Button
          className="font-light hover:bg-transparent italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Sampel
          <ArrowUpDown strokeWidth={1.5} className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("sample_name")}</div>
    ),
  },
  {
    accessorKey: "jadwal",
    header: ({ column }) => {
      return (
        <Button
          className="font-light hover:bg-transparent italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jadwal
          <ArrowUpDown strokeWidth={1.5} className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const jadwal = new Date(row.getValue("jadwal")).toUTCString()

      return <div className="capitalize pl-4">{jadwal}</div>
    },
  },
  //Lokasi
  {
    accessorKey: "location",
    header: "Lokasi",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("location")}</div>
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
        status == "FINISHED" || status == "Get Sample"
          ? "bg-moss_green"
          : status == "ASSIGNED" || status == "Verifying"
          ? "bg-light_brown"
          : "bg-brick_red"

      return (
        <div
          className={
            "px-4 py-1.5 inline-block min-w-[8rem] rounded-full text-ghost_white text-xs " +
            color
          }
        >
          {status}
        </div>
      )
    },
  },
]

export const samplingLetterPageColumns: ColumnDef<Sampling>[] = [
  // Sample Name
  {
    accessorKey: "sample_name",
    header: ({ column }) => {
      return (
        <Button
          className="font-light hover:bg-transparent italic text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Sampel
          <ArrowUpDown strokeWidth={1.5} className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4 text-base">{row.getValue("sample_name")}</div>
    ),
  },
  {
    accessorKey: "jadwal",
    header: ({ column }) => {
      return (
        <Button
          className="font-light hover:bg-transparent italic text-base"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jadwal
          <ArrowUpDown strokeWidth={1.5} className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const jadwal = new Date(row.getValue("jadwal")).toUTCString()

      return <div className="capitalize pl-4 text-base">{jadwal}</div>
    },
  },
  //Lokasi
  {
    accessorKey: "location",
    header: () => <p className="text-base">Lokasi</p>,
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5 text-base">{row.getValue("location")}</div>
      )
    },
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
