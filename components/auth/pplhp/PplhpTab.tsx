"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList";
import PplhpSample from "./PplhpSample";
import PplhpDocument from "./PplhpDocument";

export default function PplhpTab() {
  const [selectedTab, setSelectedTab] = useState("Sampel");

  return (
    <Tabs defaultValue="Sample" className="flex-1">
      <SamplingTabsList value1="Sample" value2="Document" />
      <TabsContent className="py-4" value="Sample">
        <PplhpSample />
      </TabsContent>

      <TabsContent className="py-4" value="Document">
        <PplhpDocument />
      </TabsContent>
    </Tabs>
  );
}
