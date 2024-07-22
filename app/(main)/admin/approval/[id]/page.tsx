import {
  getProject as approvalGetProject,
  getSample as approvalGetSample,
} from "@/lib/actions/approval.actions";
import EditProjectPage from "@/components/marketing/editProject/EditProjectPage";

import { redirect } from "next/navigation";
import ApprovalEditProjectPage from "@/components/auth/approval/ApprovalEditProject";

const ApprovalSingleProject = async ({
  params,
}: {
  params: { id: string; status: string };
}) => {
  const project = await approvalGetProject(params.id);

  const response = await approvalGetSample();

  if (!project || !project.result) {
    redirect("/admin/approval");
  }

  return (
    <ApprovalEditProjectPage
      project={project.result}
      baseSamples={response ? response.result : []}
      status={params.status}
    />
  );
};

export default ApprovalSingleProject;
