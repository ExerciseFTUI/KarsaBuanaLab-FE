"use client";
import { useState } from "react";
import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage";
import LogbookRekamanSampel from "@/components/pplhp/LogbookRekamanSampel";
import { BaseSample } from "@/lib/models/baseSample.model";

export default function PPLHPDetailParent({
  initialDetails,
  params,
  baseSamples,
}: {
  initialDetails: any;
  params: { np: string; sampleId: string };
  baseSamples: BaseSample[];
}) {
  const [details, setDetails] = useState<any>(initialDetails);

  const handleDetailsChange = (newDetails: any) => {
    setDetails(newDetails);
  };

  return (
    <main className="flex flex-col lg:flex-row gap-5 lg:gap-0 w-full">
      <div className="w-full lg:w-1/2 px-2">
        <ReviewDraftPage
          details={details}
          onDetailsChange={handleDetailsChange}
          baseSamples={baseSamples}
          params={params}
        />
      </div>
      <div className="mx-16 lg:w-2/5 py-24 lg:py-0">
        <LogbookRekamanSampel
          color="moss_green"
          data={details}
          params={params}
          internal={details?.logbook_internal}
          external={details?.logbook_external}
          onDetailsChange={handleDetailsChange}
        />
      </div>
    </main>
  );
}
