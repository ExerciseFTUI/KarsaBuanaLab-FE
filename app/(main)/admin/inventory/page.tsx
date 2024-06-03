import { InventoryDataTable } from "@/components/auth/inventory/InventoryDataTable";
import { getAllInventory } from "@/lib/actions/inventory.action";

const dummyData = [
  {
    _id: "1",
    tools_name: "Hammer",
    description: "Steel hammer with wooden handle",
    last_maintenance: new Date("2023-12-10T00:00:00.000Z"),
    maintenance_history: [
      new Date("2023-12-10T00:00:00.000Z"),
      new Date("2023-8-05T00:00:00.000Z"),
    ],
    maintenance_every: "6 Month",
    file_id: "abc123xyz",
    assigned_user: "John Doe",
    category: "Tools",
  },
  {
    _id: "1",
    tools_name: "Hammer",
    description: "Steel hammer with wooden handle",
    last_maintenance: new Date("2023-12-10T00:00:00.000Z"),
    maintenance_history: [
      new Date("2023-12-10T00:00:00.000Z"),
      new Date("2023-8-05T00:00:00.000Z"),
    ],
    maintenance_every: "6 Month",
    file_id: "abc123xyz",
    assigned_user: "John Doe",
    category: "Tools",
  },
];

//TODO: assigned_user masih salah

export default async function InventoryPage() {
  const inventories = await getAllInventory();

  return (
    <div>
      <InventoryDataTable datas={inventories} />
    </div>
  );
}
