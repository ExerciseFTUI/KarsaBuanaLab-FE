import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LineChart } from "@/components/chart/lineChart";
import { BarChart } from "@/components/chart/barChart";
// import { PieChart } from "@/components/chart/pieChart"
import { BsGraphUp, BsPersonCircle } from "react-icons/bs";
import { AiFillProject, AiFillFolderAdd } from "react-icons/ai";
import { getDashboard } from "@/lib/actions/marketing.actions";

export default async function Home() {
  const response = await getDashboard();
  
  const detailGraph = [
    {
      title: "Project Running",
      backgroundColor: "#03fcf0",
      borderColor: "#035efc",
      salesData : [
        { month: "Jan", sales: 23 },
        { month: "Feb", sales: 15 },
        { month: "Mar", sales: 20 },
        { month: "Apr", sales: 12 },
        { month: "Mei", sales: 18 },
        { month: "Jun", sales: 25 },
        { month: "Jul", sales: 12 },
        { month: "Aug", sales: 20 },
        { month: "Sep", sales: 20 },
        { month: "Oct", sales: 20 },
        { month: "Nov", sales: 15 },
        { month: "Dec", sales: 25 },
      ],
    },
    {
      title: "Project Cancelled",
      backgroundColor: "#FF8383",
      borderColor: "#FF0000",
      salesData : [
        { month: "Jan", sales: 15 },
        { month: "Feb", sales: 10 },
        { month: "Mar", sales: 12 },
        { month: "Apr", sales: 8 },
        { month: "May", sales: 14 },
        { month: "Jun", sales: 10 },
        { month: "Jul", sales: 10 },
        { month: "Aug", sales: 14 },
        { month: "Sep", sales: 14 },
        { month: "Oct", sales: 14 },
        { month: "Nov", sales: 10 },
        { month: "Dec", sales: 15 },
      ],
    },
    {
      title: "Project Finished",
      backgroundColor: "#c2fc03",
      borderColor: "#35fc03",
      salesData : [
        { month: "Jan", sales: 30 },
        { month: "Feb", sales: 18 },
        { month: "Mar", sales: 25 },
        { month: "Apr", sales: 15 },
        { month: "May", sales: 22 },
        { month: "Jun", sales: 28 },
        { month: "Jul", sales: 18 },
        { month: "Aug", sales: 25 },
        { month: "Sep", sales: 22 },
        { month: "Oct", sales: 24 },
        { month: "Nov", sales: 18 },
        { month: "Dec", sales: 30 },
      ],
    },
  ]

  return (
    <div className="w-full h-screen ">
      {/* Section for Overview of Dashboard */}
      <div className="flex items-center w-full">
        {/* Approved Offers */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <BsGraphUp className="text-4xl bg-light_green p-1 rounded-lg"></BsGraphUp>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>Approved Offers</div>
            <div className=" font-semibold">Rp 53.232.000</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <AiFillProject className="text-4xl bg-light_green p-1 rounded-lg"></AiFillProject>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>Total Projects</div>
            <div className=" font-semibold">{response.result.totalProject}</div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <BsPersonCircle className="text-4xl bg-light_green p-1 rounded-lg"></BsPersonCircle>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>Total Clients</div>
            <div className=" font-semibold">{response.result.totalClient}</div>
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
        <div className=" md:flex w-full h-full md:flex-row justify-center">
          {detailGraph.map((graph, index) => (
            <LineChart key={index} detailGraph={graph} />
          ))}
        </div>

        {/* Bar Chart and Pie Chart  */}
        <div className=" md:flex w-full h-auto justify-around ">
          <BarChart />
          <BarChart />
        </div>
      </div>
    </div>
  );
}
