"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import {
  ReceiveSamplingType,
  ProjectLHPType,
  LabDataType,
  ProjectType,
  ProjectMarketingType,
  UserType,
  ProjectAdminPplhpType,
} from "@/lib/type";
import Link from "next/link";
import { ProjectSamplingType } from "@/lib/type";
import { PplhpDetail } from "./auth/pplhp/PplhpType";

// Table Column for Marketing OnDiscuss
export const columns: ColumnDef<ProjectMarketingType>[] = [
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
        row.original.current_division !== "SAMPLING"
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
  {
    accessorKey: "jadwal_sampling.to",
    header: () => {
      return (
        <Button className="w-full text-center justify-center" variant="ghost">
          Deadline
        </Button>
      );
    },

    cell: ({ row }) => {
      // Check if jadwal_sampling and deadline_lhp exist and have 'from' and 'to' properties
      const jadwalSampling = row.original.jadwal_sampling;
      const deadlineLHP = row.original.deadline_lhp;

      const deadline =
        row.original.current_division === "SAMPLING" && jadwalSampling
          ? `${jadwalSampling.to || "Haven't set deadline yet"}`
          : `${deadlineLHP?.to || "Haven't set deadline yet"}`;

      return <div className="capitalize text-center">{deadline}</div>;
    },
  },
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

export const columnsFinished: ColumnDef<ProjectMarketingType>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button className="pl-6" variant="ghost">
          Status
        </Button>
      );
    },

    cell: ({ row }) => {
      const status = true;

      return (
        <div className="flex justify-center items-center w-full">
          <div
            className={`font-light text-white w-fit px-6 py-0.5 rounded-full items-center justify-center ${
              status === "SAMPLING" ? "bg-yellow-700" : status === "ANALYSIS" ? "bg-blue-900" : "bg-moss_green"
            }`}
          >
            {status}
          </div>
        </div>
      );
    },
  },
  //Deadline
  {
    accessorKey: "alamat_sampling",
    header: "Lokasi Sampling",
    cell: ({ row }) => {
      const deadline = row.original.jadwal_sampling?.to || "Haven't set deadline yet";
      return (
        <div className="capitalize text-center ">
          {deadline}
        </div>
      );
    },
  },
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

// Table Column for Admin Page
export const adminColumns: ColumnDef<UserType>[] = [
  //No Penawaran
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className=""
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("email")}</div>
    ),
  },
  //Status
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button className="pl-6" variant="ghost">
          Role
        </Button>
      );
    },

    cell: ({ row }) => {
      const status = true;

      return (
        <div className="">
          <div
            className={`font-light text-white w-fit px-6 py-0.5 rounded-full ${
              status ? "bg-yellow-700" : "bg-red-400"
            }`}
          >
            {row.getValue("role")}
          </div>
        </div>
      );
    },
  },
  //Lokasi
  {
    accessorKey: "division",
    header: "Division",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("division")}</div>
      );
    },
  },
  //createdAt
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Created At
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },

  //   cell: ({ row }) => {
  //     const date = new Date(row.getValue("created_at"));

  //     let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  //     let day = date.getDate().toString().padStart(2, "0");
  //     let year = date.getFullYear();

  //     let formattedDate = month + "/" + day + "/" + year;
  //     return <div className={`font-medium pl-4`}>{formattedDate}</div>;
  //   },
  // },
  //Last Update
  // {
  //   accessorKey: "lastUpdate",
  //   header: () => (
  //     <div className={`pl-2 font-medium text-[#666D4B]`}>Last Update</div>
  //   ),

  //   cell: ({ row }) => {
  //     return <div className={`pl-4 font-medium`}>Today</div>;
  //   },
  // },
  //Action
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userId = row.original.id;

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
              <Link href={`/admin/${userId}`}>View user details</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.getValue("email"))
              }
            >
              Copy Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

//Table Column for PPLHP Admin Page
export const pplhpColumns: ColumnDef<PplhpDetail>[] = [
  //No Penawaran
  // {
  //   accessorKey: "no_penawaran",
  //   header: "No Penawaran",
  //   cell: ({ row }) => <div className="">{row.getValue("no_penawaran")}</div>,
  // },
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
      const status = "SAMPLING";
      // row.original.current_division !== "SAMPLING"
      //   ? "ANALYSIS"
      //   : row.original.current_division;

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
  {
    accessorKey: "jadwal_sampling.to",
    header: () => {
      return (
        <Button className="w-full text-center justify-center" variant="ghost">
          Deadline
        </Button>
      );
    },

    cell: ({ row }) => {
      const deadline = "Haven't set deadline yet";
      // row.original.jadwal_sampling?.to || "Haven't set deadline yet";
      return <div className="capitalize text-center ">{deadline}</div>;
    },
  },
  //Number Of Document
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Number Of Document
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const documents = row.original.lab_files.length;

      return <div className={`font-medium pl-4`}>{documents}</div>;
    },
  },

  //Action
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const project = row.original.projectID;

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
              <Link href={`/admin/pplhp/${project}`}>View project details</Link>
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

