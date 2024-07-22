import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/models/user.model";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Inventory, InventoryUser } from "./InventoryType";

export const inventoryColumns: ColumnDef<Inventory>[] = [
  //Nama Tools
  {
    accessorKey: "tools_name",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("tools_name")}</div>
    ),
  },
  //Penanggung Jawab
  {
    accessorKey: "assigned_user",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Penanggung Jawab
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">
        {row.original.assigned_users.length > 0
          ? row.original.assigned_users[0].username
          : "Empty"}
      </div>
    ),
  },
  //Deadline
  {
    accessorKey: "deadline",
    header: () => {
      return (
        <Button className="w-full text-center justify-center" variant="ghost">
          Deadline
        </Button>
      );
    },

    cell: ({ row }) => {
      let deadline;
      if (row.original.deadline) {
        deadline = formatDate(row.original.deadline);
      } else {
        deadline = "Haven't set deadline yet";
      }
      // row.original.jadwal_sampling?.to || "Haven't set deadline yet";
      return <div className="capitalize text-center ">{deadline}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          className="w-full text-center justify-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Kategori
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const category =
        row.original.category !== "Tools" ? "Materials" : row.original.category;

      return (
        <div className="flex justify-center items-center w-full">
          <div
            className={`font-light text-white w-fit px-6 py-0.5 rounded-full items-center justify-center ${
              category === "Tools"
                ? "bg-yellow-700"
                : category === "Materials"
                ? "bg-blue-900"
                : "bg-moss_green"
            }`}
          >
            {category}
          </div>
        </div>
      );
    },
  },
  //Action
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original._id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/admin/inventory/${project}`}>
                View tool details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.getValue("no_penawaran"))
              }
            >
              Copy No Penawaran
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const userColumns: ColumnDef<InventoryUser>[] = [
  //Nama Tools
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
  //Penanggung Jawab
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div className="flex flex-col justify-start items-start ">
          <Button
            className="text-md"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-start items-start pl-4">
          <div className="capitalize ">{row.getValue("username")}</div>
          <div className="text-xs">{row.original.email}</div>
        </div>
      );
    },
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
];

export const userColumnsDisabled: ColumnDef<InventoryUser>[] = [
  //Nama Tools
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        disabled={true}
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
        disabled={true}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-dark_brown data-[state=checked]:bg-light_brown"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //Penanggung Jawab
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div className="flex flex-col justify-start items-start ">
          <Button
            className="text-md"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-start items-start pl-4">
          <div className="capitalize ">{row.getValue("username")}</div>
          <div className="text-xs">{row.original.email}</div>
        </div>
      );
    },
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
];

function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Options for toLocaleDateString
  const options: any = { day: "2-digit", month: "long", year: "numeric" };

  return date.toLocaleDateString("id-ID", options);
}
