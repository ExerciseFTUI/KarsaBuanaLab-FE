import { DataTable } from "@/components/receive/dataTable/ReceiveDataTable";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/actions/receive.actions";
import { Project } from "@/lib/models/project.model";

export default async function Home() {
  const projects = await getProject("running");
  return (
    <div className="flex flex-col w-full ">
      <DataTable data={projects} />
    </div>
  );
}
