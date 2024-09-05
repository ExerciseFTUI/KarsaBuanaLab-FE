import { ColumnDef } from "@tanstack/react-table";
import { ApprovalProject } from "./ApprovalType";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const approvalColumn: ColumnDef<ApprovalProject>[] = [
  //No Penawaran
  {
    accessorKey: "no_penawaran",
    header: "No Penawaran",
    cell: ({ row }) => <div className="">{row.getValue("no_penawaran")}</div>,
  },
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("project_name")}</div>
    ),
  },
  //Status
  {
    accessorKey: "current_division",
    header: ({ column }) => {
      return (
        <Button
          className="w-full text-center justify-center"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Progres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const status =
        row.original.current_division === "LAB" ||
        row.original.current_division === "PPLHP"
          ? "ANALYSIS"
          : row.original.current_division;

      return (
        <div className="flex justify-center items-center w-full">
          <div
            className={`font-light text-white w-fit px-6 py-0.5 rounded-full items-center justify-center ${
              status === "SAMPLING"
                ? "bg-yellow-700"
                : status === "ANALYSIS"
                ? "bg-blue-900"
                : "bg-moss_green"
            }`}
          >
            {status}
          </div>
        </div>
      );
    },
  },
  //Deadline
  //   {
  //     accessorKey: "jadwal_sampling.to",
  //     header: () => {
  //       return (
  //         <Button className="w-full text-center justify-center" variant="ghost">
  //           Deadline
  //         </Button>
  //       );
  //     },

  //     cell: ({ row }) => {
  //     //   Check if jadwal_sampling and deadline_lhp exist and have 'from' and 'to' properties
  //       const jadwalSampling = row.original.jadwal_sampling;
  //       const deadlineLHP = row.original.deadline_lhp;

  //       const deadline =
  //         row.original.current_division === "SAMPLING" && jadwalSampling
  //           ? `${
  //               jadwalSampling.to ||
  //               jadwalSampling.from ||
  //               "Haven't set deadline yet"
  //             }`
  //           : `${
  //               deadlineLHP?.to || deadlineLHP?.from || "Haven't set deadline yet"
  //             }`;

  //       return <div className="capitalize text-center">{"Deadline"}</div>;
  //     },
  //   },
  //createdAt
  {
    accessorKey: "created_at",
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
      const date = new Date(row.getValue("created_at"));

      let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      let day = date.getDate().toString().padStart(2, "0");
      let year = date.getFullYear();

      let formattedDate = month + "/" + day + "/" + year;
      return <div className={`font-medium pl-4`}>{formattedDate}</div>;
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
              <Link
                href={`/marketing/project/${row.original.status}/${project}`}
              >
                View project details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.getValue("no_penawaran"))
              }
            >
              Copy No Penawaran
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
