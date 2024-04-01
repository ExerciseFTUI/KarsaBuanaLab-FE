import LabAssignStaff from "@/components/lab/Dashboard/LabAssignStaff"
import ListDokumen from "@/components/lab/ListDokumen"
import { Separator } from "@/components/ui/separator"
import { getLabProjects } from "@/lib/actions/lab.actions"
import { getLinkFiles } from "@/lib/actions/pplhp.actions"
import { getAllUser } from "@/lib/actions/sampling.actions"
import { SamplingRequestData } from "@/lib/type"

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
  const projects = await getLabProjects()
  const resFiles = await getLinkFiles(params.np)
  const resUser = await getAllUser("USER")

  const samplingUser = resUser.result.filter(
    (u) => u.division == null || u.division == "Lab"
  )

  const data: SamplingRequestData = {
    project:
      (projects.result.find((p: any) => p._id === params.np) as any) || null,
    user: samplingUser || [],
    files: resFiles ? (!resFiles.result ? dokumenData : resFiles.result) : [],
  }

  return (
    <div className="flex flex-row justify-between m-5 mx-10 h-full">
      <div className="flex flex-col w-[45%]">
        <h1 className="text-black_brown text-2xl font-semibold pb-8">
          Lihat Dokumen
        </h1>
        <div className="space-y-5">
          {data.files.map((data: any, index: number) => (
            <ListDokumen
              key={index}
              title={data.title}
              link={data.link}
              color="light_brown"
            />
          ))}
        </div>
      </div>

      <Separator orientation="vertical" className="bg-light_brown mx-12" />

      <LabAssignStaff data={data} projects={projects.result} />
    </div>
  )
}
