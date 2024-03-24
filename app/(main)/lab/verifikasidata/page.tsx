import LabDataTable from "@/components/lab/LabDataTable";
import { getProject } from "@/lib/actions/pplhp.actions";

export default async function Home() {
  const projects = await getProject("running");

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={projects ? projects : []} link="verifikasidata/" />
    </div>
  );
}
