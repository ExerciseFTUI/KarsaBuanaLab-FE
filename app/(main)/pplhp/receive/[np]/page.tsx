import { getLinkFiles } from "@/lib/actions/receive.actions";
import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage";
import { SelectSeparator } from "@/components/ui/select";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import RangkaianPengamananSampel from "@/components/pplhp/RangkaianPengamananSampel";

// Helper function to filter required files
function filterRequiredFiles(files) {
  return files.filter(
    (file) =>
      file.name === "Log Penerimaan" || file.name === "DP Chain of Custody"
  );
}

export default async function Home({ params }: { params: { np: string } }) {
  const linkData = await getLinkFiles(params.np);

  // Apply the filter to the file array in the data
  const filteredFiles = filterRequiredFiles(linkData.file);

  // Map the filtered files to the required format for RangkaianPengamananSampelData
  const RangkaianPengamananSampelData = filteredFiles.map((file) => ({
    value: file.url,
    label: file.name,
  }));

  console.log(RangkaianPengamananSampelData);
  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 w-full">
        <div className="w-full lg:w-1/2 px-2">
          <ReviewDraftPage linkData={linkData} />
        </div>
        <div className="mx-16 lg:w-2/5 py-24 lg:py-0">
          <RangkaianPengamananSampel
            title="Pembuatan Draft LHP"
            color="moss_green"
            link={RangkaianPengamananSampelData}
          />
        </div>
      </main>
    </>
  );
}
