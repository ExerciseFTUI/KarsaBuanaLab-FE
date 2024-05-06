import LabDataTable from "@/components/lab/LabDataTable";
import getSessionServer from "@/lib/actions/getSessionServer";
import { getProjectBy } from "@/lib/actions/lab.action";
import { getLabProjects } from "@/lib/actions/lab.actions";
import { getProject } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";
import { Sampling } from "@/lib/models/sampling.model";

export default async function Home() {
  const session = await getSessionServer();

  const user = session?.user || "";
  const role = user ? user?.role.toUpperCase() : "";

  let projects = await getLabProjects();
  if (session && role === "USER") {
    const response = await getProjectBy(session.user.id);
    projects.result = response;

    // set lab_sample_status
    projects.result.forEach((project: Project) => {
      project.lab_sample_status = "NOT ASSIGNED";

      if (project.sampling_list) {
        project.sampling_list.forEach((sample: Sampling) => {
          // lab_assigned_to is array
          if (sample.lab_assigned_to.includes(session.user.id)) {
            if (sample.status === "REVISION") {
              project.lab_sample_status = "REVISION";
            } else if (sample.status === "WAITING") {
              project.lab_sample_status = "WAITING";
            } else if (sample.status === "SUBMIT") {
              project.lab_sample_status = "SUBMIT";
            } else if (sample.status === "ACCEPTED") {
              project.lab_sample_status = "ACCEPTED";
            } else if (sample.status === "FINISHED") {
              project.lab_sample_status = "FINISHED";
            } else if (sample.status === "VERIFYING") {
              project.lab_sample_status = "VERIFYING";
            } else if (sample.status === "ASSIGNED") {
              project.lab_sample_status = "ASSIGNED";
            } else {
              project.lab_sample_status = "NOT ASSIGNED";
            }
          }
        });
      }
    });
  }

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable
        data={projects.result ? projects.result : []}
        link="dashboard/"
        idUser={(session && role === "USER" && session.user.id) || undefined}
      />
    </div>
  )
}
