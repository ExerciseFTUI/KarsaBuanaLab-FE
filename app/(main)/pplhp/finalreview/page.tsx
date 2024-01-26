import FinalReviewDataTable from "@/components/pplhp/FinalReviewDataTable";
import { getProject } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";

export default async function Home() {
  const projects = await getProject("running");
  return (
    <div className="flex justify-between w-full h-screen">
      <FinalReviewDataTable data={projects ? projects : []} />
    </div>
  );
}