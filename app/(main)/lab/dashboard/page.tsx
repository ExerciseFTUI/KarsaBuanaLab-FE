import LabDataTable from "@/components/lab/LabDataTable";
import getSessionServer from "@/lib/actions/getSessionServer";
import { getProjectBy } from "@/lib/actions/lab.action";
import { getLabProjects } from "@/lib/actions/lab.actions";
import { getProject } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";

export default async function Home() {
  const session = await getSessionServer();

  const user = session?.user || "";
  const role = user ? user?.role.toUpperCase() : "";

  let projects = await getLabProjects();
  if (session && role === "USER") {
    const response = await getProjectBy(session.user.id);
    projects.result = response;
  }

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable
        data={projects.result ? projects.result : []}
        link="dashboard/"
      />
    </div>
  )
}
