import EditProjectPage from "@/components/marketing/editProject/EditProjectPage";
import { getProject } from "@/lib/actions/marketing.actions";
import { redirect } from "next/navigation";

const SingleProject = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);

  if (!project || !project.result) {
    redirect("/marketing");
  }

  return <EditProjectPage project={project.result} />;
};

export default SingleProject;
