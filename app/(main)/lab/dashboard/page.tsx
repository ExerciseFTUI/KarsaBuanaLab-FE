import LabDataTable from "@/components/lab/LabDataTable";
import getSessionServer from "@/lib/actions/getSessionServer";
import { getProjectBy } from "@/lib/actions/lab.action";
import { getProject } from "@/lib/actions/pplhp.actions";

export default async function Home() {
  const session = await getSessionServer();

  const user = session?.user || "";
  const role = user ? user?.role.toUpperCase() : "";
  let projects;
  if (session) projects = await getProjectBy(session.user.id);

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable
        data={projects.result ? projects.result : []}
        link="dashboard/"
      />
    </div>
  )
}
