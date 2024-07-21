import LabDataTable from "@/components/lab/LabDataTable";
import { getLabProjects, labDashboard } from "@/lib/actions/lab.actions";
import { getProject } from "@/lib/actions/pplhp.actions";
import { getProjectByDivision } from "@/lib/actions/sampling.actions";
import { LabDashboardPageColumnsType } from "@/lib/type";

export default async function Home() {
  // const res = await getLabProjects();

  // const data = !!res
  //   ? res.result.filter((p: any) => p.lab_status === "IN REVIEW BY SPV")
  //   : [];

  // // get data from data and change the data type intoLabDashboardPageColumnsType using new const variable
  // // before, the data type is Project, but i want to change it into LabDashboardPageColumnsType
  // // so i can use it in LabDataTable
  // const newData = data.map((d: any) => {
  //   const newD: LabDashboardPageColumnsType = {
  //     _id: d._id,
  //     sample_number: d.sampling_list.sample_number,
  //     sample_name: d.sampling_list.sample_name,
  //     status: d.sampling_list.status,
  //     deadline: d.sampling_list.to,
  //   };
  //   console.log(newD);

  //   return newD;
  // });

  const newRes = await labDashboard();

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={newRes.result} link="verifikasi-data/" />
    </div>
  );
}
