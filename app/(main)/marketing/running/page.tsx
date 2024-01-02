import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";
import RunningTable from "@/components/marketing/Tables/RunningTable";

import { getbyStatus } from "@/lib/actions/marketing.actions";
import { Project } from "@/lib/models/project.model";

export default async function Home() {
  const projects = await getbyStatus("running");

  return (
    <div className="flex justify-between w-full h-screen">
      <RunningTable projects={projects.result} />
    </div>
  );
}
