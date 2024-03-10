import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/columns";

import { getbyStatus } from "@/lib/actions/marketing.actions";
import { Project } from "@/lib/models/project.model";
import { redirect } from "next/navigation";

export default async function Home() {
  const response = await getbyStatus("running");

  console.log("Data : ", response);
  
  return (
    <div className="flex justify-between w-full h-screen">
      {/* <RunningTable projects={projects.result} /> */}
      <DataTable datas={response ? response.result : []}  status="RUNNING"/>
    </div>
  );
}
