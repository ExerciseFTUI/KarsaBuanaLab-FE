import LabDataTable from "@/components/lab/LabDataTable"
import { getLabProjects } from "@/lib/actions/lab.actions"

export default async function Home() {
  const projects = await getLabProjects()

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable
        data={projects.result ? projects.result : []}
        link="dashboard/"
      />
    </div>
  )
}
