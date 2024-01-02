import CancelledTable from "@/components/marketing/Tables/CancelledTable";
import { getbyStatus } from "@/lib/actions/marketing.actions";

export default async function Home() {
  const projects = await getbyStatus("cancelled");

  return (
    <div className="flex justify-between w-full h-screen">
      <CancelledTable projects={projects.result} />
    </div>
  );
}
