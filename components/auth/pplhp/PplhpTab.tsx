"use client";

import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList";
import PplhpSample from "./PplhpSample";
import PplhpDocument from "./PplhpDocument";
import { ProjectAdminPplhpType } from "@/lib/type";

interface PplhpTabProps {
  project: ProjectAdminPplhpType;
}

const PplhpTab: FC<PplhpTabProps> = ({ project }) => {
  const [selectedTab, setSelectedTab] = useState("Sampel");

  return (
    <Tabs defaultValue="Sample" className="flex-1">
      <SamplingTabsList value1="Sample" value2="Document" />

      <TabsContent className="py-4" value="Sample">
        <PplhpSample project={project} />
      </TabsContent>

      <TabsContent className="py-4" value="Document">
        <PplhpDocument project={project} />
      </TabsContent>
    </Tabs>
  );
};

export default PplhpTab;
