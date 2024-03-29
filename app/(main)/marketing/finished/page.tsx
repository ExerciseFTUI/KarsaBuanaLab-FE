import { DataTable } from "@/components/DataTable";
import { getbyStatus } from "@/lib/actions/marketing.actions";

export default async function Home() {
  const response = await getbyStatus("finished");

  return (
    <div className="flex justify-between w-full h-screen">
      <DataTable datas={response ? response.result : []} status="FINISHED"/>
    </div>
  );
}
