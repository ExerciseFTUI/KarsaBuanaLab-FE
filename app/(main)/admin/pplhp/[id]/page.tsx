import { PplhpChecking } from "@/components/auth/pplhp/PplhpChecking";
import PplhpTab from "@/components/auth/pplhp/PplhpTab";
import { getPplhpDetail } from "@/lib/actions/admin.action";
import { getSingleProjectAdminPplhp } from "@/lib/actions/adminPplhp.action";
import { redirect, useRouter } from "next/navigation";

const PPLHPDetailPage = async ({ params }: { params: { id: string } }) => {
  const pplhp = await getPplhpDetail(params.id);

  if (!pplhp?.projectID) {
    redirect("/admin/pplhp");
  }

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
              id={params.id}
              ttd={pplhp.ttd_type}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default PPLHPDetailPage;
