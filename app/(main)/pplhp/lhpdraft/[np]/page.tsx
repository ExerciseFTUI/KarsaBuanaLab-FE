import { getLinkFiles } from "@/lib/actions/receive.actions";
import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage";
import { SelectSeparator } from "@/components/ui/select";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import LHPDraftPage from "@/components/pplhp/LHPDraftPage";
import LaporanHasilPemeriksaan from "@/components/pplhp/LaporanHasilPemeriksaan";

import { getProjectDetails } from "@/lib/actions/pplhp.actions";
import AdminNotes from "@/components/pplhp/AdminNotes";

const LaporanHasilPemeriksaanData = {
  value: "link1.",
  label: "link 1",
};

export default async function Home({ params }: { params: { np: string } }) {
  const linkData = await getLinkFiles(params.np);
  const response = await getProjectDetails(params.np);
  const adminNotes = response.project.desc_failed;
  const adminDate = response.project.created_at;

  const dateObj = new Date(adminDate);

  // Function to pad numbers with leading zeros
  const pad = (num: number, size: number) => {
    let s = num.toString();
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  };

  // Extract the day, month, year, hours, minutes, and seconds
  const day = pad(dateObj.getUTCDate(), 2); // Day of the month
  const month = pad(dateObj.getUTCMonth() + 1, 2); // Months are 0-based, so we add 1
  const year = dateObj.getUTCFullYear(); // Full 4-digit year
  const hours = pad(dateObj.getUTCHours(), 2);
  const minutes = pad(dateObj.getUTCMinutes(), 2);
  const seconds = pad(dateObj.getUTCSeconds(), 2);

  // Format the date and time as dd-mm-yyyy hh:mm:ss
  const formattedDate = `${hours}:${minutes}:${seconds}, ${day}-${month}-${year}`;

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between w-full">
        <div className="lg:w-3/5 mb-0 pb-0">
          <LHPDraftPage linkData={linkData ? linkData : []} />
          <div>
            <AdminNotes
              notes={adminNotes}
              color="moss_green"
              date={formattedDate}
            />
          </div>
        </div>

        <div className="lg:w-2/5 py-24 lg:py-0">
          <LaporanHasilPemeriksaan
            title="Pembuatan Draft LHP"
            color="moss_green"
            link={linkData ? linkData.lhp : []}
            np={params.np}
            context="lhpdraft"
          />
        </div>
      </main>
    </>
  );
}
