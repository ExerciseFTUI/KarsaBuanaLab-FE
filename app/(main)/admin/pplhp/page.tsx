import { PPLHPDataTable } from "@/components/auth/PplhpDataTable";
import { getProjectAdminPplhp } from "@/lib/actions/adminPplhp.action";
import { getbyStatus } from "@/lib/actions/marketing.actions";

export const metadata = {
  title: "PPLHP",
  message: "To PPLHP Page",
};

export default async function PPLHPPage() {
  const response = await getProjectAdminPplhp();

  console.log(response);

  return (
    <div className="">
      <PPLHPDataTable datas={response ? response : []} />
    </div>
  );
}