// Table for cancelled project
export const columnsCancelled: ColumnDef<ProjectMarketingType>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button className="pl-6" variant="ghost">
          Status
        </Button>
      );
    },

    cell: ({ row }) => {
      const status = true;

      return (
        <div className="">
          <div
            className={`font-light text-white w-fit px-6 py-0.5 rounded-full ${
              status ? "bg-yellow-700" : "bg-red-400"
            }`}
          >
            {row.getValue("status")}
          </div>
        </div>
      );
    },
  },

  //Reason project cancelled
  {
    accessorKey: "desc_failed",
    header: ({ column }) => {
      return (
        <Button className="flex flex-row w-full justify-center" variant="ghost">
          Cancelled Description
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5 overflow-x-clip">
          {row.getValue("desc_failed")}
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

//Table Column for Penerima Sampling
export const receiveProjectPageColumns: ColumnDef<ProjectType>[] = [
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
      );
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
      );
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
      );
    },
  },
  // Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const stat = row.getValue("status");

      const color =
        stat == "Need Schedule" || stat == "Get Sample"
          ? "bg-moss_green"
          : stat == "On Discuss" || stat == "Verifying"
          ? "bg-light_brown"
          : "bg-brick_red";

      return (
        <div
          className={
            "px-4 py-1.5 inline-block min-w-[8rem] rounded-full text-ghost_white " +
            color
          }
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
];

// Table Column for Sampling Project
export const samplingProjectPageColumns: ColumnDef<ProjectSamplingType>[] = [
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
      );
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
      );
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
      );
    },
  },
  // Status
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: any = row.getValue("status");

      const color =
        status == "Need Schedule" || status == "Get Sample"
          ? "bg-moss_green"
          : status == "On Discuss" || status == "Verifying"
          ? "bg-light_brown"
          : "bg-brick_red";

      return (
        <div
          className={
            "px-4 py-1.5 inline-block min-w-[8rem] rounded-full text-ghost_white " +
            color
          }
        >
          {status}
        </div>
      );
    },
  },
];

// Table Column for Receive Project
export const receiveSamplingColumns: ColumnDef<ReceiveSamplingType>[] = [
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
          className="italic hover:bg-transparent hover:text-pastel_moss_green"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Project
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
    accessorKey: "alamat_sampling",
    header: "Lokasi Pengambilan Sampel",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("alamat_sampling")}
        </div>
      );
    },
  },
  //Lokasi
  {
    accessorKey: "alamat_kantor",
    header: "Lokasi",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("alamat_kantor")}</div>
      );
    },
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("contact_person")}
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
  },
];

export const LHPDraftPageColumns: ColumnDef<ProjectLHPType>[] = [
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
          className="italic hover:bg-transparent hover:text-pastel_moss_green"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Project
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
    accessorKey: "alamat_sampling",
    header: "Lokasi Pengambilan Sampel",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("alamat_sampling")}
        </div>
      );
    },
  },
  //Lokasi
  {
    accessorKey: "alamat_kantor",
    header: "Lokasi",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("alamat_kantor")}</div>
      );
    },
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("contact_person")}
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
  },
];

export const PPLHPFinalReviewPageColumns: ColumnDef<ProjectLHPType>[] = [
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
          className="italic"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Project
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
    accessorKey: "alamat_sampling",
    header: "Lokasi Pengambilan Sampel",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("alamat_sampling")}
        </div>
      );
    },
  },
  //Lokasi
  {
    accessorKey: "alamat_kantor",
    header: "Lokasi",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">{row.getValue("alamat_kantor")}</div>
      );
    },
  },
  {
    accessorKey: "contact_person",
    header: "Contact Person",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("contact_person")}
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
  },
];

export const LabDashboardPageColumns: ColumnDef<LabDataType>[] = [
  // No Penawaran
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
          className="italic text-moss_green"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul Project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("project_name")}</div>
    ),
  },
  //Lokasi
  {
    accessorKey: "alamat_sampling",
    header: "Lokasi",
    cell: ({ row }) => {
      return (
        <div className="capitalize pl-0.5">
          {row.getValue("alamat_sampling")}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "contact_person",
  //   header: "Contact Person",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="capitalize pl-0.5">
  //         {row.getValue("contact_person")}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "lab_status",
    header: "Status",
    cell: ({ row }) => {
      var color = "bg-moss_green";
      if (row.getValue("lab_status") === "RECEIVE") {
        color = "bg-yellow-700";
      } else if (row.getValue("lab_status") === "IN REVIEW BY ADMIN") {
        color = "bg-blue-900";
      } else if (row.getValue("lab_status") === "REVISION") {
        color = "bg-red-400";
      }

      return (
        <div
          className={`capitalize  text-white rounded-md w-fit px-2 text-center flex font-semibold ${color}`}
        >
          {row.getValue("lab_status")}
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
  },
];
