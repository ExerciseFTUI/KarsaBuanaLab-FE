import { PplhpChecking } from "@/components/auth/pplhp/PplhpChecking";
import PplhpTab from "@/components/auth/pplhp/PplhpTab";
import { getSingleProjectAdminPplhp } from "@/lib/actions/adminPplhp.action";
import { ProjectAdminPplhpType } from "@/lib/type";

const tempProject: ProjectAdminPplhpType = {
  project_name: "Test API 2",
  lab_files: [
    {
      file_name: "Surat Penawaran",
      file_type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      file_id: "15K7eD32iRtxUT4xEHMcXzLp0w2UIXKZS",
      file_extension: "xlsx",
      _id: "65b89e5ab6b128d5e4e88c78",
    },
  ],
};

const PPLHPDetailPage = async ({ params }: { params: { id: string } }) => {
  const project = await getSingleProjectAdminPplhp(params.id);

  console.log(project);

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full">
        <div className="lg:w-2/5">
          {/* <FNPrintPage linkData={linkData ? linkData : []} /> */}
          <PplhpTab project={tempProject} />
        </div>

        <div className="lg:w-3/5 py-24 lg:py-0">
          {/* <LaporanHasilPemeriksaan
            title="Pengisian LHP"
            color="dark_brown"
            link={linkData ? linkData.lhp : []}
            np={params.np} // Pass params.np directly
            context="finalreview"
          /> */}
          <div className="flex flex-1 justify-center items-center">
            <PplhpChecking
              title="Pengisian LHP"
              color="dark_brown"
              id={params.id}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default PPLHPDetailPage;
