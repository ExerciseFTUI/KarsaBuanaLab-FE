import { PPLHPDataTable } from "@/components/auth/PplhpDataTable";
import { getbyStatus } from "@/lib/actions/marketing.actions";

export const metadata = {
  title: "PPLHP",
  message: "To PPLHP Page",
};

export default async function PPLHPPage() {
  const response = await getbyStatus("running");

  return (
    <div className="">
      <PPLHPDataTable datas={response ? response.result : []} />
    </div>
  );
}
