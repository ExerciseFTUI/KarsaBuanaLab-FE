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
import { Inventory, InventoryUser } from "../InventoryType";
import {
  createInventory,
  updateInventory,
} from "@/lib/actions/inventory.action";
import { useRouter } from "next/navigation";
import { addInventoryFile } from "@/lib/actions/inventory.client.action";

interface InventoryProps {
  allUsers: InventoryUser[];
  isUpdate: boolean;
  inventory?: Inventory;
}

const InventoryDetail: FC<InventoryProps> = ({
  allUsers,
  isUpdate,
  inventory,
}) => {
  const router = useRouter();

  //Document Section
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const inventoryDeadline = inventory?.last_maintenance
    ? new Date(inventory?.last_maintenance)
    : new Date();

  const defaultAssignedUsersValue = inventory?.assigned_user
    ? inventory?.assigned_user
    : [];

  //Form Section
  const form = useForm<z.infer<typeof inventoryValidation>>({
    resolver: zodResolver(inventoryValidation),
    defaultValues: {
      tool: `${isUpdate ? inventory?.tools_name : ""}`,
      description: `${isUpdate ? inventory?.description : ""}`,
      deadline: inventoryDeadline,
      category: `${isUpdate ? inventory?.category : ""}`,
      maintenanceEvery: `${isUpdate ? inventory?.maintenance_every : ""}`,
    },
  });

  const [assignedUsers, setAssignedUsers] = useState<string[]>(
    defaultAssignedUsersValue
  );

  async function onSubmit(values: z.infer<typeof inventoryValidation>) {
    isUpdate ? onSubmitUpdate(values) : onSubmitCreate(values);
  }

  async function onSubmitCreate(values: z.infer<typeof inventoryValidation>) {
    const body = {
      tools_name: values.tool,
      description: values.description,
      last_maintenance: values.deadline?.toISOString(),
      assigned_user: assignedUsers,
      maintenance_every: values.maintenanceEvery,
      category: values.category,
    };

    //Dont forget to check the date if it is null
    // alert(JSON.stringify(body, null, 2));

    const isSuccess = await createInventory(body);

    if (isSuccess) {
      alert("Successfully created");
      router.push("/admin/inventory");
    } else {
      alert("Failed to create");
    }
  }

  async function onSubmitUpdate(values: z.infer<typeof inventoryValidation>) {
    let isUpdateFormSuccess;
    let isAddFileSuccess;

    if (inventory) {
      if (isChangingValue(values)) {
        const body = {
          id: inventory?._id,
          updates: {
            tools_name: values.tool,
            description: values.description,
            last_maintenance: values.deadline?.toISOString(),
            assigned_user: assignedUsers,
            maintenance_every: values.maintenanceEvery,
            category: values.category,
          },
        };

        isUpdateFormSuccess = await updateInventory(body);

        if (!isUpdateFormSuccess) {
          alert("Failed to update inventory form");
          return;
        }
      }

      if (uploadedFiles.length > 0) {
        isAddFileSuccess = await addInventoryFile(inventory._id, uploadedFiles);

        if (!isAddFileSuccess) {
          alert("Failed to add file");
          return;
        }
      }

      alert("Successfully updating inventory");
      router.refresh();
    }
  }

  function isChangingValue(values: z.infer<typeof inventoryValidation>) {
    if (
      values.tool !== inventory?.tools_name ||
      values.description !== inventory?.description ||
      values.deadline !== inventoryDeadline ||
      values.category !== inventory?.category ||
      values.maintenanceEvery !== inventory?.maintenance_every
    ) {
      return true;
    }
    return false;
  }

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
          assignedUsers={assignedUsers}
          setAssignedUsers={setAssignedUsers}
          defaultValue={`${isUpdate ? "Document" : "PIC"}`}
          isUpdate={isUpdate}
        />
      </div>
    </div>
  );
};

export default InventoryDetail;
