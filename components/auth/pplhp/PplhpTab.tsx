"use client";

import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList";
import PplhpSample from "./PplhpSample";
import PplhpDocument from "./PplhpDocument";
import { PplhpDetail } from "./PplhpType";

interface PplhpTabProps {
  pplhp: PplhpDetail;
}

export default function PplhpTab({ pplhp }: PplhpTabProps) {
  // const [selectedTab, setSelectedTab] = useState("Sample");

  return (
    <Tabs defaultValue="Sample" className="flex-1">
      <SamplingTabsList value1="Sample" value2="Document" />

      <TabsContent className="py-4" value="Sample">
        <PplhpSample samples={pplhp.sampling_list} />
      </TabsContent>

      <TabsContent className="py-4" value="Document">
        <PplhpDocument document={pplhp.lab_files} />
      </TabsContent>
    </Tabs>
  );
}
