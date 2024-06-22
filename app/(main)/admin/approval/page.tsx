import { getbyStatus } from "@/lib/actions/approval.actions";
import { DataTable } from "@/components/DataTable";
import React from "react";
import { ApprovalDataTable } from "@/components/auth/approval/ApprovalDataTable";

export default async function Approval() {
  const response = await getbyStatus("running");

  return (
    <div>
      <div className="flex justify-between w-full h-screen">
        {/* <RunningTable projects={projects.result} /> */}
        <ApprovalDataTable
          datas={response ? response.result : []}
          status="RUNNING"
        />
      </div>
    </div>
  );
}
