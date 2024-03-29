"use client";

import { User } from "@/lib/models/user.model";
import { FC, useState } from "react";
import InventoryForm from "./InventoryForm";
import InventoryPIC from "./InventoryPIC";
import InventoryDocument from "./InventoryDocument";
import InventoryTab from "./InventoryTab";
import { inventoryValidation } from "../InventoryValidation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inventory } from "../InventoryType";

interface InventoryProps {
  allUsers: User[];
  isUpdate: boolean;
  inventory?: Inventory;
}

const InventoryDetail: FC<InventoryProps> = ({ allUsers, isUpdate }) => {
  //Form Section
  const form = useForm<z.infer<typeof inventoryValidation>>({
    resolver: zodResolver(inventoryValidation),
    defaultValues: {
      tool: `${isUpdate ? "Default Value" : ""}`,
      description: `${isUpdate ? "Default Value" : ""}`,
      deadline: new Date("2022-01-01") || new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof inventoryValidation>) {
    isUpdate ? onSubmitUpdate(values) : onSubmitCreate(values);
  }

  async function onSubmitCreate(values: z.infer<typeof inventoryValidation>) {
    //Dont forget to check the date if it is null
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  async function onSubmitUpdate(values: z.infer<typeof inventoryValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    alert(JSON.stringify(values, null, 2));
  }

  //Document Section
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center w-full">
      <div className="flex flex-col w-full xl:w-2/5 sm:border-r-light_brown sm:border-r-2 border-b-2 border-b-light_brown sm:border-b-0 px-5 xl:min-h-[50vh]">
        <h1 className="text-2xl font-bold text-dark_brown capitalize mb-8">
          Tools Details
        </h1>
        <div className="max-w-xl space-y-10">
          <InventoryForm form={form} onSubmit={onSubmit} />
        </div>
      </div>
      <div className="xl:w-3/5 w-full">
        <InventoryTab
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          allUsers={allUsers}
          defaultValue={`${isUpdate ? "Document" : "PIC"}`}
          isUpdate={isUpdate}
        />
      </div>
    </div>
  );
};

export default InventoryDetail;
