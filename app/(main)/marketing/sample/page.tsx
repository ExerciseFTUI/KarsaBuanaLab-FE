// import CreateSamplePage from '@/components/marketing/sample/CreateSamplePage'
import React from "react";
import CreateSamplePage from "@/components/marketing/sample/CreateSamplePage";
import { getSample } from "@/lib/actions/marketing.actions";

const page = async () => {  
  // Call API get sample
  const baseSample = await getSample();


  return (
    <>
      <CreateSamplePage baseSample={baseSample? baseSample.result : []} />
    </>
  );
};

export default page;
