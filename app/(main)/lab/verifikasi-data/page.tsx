import LabDataTable from "@/components/lab/LabDataTable"
import { getProject } from "@/lib/actions/pplhp.actions"
import { getProjectByDivision } from "@/lib/actions/sampling.actions"

export default async function Home() {
  const res = await getProjectByDivision("Lab")

  const data = res ? (res as any).projects.filter((item: any) => item.lab_status === "NEED ANALYZE") : []
  // console.log("verifikasi-data", data);
  
  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={data} link="verifikasi-data/" />
    </div>
  )
}
