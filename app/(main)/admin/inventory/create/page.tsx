import InventoryDetail from "@/components/auth/inventory/create/Inventory";
import InventoryForm from "@/components/auth/inventory/create/InventoryForm";
import InventoryPIC from "@/components/auth/inventory/create/InventoryPIC";
import { User } from "@/lib/models/user.model";

const allUsers: User[] = [
  {
    username: "john.doe",
    email: "john.doe@example.com",
    password: "hashed_password", // Replace with a secure password hash
    role: "admin",
    division: "engineering",
    createdAt: new Date("2024-03-27T02:17:00.000Z"),
    _id: "user_id_1", // Replace with a unique identifier
    __v: 0,
  },
  {
    username: "jane.smith",
    email: "jane.smith@example.com",
    password: "hashed_password", // Replace with a secure password hash
    role: "user",
    division: "marketing",
    createdAt: new Date("2024-03-27T02:17:00.000Z"),
    _id: "user_id_2", // Replace with a unique identifier
    __v: 0,
  },
  {
    username: "david.lee",
    email: "david.lee@example.com",
    password: "hashed_password", // Replace with a secure password hash
    role: "manager",
    division: "sales",
    createdAt: new Date("2024-03-27T02:17:00.000Z"),
    _id: "user_id_3", // Replace with a unique identifier
    __v: 0,
  },
  {
    username: "david.lee2",
    email: "david.lee@example.com",
    password: "hashed_password", // Replace with a secure password hash
    role: "manager",
    division: "sales",
    createdAt: new Date("2024-03-27T02:17:00.000Z"),
    _id: "user_id_4", // Replace with a unique identifier
    __v: 0,
  },
  {
    username: "david.le3",
    email: "david.lee@example.com",
    password: "hashed_password", // Replace with a secure password hash
    role: "manager",
    division: "sales",
    createdAt: new Date("2024-03-27T02:17:00.000Z"),
    _id: "user_id_5", // Replace with a unique identifier
    __v: 0,
  },
];

export default async function CreateInventoryPage() {
  return (
    <div className="flex overflow-auto custom-scrollbar w-full py-4 ">
      <InventoryDetail isUpdate={false} allUsers={allUsers} />
    </div>
  );
}
