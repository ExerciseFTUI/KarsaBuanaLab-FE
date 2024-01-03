// import CancelledTable from "@/components/marketing/Tables/CancelledTable";
import { DataTable } from "@/components/DataTable";
import { getbyStatus } from "@/lib/actions/marketing.actions";
import { redirect } from "next/navigation";

export default async function Home() {
  const projects = await getbyStatus("cancelled");

  if (!projects.result) {
    redirect("/marketing");
  }

  return (
    <div className="flex justify-between w-full h-screen">
      {/* <CancelledTable projects={projects.result} /> */}
      <DataTable datas={projects.result} />
    </div>
  );
}
