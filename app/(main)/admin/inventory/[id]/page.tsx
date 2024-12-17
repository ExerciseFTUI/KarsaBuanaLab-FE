import InventoryDetail from "@/components/auth/inventory/create/Inventory";
import {
  Inventory,
  InventoryUser,
  InventoryVendor,
} from "@/components/auth/inventory/InventoryType";
import {
  getAllVendor,
  getInventoryById,
  getInventoryUsers,
} from "@/lib/actions/inventory.action";
import { redirect } from "next/navigation";

export default async function InventoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  //Get All Inventory User
  const inventoryUsers: InventoryUser[] = await getInventoryUsers();

  //Get All Inventory
  const inventory: Inventory = await getInventoryById(params.id);

  //Get All Vendor
  const vendor: InventoryVendor[] = await getAllVendor();

  if (!inventory) {
    redirect("/admin/inventory");
  }

  return (
    <div className="flex overflow-auto custom-scrollbar w-full py-4 ">
      <InventoryDetail
        isUpdate={true}
        allUsers={inventoryUsers}
        inventory={inventory}
        isViewOnly={false}
        allVendor={vendor}
      />
    </div>
  );
}
