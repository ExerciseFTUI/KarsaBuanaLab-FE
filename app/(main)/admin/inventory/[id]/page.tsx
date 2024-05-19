import InventoryDetail from "@/components/auth/inventory/create/Inventory";
import {
  Inventory,
  InventoryUser,
} from "@/components/auth/inventory/InventoryType";
import {
  getInventoryById,
  getInventoryUsers,
} from "@/lib/actions/inventory.action";
import { redirect } from "next/navigation";

// const inventory = {
//   _id: "6606722f4b66997b4dc6edb9",
//   tools_name: "Tool 1",
//   description: "Description for Tool 1",
//   last_maintenance: "2024-03-29T07:47:59.246Z",
//   maintenance_history: [],
//   maintenance_every: "2 Month",
//   assigned_user: ["65bd86e4e29501962cc23446"],
//   category: "Materials",
//   __v: 0,
//   assigned_users: [
//     [
//       {
//         _id: "65bd86e4e29501962cc23446",
//         username: "USER_1",
//         email: "user_1@email.com",
//         password:
//           "$2b$10$Pag0t0OHoEUd9hWKjZgVfu84Va5ldO32QmMPWlax0xcb8JQSMxDiu",
//         role: "USER",
//         createdAt: "2024-02-03T00:20:52.373Z",
//         __v: 0,
//         jadwal: [],
//       },
//     ],
//   ],
//   deadline: "2024-05-29T07:47:59.246Z",
// };

// const allUsers: User[] = [
//   {
//     username: "john.doe",
//     email: "john.doe@example.com",
//     password: "hashed_password", // Replace with a secure password hash
//     role: "admin",
//     division: "engineering",
//     createdAt: new Date("2024-03-27T02:17:00.000Z"),
//     _id: "user_id_1", // Replace with a unique identifier
//     __v: 0,
//   },
//   {
//     username: "jane.smith",
//     email: "jane.smith@example.com",
//     password: "hashed_password", // Replace with a secure password hash
//     role: "user",
//     division: "marketing",
//     createdAt: new Date("2024-03-27T02:17:00.000Z"),
//     _id: "user_id_2", // Replace with a unique identifier
//     __v: 0,
//   },
//   {
//     username: "david.lee",
//     email: "david.lee@example.com",
//     password: "hashed_password", // Replace with a secure password hash
//     role: "manager",
//     division: "sales",
//     createdAt: new Date("2024-03-27T02:17:00.000Z"),
//     _id: "user_id_3", // Replace with a unique identifier
//     __v: 0,
//   },
//   {
//     username: "david.lee2",
//     email: "david.lee@example.com",
//     password: "hashed_password", // Replace with a secure password hash
//     role: "manager",
//     division: "sales",
//     createdAt: new Date("2024-03-27T02:17:00.000Z"),
//     _id: "user_id_4", // Replace with a unique identifier
//     __v: 0,
//   },
//   {
//     username: "david.le3",
//     email: "david.lee@example.com",
//     password: "hashed_password", // Replace with a secure password hash
//     role: "manager",
//     division: "sales",
//     createdAt: new Date("2024-03-27T02:17:00.000Z"),
//     _id: "user_id_5", // Replace with a unique identifier
//     __v: 0,
//   },
// ];

export default async function InventoryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const inventoryUsers: InventoryUser[] = await getInventoryUsers();

  const inventory: Inventory = await getInventoryById(params.id);

  if (!inventory) {
    redirect("/admin/inventory");
  }

  return (
    <div className="flex overflow-auto custom-scrollbar w-full py-4 ">
      <InventoryDetail
        isUpdate={true}
        allUsers={inventoryUsers}
        inventory={inventory}
      />
    </div>
  );
}
