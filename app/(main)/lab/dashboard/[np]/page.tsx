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
    <div className="flex flex-row justify-between m-5 mx-10 h-full">
      <div className="flex flex-col w-[25%] space-y-16">
        <div>
          <h1 className="text-black_brown text-2xl font-semibold pb-8">
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
      <Separator orientation="vertical" className="bg-light_brown" />
      <div className="w-[65%]">
        {session?.user.role == "USER" && (
          <InputDokumenUser
            sample={project.input}
            userId={session.user.id}
            projectId={params.np}
          />
        )}
      </div>

      {/* <div className="flex flex-col w-[45%] relative">
        <div className="flex flex-row text-2xl font-medium space-x-0 cursor-pointer pb-10   ">
          <div
            className={`flex flex-col items-end ${
              selectedTab === "Document"
                ? "text-dark_brown"
                : "text-ghost_brown"
            } w-1/2`}
            onClick={() => setSelectedTab("Document")}
          >
            <h1 className="mb-4 mx-5">Document</h1>
            <div
              className={`w-4/5 h-1 rounded-l-full ${
                selectedTab === "Document" ? "bg-dark_brown" : "bg-ghost_brown"
              }`}
            />
          </div>
          <div
            className={`w-1/2 cursor-pointer ${
              selectedTab === "Group" ? "text-dark_brown" : "text-ghost_brown"
            }`}
            onClick={() => setSelectedTab("Group")}
          >
            <h1 className="mb-4 mx-5">Group</h1>
            <div
              className={`w-4/5 h-1 rounded-r-full ${
                selectedTab === "Group" ? "bg-dark_brown" : "bg-ghost_brown"
              }`}
            />
          </div>
        </div>
        {selectedTab === "Document" && (
          <div className="gap-4 flex flex-row flex-wrap">
            {inputDokumenData.map((data, index) => (
              <InputDokumenDashboard
                key={index} // Perhatikan penggunaan index sebagai key, ini sebaiknya digunakan jika data tidak memiliki properti unik (seperti id)
                title={data.title}
                fileName={data.fileName}
                color={data.color}
              />
            ))}
          </div>
        )}

        {selectedTab === "Group" && (
          <div className="gap-4 flex flex-row flex-wrap">
            {/* <UserDataTable table={dummyData} /> *
          </div>
        )}

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
