import { getLinkFiles } from "@/lib/actions/receive.actions";
import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage";
import { SelectSeparator } from "@/components/ui/select";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import LHPDraftPage from "@/components/pplhp/LHPDraftPage";
import LaporanHasilPemeriksaan from "@/components/pplhp/LaporanHasilPemeriksaan";

const LaporanHasilPemeriksaanData = {
  value: "link1.",
  label: "link 1",
};

export default async function Home({ params }: { params: { np: string } }) {
  const linkData = await getLinkFiles(params.np);
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full">
        <div className="w-full lg:w-3/5 px-2">
          <LHPDraftPage linkData={linkData} />
        </div>
        <div className="lg:w-2/5 py-24 lg:py-0">
          <LaporanHasilPemeriksaan
            title="Pembuatan Draft LHP"
            color="moss_green"
            link={linkData.lhp}
          />
        </div>
      </main>
    </>
  );
}
