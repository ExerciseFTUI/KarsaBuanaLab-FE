import NotesAdmin from "@/components/lab/NotesAdmin"
import VerifikasiSampling from "@/components/lab/VerifikasiSampling"
import HyperLinkButton from "@/components/sampling/HyperlinkButton"
import { Separator } from "@/components/ui/separator"
import { getProject } from "@/lib/actions/marketing.actions"
import { getLinkFiles, verifySample } from "@/lib/actions/sampling.actions"
import { SamplingRequestData } from "@/lib/type"

// dummy data for notes from admin, array of objects of date and text
const notesFromAdmin = [
  { date: "10 February 2023", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { date: "5 September 2022", content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  { date: "15 June 2023", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
  { date: "20 April 2022", content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { date: "3 November 2022", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
];

export default async function Home({ params }: { params: { np: string } }) {
  const resProject = await getProject(params.np)
  const resFiles = await getLinkFiles(params.np)

  const data: SamplingRequestData = {
    project: resProject.result || null,
    user: [],
    files: resFiles.result || null,
  }

  const files = data.files.file.filter((f: any) => f.type == "Result")

  // console.log(data.files)
  

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
        <NotesAdmin notes={notesFromAdmin}/>
        {/* END OF NOTES FROM ADMIN */}
      </div>


      <Separator orientation="vertical" className="bg-light_brown" />

      <VerifikasiSampling data={data} />
    </div>
  )
}
