"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList";
import { User } from "@/lib/models/user.model";
import InventoryPIC from "./InventoryPIC";
import InventoryDocument from "./InventoryDocument";

interface InventoryTabProps {
  defaultValue: "PIC" | "Document";
  allUsers: User[];
  setUploadedFiles: any;
  uploadedFiles: any;
  isUpdate: boolean;
}

export default function InventoryTab({
  defaultValue,
  allUsers,
  setUploadedFiles,
  uploadedFiles,
  isUpdate,
}: InventoryTabProps) {
  return (
    <Tabs defaultValue={`${defaultValue}`} className="flex-1 -mt-6">
      {/* <SamplingTabsList value1="PIC" value2="Document" /> */}
      <TabsList
        className={`grid ${
          isUpdate ? "grid-cols-2" : "grid-cols-1"
        }  shadow-none bg-transparent max-w-4xl`}
      >
        <TabsTrigger
          className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green capitalize"
          value={"PIC"}
        >
          {"PIC"}
        </TabsTrigger>

        {isUpdate && (
          <TabsTrigger
            className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green capitalize"
            value={"Document"}
          >
            {"Document"}
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent className="py-4" value="PIC">
        <InventoryPIC allUsers={allUsers} />
      </TabsContent>

      {isUpdate && (
        <TabsContent className="py-4" value="Document">
          <InventoryDocument
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
