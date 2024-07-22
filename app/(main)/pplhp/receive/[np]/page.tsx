import { getLinkFiles, getReceiveDetails } from "@/lib/actions/receive.actions";
import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage";
import LogbookRekamanSampel from "@/components/pplhp/LogbookRekamanSampel";

// Helper function to remove and return required files
function removeAndReturnRequiredFiles(files: any) {
  const requiredFiles: any[] = [];
  const remainingFiles = files.filter((file: any) => {
    if (["Log Penerimaan", "DP Chain of Custody"].includes(file.name)) {
      requiredFiles.push(file);
      return false;
    }
    return true;
  });
  return { requiredFiles, remainingFiles };
}

export default async function Home({ params }: { params: { np: string } }) {
  const linkData = await getLinkFiles(params.np);
  const details = await getReceiveDetails(params.np);

  // Apply the filter to the file array in the data
  const { requiredFiles, remainingFiles } = removeAndReturnRequiredFiles(
    linkData ? linkData.file : []
  );

  // Map the filtered files to the required format for LogbookRekamanSampelData
  const LogbookRekamanSampelData = requiredFiles.map((file: any) => ({
    value: file.url,
    label: file.name,
  }));

  return (
    <>
      <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 w-full">
        <div className="w-full lg:w-1/2 px-2">
          <ReviewDraftPage details={details} />
        </div>
        <div className="mx-16 lg:w-2/5 py-24 lg:py-0">
          <LogbookRekamanSampel
            color="moss_green"
            internal={details.logbook_internal}
            external={details.logbook_external}
            params={params}
          />
        </div>
      </main>
    </>
  );
}
