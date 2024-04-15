import NotesAdmin from "@/components/lab/NotesAdmin"
import VerifikasiSampling from "@/components/lab/VerifikasiSampling"
import HyperLinkButton from "@/components/sampling/HyperlinkButton"
import { Separator } from "@/components/ui/separator"
import { getProject } from "@/lib/actions/marketing.actions"
import {
  getAllUser,
  getLinkFiles,
  verifySample,
} from "@/lib/actions/sampling.actions"
import { SamplingRequestData } from "@/lib/type"

export default async function Home({ params }: { params: { np: string } }) {
  const resProject = await getProject(params.np)
  const resFiles = await getLinkFiles(params.np)
  const resUser = await getAllUser("USER")

  const samplingUser = resUser.result.filter(
    (u) => u.division == null || u.division == "Lab"
  )

  const data: SamplingRequestData = {
    project: resProject.result || null,
    user: samplingUser || [],
    files: resFiles.result || null,
  }

  const files = data.files.file.filter((f: any) => f.type == "Result")

  return (
    <div className="flex flex-row justify-between mx-10 h-full gap-4">
      <div className="flex flex-col w-[40%]">
        {/* START DOCUMENT */}
        <div className="flex flex-col mb-10">
          <h1 className="text-black_brown text-2xl font-semibold pb-4">
            Lihat Dokumen
          </h1>
          <div className="space-y-5">
            {files.map((f: any, i: number) => (
              <HyperLinkButton key={i} title={f.name} href={f.url} />
            ))}
          </div>
        </div>
        {/* END DOCUMENT */}

        {/* NOTES FROM ADMIN */}
        <NotesAdmin notes={resProject.result.notes} />
        {/* END OF NOTES FROM ADMIN */}
      </div>

      <Separator orientation="vertical" className="bg-light_brown" />

      <VerifikasiSampling data={data} />
    </div>
  )
}
