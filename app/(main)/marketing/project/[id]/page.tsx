import EditProjectPage from "@/components/marketing/editProject/EditProjectPage";
import { getProject, getSample } from "@/lib/actions/marketing.actions";
import { redirect } from "next/navigation";

const SingleProject = async ({ params }: { params: { id: string } }) => {
  const project = await getProject(params.id);

  const response = await getSample();

  if (!project || !project.result) {
    redirect("/marketing");
  }

  return (
    <EditProjectPage
      project={project.result}
      baseSamples={response ? response.result : []}
    />
  );
};

export default SingleProject;
