"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTabsList from "@/components/sampling/tab/SamplingTabsList";
import { User } from "@/lib/models/user.model";
import InventoryPIC from "./InventoryPIC";
import InventoryDocument from "./InventoryDocument";
import { Inventory, InventoryUser } from "../InventoryType";

interface InventoryTabProps {
  defaultValue: "PIC" | "Document";
  allUsers: InventoryUser[];
  setUploadedFiles: any;
  uploadedFiles: any;
  isUpdate: boolean;
  assignedUsers: string[];
  setAssignedUsers: Dispatch<SetStateAction<string[]>>;
  inventory?: Inventory;
  isViewOnly: boolean;
}

export default function InventoryTab({
  defaultValue,
  allUsers,
  setUploadedFiles,
  uploadedFiles,
  isUpdate,
  assignedUsers,
  setAssignedUsers,
  inventory,
  isViewOnly,
}: InventoryTabProps) {
  return (
    <Tabs defaultValue={`${defaultValue}`} className="flex-1 -mt-6">
      {/* <SamplingTabsList value1="PIC" value2="Document" /> */}
      <TabsList
        //Conditional for isViewOnly and IsUpdate
        className={`grid ${
          !isViewOnly && isUpdate ? "grid-cols-2" : "grid-cols-1"
        }  shadow-none bg-transparent `}
      >
        {!isViewOnly && (
          <TabsTrigger
            className="rounded-none data-[state=active]:shadow-none border-b-2 data-[state=active]:border-b-light_brown data-[state=active]:bg-transparent data-[state=active]:text-dark_brown data-[state=active]:font-bold text-base data-[state=inactive]:text-moss_green data-[state=inactive]:opacity-50 data-[state=inactive]:border-b-moss_green capitalize"
            value={"PIC"}
          >
            {"PIC"}
          </TabsTrigger>
        )}

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
        <InventoryPIC
          allUsers={allUsers}
          assignedUsers={assignedUsers}
          setAssignedUsers={setAssignedUsers}
          isViewOnly={false}
        />
      </TabsContent>

      {isUpdate && inventory && (
        <TabsContent className="py-4" value="Document">
          <InventoryDocument
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            inventoryDocument={inventory.inventory_file}
            inventoryId={inventory._id}
            isViewOnly={false}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
