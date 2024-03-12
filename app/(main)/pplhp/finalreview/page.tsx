import FinalReviewDataTable from "@/components/pplhp/FinalReviewDataTable";
import { getProject, getPplhpByStatus } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const projects = await getPplhpByStatus("review");
  return (
    <div className="flex justify-between w-full h-screen">
      <FinalReviewDataTable data={projects ? projects : []} />
    </div>
  );
}
