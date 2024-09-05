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
import { Inventory, InventoryUser, InventoryVendor } from "../InventoryType";
import {
  createInventory,
  updateInventory,
} from "@/lib/actions/inventory.action";
import { usePathname, useRouter } from "next/navigation";
import { addInventoryFile } from "@/lib/actions/inventory.client.action";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/LoadingScreen";

interface InventoryProps {
  allUsers: InventoryUser[];
  isUpdate: boolean;
  inventory?: Inventory;
  isViewOnly: boolean;
  allVendor: InventoryVendor[];
}

const InventoryDetail: FC<InventoryProps> = ({
  allUsers,
  isUpdate,
  inventory,
  isViewOnly,
  allVendor,
}) => {
  const router = useRouter();
  const path = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  //Document Section
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const inventoryDeadline = inventory?.last_maintenance
    ? new Date(inventory?.last_maintenance)
    : new Date();

  const defaultAssignedUsersValue = inventory?.assigned_user
    ? inventory?.assigned_user
    : [];

  const inventoryCondition = inventory?.condition;

  //Form Section
  const form = useForm<z.infer<typeof inventoryValidation>>({
    resolver: zodResolver(inventoryValidation),
    defaultValues: {
      tool: `${isUpdate ? inventory?.tools_name : ""}`,
      description: `${isUpdate ? inventory?.description : ""}`,
      deadline: inventoryDeadline,
      category: `${isUpdate ? inventoryCondition : ""}`,
      maintenanceEvery: `${isUpdate ? inventory?.maintenance_every : ""}`,
      vendor: `${isUpdate ? inventory?.current_vendor?.toLowerCase() : ""}`,
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
      category: values.category, //TODO: Delete This
      condition: values.category,
      current_vendor: values.vendor,
    };

    setIsLoading(true);

    const isSuccess = await createInventory(body);

    if (isSuccess) {
      alert("Successfully created");
      router.push("/admin/inventory");
    } else {
      alert("Failed to create");
    }
    setIsLoading(false);
  }

  async function onSubmitUpdate(values: z.infer<typeof inventoryValidation>) {
    let isUpdateFormSuccess;
    let isAddFileSuccess;

    if (inventory) {
      const body = {
        id: inventory?._id,
        updates: {
          tools_name: values.tool,
          description: values.description,
          last_maintenance: values.deadline?.toISOString(),
          assigned_user: assignedUsers,
          maintenance_every: values.maintenanceEvery,
          category: values.category,
          condition: values.category,
          current_vendor: values.vendor,
        },
      };

      setIsLoading(true);

      isUpdateFormSuccess = await updateInventory(body);

      if (!isUpdateFormSuccess) {
        alert("Failed to update inventory form");
        return;
      }

      if (uploadedFiles.length > 0) {
        isAddFileSuccess = await addInventoryFile(inventory._id, uploadedFiles);

        if (!isAddFileSuccess) {
          alert("Failed to add file");
          return;
        }
      }

      alert("Successfully updating inventory");
      setUploadedFiles([]);
      setIsLoading(false);
      router.push(getFirstTwoWords(path));
    }
  }

  // async function uploadFile() {
  //   try {
  //     if (uploadedFiles.length > 0 && inventory) {
  //       // isAddFileSuccess = await addInventoryFile(inventory._id, uploadedFiles);
  //       const isAddFileSuccess = await addInventoryFile(
  //         inventory._id,
  //         uploadedFiles
  //       );

  //       if (!isAddFileSuccess) {
  //         alert("Failed to add file");
  //         return;
  //       }

  //       alert("Success Adding File");
  //       setUploadedFiles([]);
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     alert("Failed to add file");
  //   }
  // }

  // function isChangingValue(values: z.infer<typeof inventoryValidation>) {
  //   console.log("values.tool:", values.tool);
  //   console.log("inventory?.tools_name:", inventory?.tools_name);

  //   console.log("values.description:", values.description);
  //   console.log("inventory?.description:", inventory?.description);

  //   console.log("values.deadline:", values.deadline);
  //   console.log("inventoryDeadline:", inventoryDeadline);

  //   console.log("values.category:", values.category);
  //   console.log("inventory?.condition:", inventory?.condition);

  //   console.log("values.maintenanceEvery:", values.maintenanceEvery);
  //   console.log("inventory?.maintenance_every:", inventory?.maintenance_every);

  //   console.log("values.vendor.toLowerCase():", values.vendor.toLowerCase());
  //   console.log(
  //     "inventory?.current_vendor.toLowerCase():",
  //     inventory?.current_vendor?.toLowerCase()
  //   );
  //   if (
  //     values.tool !== inventory?.tools_name ||
  //     values.description !== inventory?.description ||
  //     values.deadline !== inventoryDeadline ||
  //     values.category !== inventory?.condition ||
  //     values.maintenanceEvery !== inventory?.maintenance_every ||
  //     values.vendor.toLowerCase() !== inventory?.current_vendor.toLowerCase()
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }

  function getFirstTwoWords(path: string) {
    // Split the path by '/'
    const parts = path.split("/");

    // Check if there are at least two parts after splitting
    if (parts.length >= 3) {
      // Return the first two parts with a leading '/'
      return `/${parts[1]}/${parts[2]}`;
    } else {
      // If there are less than two parts, return the original path
      return path;
    }
  }

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center w-full">
      {isLoading && <LoadingScreen text="Processing..." />}
      <div className="flex flex-col w-full xl:w-2/5 sm:border-r-light_brown sm:border-r-2 border-b-2 border-b-light_brown sm:border-b-0 px-5 xl:min-h-[50vh]">
        <h1 className="text-2xl font-bold text-dark_brown capitalize mb-8">
          Tools Details
        </h1>
        <div className="max-w-xl space-y-10">
          <InventoryForm
            form={form}
            onSubmit={onSubmit}
            isViewOnly={false}
            allVendor={allVendor}
          />
        </div>
      </div>
      <div className="xl:w-3/5 w-full space-y-10">
        <InventoryTab
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          allUsers={allUsers}
          assignedUsers={assignedUsers}
          setAssignedUsers={setAssignedUsers}
          defaultValue={`${isUpdate ? "Document" : "PIC"}`}
          isUpdate={isUpdate}
          inventory={inventory}
          isViewOnly={isViewOnly}
        />

        <button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full bg-light_brown rounded-lg px-4 py-2 hover:bg-dark_brown duration-200 text-white font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InventoryDetail;
