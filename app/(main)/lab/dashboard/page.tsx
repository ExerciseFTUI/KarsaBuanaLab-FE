import LabDataTable from "@/components/lab/LabDataTable";
import getSessionServer from "@/lib/actions/getSessionServer";
import { labDashboard, staffDashboard } from "@/lib/actions/lab.actions";
import { BaseApiResponse } from "@/lib/models/baseApiResponse.model";
import { LabDashboardPageColumnsType } from "@/lib/type";

export default async function Home() {
  const session = await getSessionServer();
  const user = session?.user || "";
  const role = user ? user.role.toUpperCase() : "";

  // Initialize the newRes to hold the result from the API call
  let newRes: BaseApiResponse<LabDashboardPageColumnsType[]> = {
    message: "",
    result: [],
  };

  // Fetch the dashboard data depending on the user role
  if (session && role !== "USER") {
    newRes = await labDashboard();
  } else {
    newRes = await staffDashboard();
  }

  // Update the project status if needed
  newRes.result.forEach((project: LabDashboardPageColumnsType) => {
    if (project.status === "LAB_RECEIVE") {
      project.status = "RECEIVE";
    }
  });

  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable
        data={newRes.result || []}
        link="dashboard/"
        idUser={(session && role === "USER" && session.user.id) || undefined}
        isLab={true}
      />
    </div>
  );
}
