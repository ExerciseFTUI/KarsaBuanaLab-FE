import InventoryDetail from "@/components/auth/inventory/create/Inventory";
import {
  Inventory,
  InventoryUser,
} from "@/components/auth/inventory/InventoryType";
import getSessionServer from "@/lib/actions/getSessionServer";
import {
  getInventoryById,
  getInventoryUsers,
} from "@/lib/actions/inventory.action";
import { redirect } from "next/navigation";

export default async function InventoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const inventoryUsers: InventoryUser[] = await getInventoryUsers();
  const inventory: Inventory = await getInventoryById(params.id);
  const session = await getSessionServer();

  if (
    (!inventory || inventory.assigned_user[0] !== session?.user.id) &&
    session?.user.role !== "ADMIN"
  ) {
    redirect(`/denied`);
  }

  return (
    <div className="flex overflow-auto custom-scrollbar w-full py-4 ">
      <InventoryDetail
        isUpdate={true}
        allUsers={inventoryUsers}
        inventory={inventory}
        isViewOnly={true}
      />
    </div>
  );
}
