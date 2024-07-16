import InventoryDetail from "@/components/auth/inventory/create/Inventory";
import {
  InventoryUser,
  InventoryVendor,
} from "@/components/auth/inventory/InventoryType";
import {
  getAllVendor,
  getInventoryUsers,
} from "@/lib/actions/inventory.action";

export default async function CreateInventoryPage() {
  const inventoryUsers: InventoryUser[] = await getInventoryUsers();

  //Get All Vendor
  const vendor: InventoryVendor[] = await getAllVendor();

  return (
    <div className="flex overflow-auto custom-scrollbar w-full py-4 ">
      <InventoryDetail
        isViewOnly={false}
        isUpdate={false}
        allUsers={inventoryUsers}
        allVendor={vendor}
      />
    </div>
  );
}
