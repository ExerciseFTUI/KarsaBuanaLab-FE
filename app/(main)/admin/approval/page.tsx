import { getbyStatus } from "@/lib/actions/approval.actions";
import { DataTable } from "@/components/DataTable";
import React from "react";
import { ApprovalDataTable } from "@/components/auth/approval/ApprovalDataTable";
import { getAllApprovalProject } from "@/lib/actions/approval.action";

export default async function Approval() {
  const response: any = await getAllApprovalProject();

  return (
    <div>
      <div className="flex justify-between w-full h-screen">
        {/* <RunningTable projects={projects.result} /> */}
        <ApprovalDataTable datas={response ? response.projects : []} />
      </div>
    </div>
  );
}
