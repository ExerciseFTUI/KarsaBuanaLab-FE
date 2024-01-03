import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";

import { getbyStatus } from "@/lib/actions/marketing.actions";
import { Project } from "@/lib/models/project.model";
import { redirect } from "next/navigation";

export default async function Home() {
  const projects = await getbyStatus("running");

  if (!projects.result) {
    redirect("/marketing");
  }

  return (
    <div className="flex justify-between w-full h-screen">
      {/* <RunningTable projects={projects.result} /> */}
      <DataTable datas={projects.result} />
    </div>
  );
}
