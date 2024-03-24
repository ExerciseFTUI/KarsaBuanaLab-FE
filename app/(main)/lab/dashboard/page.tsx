import LabDataTable from "@/components/lab/LabDataTable";
import { getProjectLab } from "@/lib/actions/lab.action";
import { getProject } from "@/lib/actions/pplhp.actions";

export default async function Home() {
  const projects = await getProjectLab();

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={projects ? projects : []} link="dashboard/" />
    </div>
  );
}
