import PPLHPDataTable from "@/components/pplhp/PPLHPDraftDataTable";
import getSessionServer from "@/lib/actions/getSessionServer";
import { getProject } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const projects = await getPplhpByStatus("draft");
  return (
    <div className="flex justify-between w-full h-screen">
      <PPLHPDataTable data={projects ? projects : []} />
    </div>
  );
}
