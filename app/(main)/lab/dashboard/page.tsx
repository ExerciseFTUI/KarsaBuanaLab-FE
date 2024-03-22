import LabDataTable from "@/components/lab/LabDataTable"
import { getProjectByDivision } from "@/lib/actions/sampling.actions"

export default async function Home() {
  const resProjects = await getProjectByDivision("Lab")
  const projects = resProjects ? (resProjects as any).projects : []

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={projects ? projects : []} link="dashboard/" />
    </div>
  )
}
