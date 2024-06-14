import { PPLHPDataTable } from "@/components/auth/PplhpDataTable";
import { getAllPplhp } from "@/lib/actions/admin.action";

export const metadata = {
  title: "PPLHP",
  message: "To PPLHP Page",
};

export default async function PPLHPPage() {
  const response = await getAllPplhp();
  
  return (
    <div className="">
      <PPLHPDataTable datas={response ? response : []} />
    </div>
  );
}
