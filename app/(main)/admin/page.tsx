import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { UserType } from "@/lib/type";

const dummyUsers: UserType[] = [
  {
    name: "John Doe",
    email: "john.doe@example.com",

    role: "user",
    division: "sales",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",

    role: "admin",
    division: "marketing",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",

    role: "user",
    division: "customer-service",
  },
  {
    name: "Bob Thompson",
    email: "bob.thompson@example.com",

    role: "user",
    division: "operations",
  },
  {
    name: "Eva Davis",
    email: "eva.davis@example.com",

    role: "admin",
    division: "human-resources",
  },
];

export default function AdminPage() {
  // const response = await getbyStatus("running");

  return (
    <div className="flex justify-between w-full h-screen">
      {/* <RunningTable projects={projects.result} /> */}
      <AdminDataTable datas={dummyUsers} />
    </div>
  );
}
