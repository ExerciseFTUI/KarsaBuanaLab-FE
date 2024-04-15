import LabAssignStaff from "@/components/lab/Dashboard/LabAssignStaff"
import ListDokumen from "@/components/lab/ListDokumen"
import NotesAdmin from "@/components/lab/NotesAdmin"
import InputDokumenUser from "@/components/lab/InputDokumenUser";
import { Separator } from "@/components/ui/separator"
import { getLabProjects } from "@/lib/actions/lab.actions"
import { getLabDashboardProject } from "@/lib/actions/lab.action";
import { getLinkFiles } from "@/lib/actions/pplhp.actions"
import { getAllUser } from "@/lib/actions/sampling.actions"
import { getProject } from "@/lib/actions/marketing.actions"
import { SamplingRequestData } from "@/lib/type"
import getSessionServer from "@/lib/actions/getSessionServer";
import InputDokumenFinalReview from "@/components/lab/InputDokumenFinalReview";
import { is } from "date-fns/locale";

const dokumenData = [
  { title: "Log Penerimaan Sample", link: "/link1" },
  { title: "Akomodasi Lingkungan", link: "/link2" },
  // { title: "Judul Dokumen 3", link: "/link3" },
]

export default async function LabDetails({
  params,
}: {
  params: { np: string }
}) {
  const session = await getSessionServer();
  let project;
  let isAdmin = true;

  // SPV
  const projects = await getLabProjects()
  const resFiles = await getLinkFiles(params.np)
  const resUser = await getAllUser("USER")
  const resProject = await getProject(params.np)
  const notes = resProject.result.notes
  // console.log("resProject", resProject.result.sampling_list);
  

  const samplingUser = resUser.result.filter(
    (u) => u.division == null || u.division == "Lab"
  )

  const data: SamplingRequestData = {
    project:
      (projects.result.find((p: any) => p._id === params.np) as any) || null,
    user: samplingUser || [],
    files: resFiles ? (!resFiles.result ? dokumenData : resFiles.result) : [],
  }

  // STAFF
  if (session && session.user.role === "USER") {
    project = await getLabDashboardProject(params.np, session.user.id);
    isAdmin = false;
    console.log(project);
  }

  return (
    <div className="flex flex-row justify-between mx-10 h-full gap-4">
      <div className="flex flex-col w-[40%]">
        {/* START DOCUMENT */}
        <div className="flex flex-col mb-10">
          <h1 className="text-black_brown text-2xl font-semibold pb-4">
            Lihat Dokumen
          </h1>
          <div className="space-y-5">
            {isAdmin ? (
                data.files.map((data: any, index: number) => (
                  <ListDokumen
                    key={index}
                    title={data.title}
                    link={data.link}
                    color="light_brown"
                  />
                ))
            ) : (
              project.dokumen.map((data: any, index: number) => (
                <ListDokumen
                  key={index}
                  title={data.judul}
                  link={data.url}
                  color="light_brown"
                />
              ))
            )}
          </div>
        </div>

        {/* NOTES FROM ADMIN */}
        {isAdmin && (
          <NotesAdmin notes={resProject.result.notes} />
        )}
        {/* END OF NOTES FROM ADMIN */}
        
        {/* START INPUT DOKUMEN */}
        {!isAdmin && (
          <div>
            <h1 className="text-black_brown text-2xl font-semibold pb-8">LHP</h1>
            <InputDokumenFinalReview
              fileName="LHP"
              url={project.lhp}
              color="light_brown"
            />
          </div>
        )}

      </div>

      <Separator orientation="vertical" className="bg-light_brown mx-12" />

      {isAdmin ? (
        <LabAssignStaff data={data} projects={projects.result} />
      ) : (
        <InputDokumenUser
            sample={project.input}
            userId={session ? session.user.id : ""}
            projectId={params.np}
          />
      )}
    </div>
  )
}