import LabAssignStaff from "@/components/lab/Dashboard/LabAssignStaff";
import ListDokumen from "@/components/lab/ListDokumen";
import NotesAdmin from "@/components/lab/NotesAdmin";
import InputDokumenUser from "@/components/lab/InputDokumenUser";
import { Separator } from "@/components/ui/separator";
import { getLabProjects } from "@/lib/actions/lab.actions";
import {
  getChoiceParams,
  getChoiceParamsRev,
  getSampleForLab,
} from "@/lib/actions/sampling.actions";
import { getLabDashboardProject } from "@/lib/actions/sampling.actions";
import { getLinkFiles } from "@/lib/actions/pplhp.actions";
import { getAllUser } from "@/lib/actions/sampling.actions";
import { getProject } from "@/lib/actions/marketing.actions";
import { SamplingRequestData } from "@/lib/type";
import getSessionServer from "@/lib/actions/getSessionServer";
import InputDokumenFinalReview from "@/components/lab/InputDokumenFinalReview";
import { is } from "date-fns/locale";
import { useEffect } from "react";
import { notesFromAdmin } from "@/lib/models/project.model";
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentList from "@/components/sampling/DokumentList";
import HyperLinkButton from "@/components/sampling/HyperlinkButton";

const dokumenData = [
  { title: "Log Penerimaan Sample", link: "/link1" },
  { title: "Akomodasi Lingkungan", link: "/link2" },
  // { title: "Judul Dokumen 3", link: "/link3" },
];

export default async function LabDetails({
  params,
}: {
  params: { np: string; sampleId: string };
}) {
  const session = await getSessionServer();
  let project;
  let chooseParams;
  let isAdmin = true;
  let sample;

  const projects = await getLabProjects();
  // const resFiles = await getLinkFiles(params.np);
  const resUser = await getAllUser("USER");
  // const resProject = await getProject(params.np);

  const samplingUser = resUser.result.filter(
    (u) => u.division == null || u.division == "Lab"
  );

  // project = projects.result.find((p: any) => p._id === params.np) || null;
  // const sampling = project
  //   ? project.sampling_list.find((s: any) => s.id === params.sampleId) || null
  //   : null;

  const data: SamplingRequestData = {
    project:
      (projects.result.find((p: any) => p._id === params.np) as any) || null,
    user: samplingUser || [],
    // files: resFiles ? (!resFiles.result ? dokumenData : resFiles.result) : [],
  };

  // ADMIN
  if (session && session.user.role !== "USER") {
    sample = await getSampleForLab(params.sampleId);
    chooseParams = await getChoiceParamsRev(params.sampleId);
  }

  // STAFF
  if (session && session.user.role === "USER") {
    project = await getLabDashboardProject(params.sampleId, session.user.id);
    chooseParams = await getChoiceParams(params.sampleId, session.user.id);
    isAdmin = false;
  }

  return (
    <>
      {/* <div className="flex flex-row justify-between mx-10 h-full gap-4"> */}
      {isAdmin && (
        <div className="flex flex-row justify-between mx-10 h-full gap-4">
          <div className="flex flex-col w-[30%]">
            {/* START DOCUMENT */}
            <div className="flex flex-col mb-10">
              <h1 className="text-black_brown text-2xl font-semibold pb-4">
                Lihat Dokumen
              </h1>
              <div className="space-y-5">
                <ListDokumen
                  title="Surat Penawaran"
                  link="/link1"
                  color="light_brown"
                />
                {/* {isAdmin
                  ? data.files.map((data: any, index: number) => (
                      <ListDokumen
                        key={index}
                        title={data.title}
                        link={data.link}
                        color="light_brown"
                      />
                    ))
                  : project.dokumen.map((data: any, index: number) => (
                      <ListDokumen
                        key={index}
                        title={data.judul}
                        link={data.url}
                        color="light_brown"
                      />
                    ))} */}
              </div>
            </div>

            {/* NOTES FROM ADMIN */}
            {isAdmin && <NotesAdmin notes={notesFromAdmin} />}
            {/* END OF NOTES FROM ADMIN */}

            {/* START INPUT DOKUMEN */}
            {!isAdmin && (
              <div>
                <h1 className="text-black_brown text-2xl font-semibold pb-8">
                  LHP
                </h1>
                <InputDokumenFinalReview
                  fileName="LHP"
                  url={project.lhp}
                  color="light_brown"
                />
              </div>
            )}
          </div>

          <Separator orientation="vertical" className="bg-light_brown mx-12" />

          {/* <div className=""> */}
          {/* <Tabs defaultValue="Schedule" className="flex-1">
            <SamplingTabsList value1="Schedule" value2="Unit & Method" />

            <TabsContent className="py-4 w-full" value="Schedule">
              <div className="px-4 py-2 flex flex-col flex-1">

                <div className="flex flex-wrap flex-col max-w-xl">
                  <h1 className="text-xl font-semibold my-5">Surat Tugas</h1>

                  <HyperLinkButton title="Surat Tugas" href="/" />
                </div>
              </div>
            </TabsContent>

            <TabsContent className="py-4 w-full" value="Unit & Method">
              <InputDokumenUser
                sample={sample}
                userId={session ? session.user.id : ""}
                sampleId={params.np}
                choiceParams={chooseParams}
                // status={project.status}
              />
            </TabsContent>
          </Tabs> */}
          {/* </div> */}

          {isAdmin ? (
            <Tabs
              defaultValue="schedule"
              className="w-[40rem] max-sm:w-[420px] "
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="unitnmethod">Unit & Method</TabsTrigger>
              </TabsList>

              {/* Sample Section */}
              <TabsContent value="schedule">
                {/* <LabAssignStaff data={data} projects={projects.result} /> */}
                <LabAssignStaff
                  data={data}
                  sampleId={params.sampleId}
                  projects={projects.result}
                />
              </TabsContent>
              {/* End Sample Section */}

              <TabsContent className="py-4 w-full" value="unitnmethod">
                <InputDokumenUser
                  sample={sample}
                  userId={session ? session.user.id : ""}
                  sampleId={params.sampleId}
                  choiceParams={chooseParams}
                  // status={project.status}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <InputDokumenUser
              sample={project.input}
              userId={session ? session.user.id : ""}
              sampleId={params.sampleId}
              choiceParams={chooseParams}
              // status={project.status}
            />
          )}
        </div>
      )}
      {/* </div> */}
    </>
  );
}
