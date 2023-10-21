import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { ProjectType } from "@/lib/type";

export const columns: ColumnDef<ProjectType>[] = [
  //No Penawaran
  {
    accessorKey: "noPenawaran",
    header: "No Penawaran",
    cell: ({ row }) => <div className="">{row.getValue("noPenawaran")}</div>,
  },
  {
    accessorKey: "judul",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("judul")}</div>
    ),
  },
  //Status
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <Button variant="ghost">Status</Button>;
    },

    cell: ({ row }) => {
      const status = true;
      console.log(row.original);
      return (
        <div className="pl-3">
          <div
            className={`font-light text-white w-fit px-6 py-0.5 rounded-full ${
              status ? "bg-yellow-700" : "bg-red-400"
            }`}
          >
            Available
          </div>
        </div>
      );
    },
  },
  //Lokasi
  {
    accessorKey: "lokasi",
    header: "Lokasi",
    cell: ({ row }) => {
      return <div className="capitalize pl-0.5">{row.getValue("lokasi")}</div>;
    },
  },
  //createdAt
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      let day = date.getDate().toString().padStart(2, "0");
      let year = date.getFullYear();

      let formattedDate = month + "/" + day + "/" + year;
      return <div className={`font-medium pl-4`}>{formattedDate}</div>;
    },
  },
  //Last Update
  {
    accessorKey: "lastUpdate",
    header: () => (
      <div className={`pl-2 font-medium text-[#666D4B]`}>Last Update</div>
    ),

    cell: ({ row }) => {
      return <div className={`pl-4 font-medium`}>Today</div>;
    },
  },
  //Action
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const project = row.original;
      // console.log(row.original);

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
            <DropdownMenuItem onClick={() => router.push(`/project/${row.id}`)}>
              View project details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(project.noPenawaran)}
            >
              Copy No Penawaran
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
