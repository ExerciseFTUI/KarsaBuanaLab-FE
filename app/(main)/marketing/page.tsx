import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart } from "@/components/chart/lineChart";
import { BarChart } from "@/components/chart/barChart";
import PieChart from "@/components/chart/pieChart"
import { BsGraphUp, BsPersonCircle } from "react-icons/bs";
import { AiFillProject, AiFillFolderAdd } from "react-icons/ai";
import { getDashboard } from "@/lib/actions/marketing.actions";
import { Grab } from "lucide-react";

export default async function Home() {
  const response = await getDashboard();
  
  const detailGraph = [
    {
      title: "Project Running",
      backgroundColor: "#03fcf0",
      borderColor: "#035efc",
      salesData : response ? response.result.projectRunning : [],
    },
    {
      title: "Project Cancelled",
      backgroundColor: "#FF8383",
      borderColor: "#FF0000",
      salesData : response ? response.result.projectCancelled : [],
    },
    {
      title: "Project Finished",
      backgroundColor: "#c2fc03",
      borderColor: "#35fc03",
      salesData : response ? response.result.projectFinished : [],
    },
  ]

  return (
    <div className="w-full h-fit">
      {/* Section for Overview of Dashboard */}
      <div className="flex items-center w-full">
        {/* Approved Offers */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <BsGraphUp className="text-4xl bg-light_green p-1 rounded-lg"></BsGraphUp>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>Approved Offers</div>
            <div className=" font-semibold">{ response ? `Rp${new Intl.NumberFormat('id-ID').format(response.result.offerPerMonth.totalValuation)}` : "Please refresh the page"}</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <AiFillProject className="text-4xl bg-light_green p-1 rounded-lg"></AiFillProject>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>Total Projects</div>
            <div className=" font-semibold">{response? response.result.totalProject : "Please refresh the page"}</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <BsPersonCircle className="text-4xl bg-light_green p-1 rounded-lg"></BsPersonCircle>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>Total Clients</div>
            <div className=" font-semibold">{response? response.result.totalClient : "Please refresh the page"}</div>
          </div>
        </div>

        {/* Button create new project */}
        <Link
          className="bg-light_green rounded-md max-lg:hidden hover:bg-light_green text-dark_green font-bold justify-center text-xs text-center "
          href="/marketing/createProject"
        >
          <Button className=" bg-light_green text-dark_green hover:bg-light_green p-6 ">
            <AiFillFolderAdd className="text-3xl mr-3"></AiFillFolderAdd>
            Create <br /> New Project
          </Button>
        </Link>
      </div>

      {/* Button create new project in mobile */}
      <Button className="bg-light_green w-full md:hidden hover:bg-light_green text-dark_green font-bold justify-center md:justify-start text-xs py-5">
        <AiFillFolderAdd className="text-3xl mr-3"></AiFillFolderAdd>
        Create <br /> New Project
      </Button>

      {/* Section for chart */}
      <div className=" items-center flex flex-col justify-center pb-24 sm:pb-0 ">
        {/* <h1 className="text-dark_green mt-6 text-xl font-bold">Projects</h1> */}
        <div className=" w-full h-full justify-center md:grid md:gap-4 md:grid-cols-2">
          {detailGraph.map((graph, index) => (
            <LineChart key={index} detailGraph={graph} />
          ))}
          <PieChart detailGraph={response ? response.result.forPie : 0} />
        </div>

        {/* Bar Chart and Pie Chart  */}
        {/* <div className=" md:flex md:flex-row w-full h-full justify-around ">
          <BarChart />
        </div> */}
        {/* <BarChart /> */}
      </div>
    </div>
  );
}
