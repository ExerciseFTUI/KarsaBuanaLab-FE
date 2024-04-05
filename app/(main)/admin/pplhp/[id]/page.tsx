import { PplhpChecking } from "@/components/auth/pplhp/PplhpChecking";
import PplhpTab from "@/components/auth/pplhp/PplhpTab";
import { getPplhpDetail } from "@/lib/actions/admin.action";
import { getSingleProjectAdminPplhp } from "@/lib/actions/adminPplhp.action";

const PPLHPDetailPage = async ({ params }: { params: { id: string } }) => {
  const tempParam = "65b75751c0bdd92b29e8154d";

  const pplhp = await getPplhpDetail(tempParam);

  console.log(pplhp);

  // console.log(project);

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full">
        <div className="lg:w-2/5">
          {/* <FNPrintPage linkData={linkData ? linkData : []} /> */}
          <PplhpTab pplhp={pplhp} />
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
              lhp={pplhp.lhp}
              id={tempParam}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default PPLHPDetailPage;
