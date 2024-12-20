import { InventoryDataTable } from "@/components/auth/inventory/InventoryDataTable";
import getSessionServer from "@/lib/actions/getSessionServer";
import { getInventoryByPIC } from "@/lib/actions/inventory.action";
import { redirect } from "next/navigation";

export default async function InventoryPage() {
  //Get User Data
  const data = await getSessionServer();

  if (!data?.user.id) {
    redirect("/gateway");
  }

  const inventories = await getInventoryByPIC(data?.user.id);
  const session = await getSessionServer();
  let isAdmin = false;
  if (session) {
    session.user.role === "ADMIN" ? (isAdmin = true) : (isAdmin = false);
  }

  return (
    <div>
      <InventoryDataTable datas={inventories} isAdmin={isAdmin} />
    </div>
  );
}
