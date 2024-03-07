import ReceiveDataTable from "@/components/receive/dataTable/ReceiveDataTable";
import { redirect } from "next/navigation";
import { getProject } from "@/lib/actions/receive.actions";
import { getPplhpByStatus } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";
import DataTable from "@/components/receive/dataTable/ReceiveDataTable";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const projects = await getPplhpByStatus("receive");
  return (
    <div className="flex flex-col w-full ">
      <ReceiveDataTable data={projects ? projects : []} />
    </div>
  );
}
