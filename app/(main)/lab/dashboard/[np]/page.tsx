import ListDokumen from "@/components/lab/ListDokumen"
import DocumentList from "@/components/sampling/DokumentList"
import HyperLinkButton from "@/components/sampling/HyperlinkButton"
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { getLinkFiles } from "@/lib/actions/pplhp.actions"
import {
  getAllUser,
  getProjectByDivision,
} from "@/lib/actions/sampling.actions"
import { SamplingRequestData } from "@/lib/type"

export default async function LabDetails({
  params,
}: {
  params: { np: string }
}) {
  const resProjects = await getProjectByDivision("Lab")
  const resFiles = await getLinkFiles(params.np)
  const resUser = await getAllUser("USER")

  const samplingUser = resUser.result.filter(
    (u) => u.division == null || u.division == "Lab"
  )

  const data: SamplingRequestData = {
    project:
      ((resProjects as any).projects.find(
        (p: any) => p._id === params.np
      ) as any) || null,
    user: samplingUser || [],
    files: resFiles.result || null,
  }

  console.log(data.files)

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

      <Separator orientation="vertical" className="bg-light_brown" />

      <Tabs defaultValue="dokumen" className="flex-1">
        {/* {isLoading && <LoadingScreen text="" />} */}

        <SamplingTabsList value1="dokumen" value2="grup" />

        <TabsContent className="py-4 w-full" value="dokumen">
          <div className="px-4 py-2 flex flex-col flex-1">
            <DocumentList data={data.files} />

            <div className="flex flex-wrap flex-col max-w-xl">
              <h1 className="text-xl font-semibold my-5">Surat Tugas</h1>

              <HyperLinkButton
                title="Surat Tugas"
                href={
                  data.files.file.find((f: any) => f.name == "Surat Tugas").url
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent className="p-4 w-full" value="grup"></TabsContent>
      </Tabs>
    </div>
  )
}
