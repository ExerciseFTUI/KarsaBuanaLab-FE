import LabDataTable from "@/components/lab/LabDataTable";
import { getProjectLab } from "@/lib/actions/lab.action";
import { getProject } from "@/lib/actions/pplhp.actions";
import { getProjectByDivision } from "@/lib/actions/sampling.actions";

export default async function Home() {
  const res = await getProjectByDivision("Lab")

  const result = res ? (res as any) : []  

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={result} link="dashboard/" />
    </div>
  );
}
