"use client";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";
import { Project } from "@/lib/models/project.model";
import { FC } from "react";

interface RunningTableProps {
  projects: Project[];
}

const RunningTable: FC<RunningTableProps> = ({ projects }) => {
  return <DataTable datas={projects} columns={columns} />;
};

export default RunningTable;
