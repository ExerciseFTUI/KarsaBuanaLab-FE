import ListDokumen from "@/components/lab/ListDokumen";
import InputDokumenUser from "@/components/lab/InputDokumenUser";
import { Separator } from "@/components/ui/separator";
import { getLabDashboardProject } from "@/lib/actions/lab.action";
import getSessionServer from "@/lib/actions/getSessionServer";
import InputDokumenFinalReview from "@/components/lab/InputDokumenFinalReview";

export default async function Home({ params }: { params: { np: string } }) {
  const session = await getSessionServer();
  let project;
  if (session) {
    project = await getLabDashboardProject(params.np, session.user.id);
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
            {project.dokumen.map((data: any, index: number) => (
              <ListDokumen
                key={index}
                title={data.judul}
                link={data.url}
                color="light_brown"
              />
            ))}
          </div>
        </div>
        <Separator orientation="horizontal" className="bg-light_brown" />

        <div>
          <h1 className="text-black_brown text-2xl font-semibold pb-8">LHP</h1>
          <InputDokumenFinalReview
            fileName="LHP"
            url={project.lhp}
            color="light_brown"
          />
        </div>
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

        <div className="flex flex-row absolute bottom-5 w-full justify-between">
          <button className="w-[47%] text-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown">
            Cancel
          </button>
          <button className="w-[47%] text-white bg-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown">
            Save
          </button>
        </div>
      </div> */}
    </div>
  )
}
