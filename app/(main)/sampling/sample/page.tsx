import { SamplingSampleDataTables } from "@/components/sampling/sampleListDataTables";
import getSessionServer from "@/lib/actions/getSessionServer";
import {
  getProjectByDivision,
  getProjectsByAcc,
} from "@/lib/actions/sampling.actions";
import { Project } from "@/lib/models/project.model";

export default async function SamplingProject() {
  const session = await getSessionServer();

  const user = session?.user || "";
  const role = user ? user?.role.toUpperCase() : "";

  let res = null;
  let data: Project[] = [];

  if (role == "USER") {
    res = await getProjectsByAcc(user ? user?.id : "");
    data = (res as any).projectList;
  } else {
    res = await getProjectByDivision("sampling");
    data = (res as any).projects;
  }

  data = data.filter(
    (p) => p.jadwal_sampling != null && p.current_division == "SAMPLING"
  );

  return (
    <div className="flex flex-col w-full ">
      <SamplingSampleDataTables role={role} data={data} />
    </div>
  );
}
