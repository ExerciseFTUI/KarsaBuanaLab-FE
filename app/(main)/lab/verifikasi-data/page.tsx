import LabDataTable from "@/components/lab/LabDataTable";
import { getLabProjects } from "@/lib/actions/lab.actions";
import { getProject } from "@/lib/actions/pplhp.actions";
import { getProjectByDivision } from "@/lib/actions/sampling.actions";

export default async function Home() {
  const res = await getLabProjects();

  const data = !!res
    ? res.result.filter((p: any) => p.lab_status === "IN REVIEW BY SPV")
    : [];

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={data} link="verifikasi-data/" />
    </div>
  );
}
