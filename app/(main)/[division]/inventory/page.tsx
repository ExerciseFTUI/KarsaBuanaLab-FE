import { InventoryDataTable } from "@/components/auth/inventory/InventoryDataTable";
import { getAllInventory } from "@/lib/actions/inventory.action";

export default async function InventoryPage() {
  //TODO: Change the API
  const inventories = await getAllInventory();

  return (
    <div>
      <InventoryDataTable datas={inventories} />
    </div>
  );
}
