import { Button } from "@/components/ui/button";
import { LineChart } from "@/components/chart/lineChart"
import { BarChart } from "@/components/chart/barChart"
import { PieChart } from "@/components/chart/pieChart"
import { BsGraphUp } from 'react-icons/bs';
import { AiFillProject, AiFillFolderAdd } from 'react-icons/ai'

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="flex items-center ">
        {/* Approved Offers */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <BsGraphUp className="text-4xl bg-light_green p-1 rounded-lg"></BsGraphUp>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>
              Approved Offers 
            </div>
            <div className=" font-semibold">
              Rp 53.232.000
            </div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="h-auto center w-1/2 md:w-1/6 align-middle rounded-lg p-3 flex items-center">
          <AiFillProject className="text-4xl bg-light_green p-1 rounded-lg"></AiFillProject>
          <div className=" text-left text-xs md:text-sm ml-1">
            <div>
              Total Projects
            </div>
            <div className=" font-semibold">
              189
            </div>
          </div>
        </div>
        
        {/* Button create new project */}
        <Button className="bg-light_green w-1/6 max-lg:hidden hover:bg-light_green text-dark_green font-bold justify-center text-xs text-center py-5">
          <AiFillFolderAdd className="text-3xl mr-3"></AiFillFolderAdd>
          Create  <br /> New Project
        </Button>
      </div>
      
      {/* Button create new project */}
        <Button className="bg-light_green w-full md:hidden hover:bg-light_green text-dark_green font-bold justify-center text-xs text-center py-5">
          <AiFillFolderAdd className="text-3xl mr-3"></AiFillFolderAdd>
          Create  <br /> New Project
        </Button>

      {/* <h1 className="text-dark_green mt-6 text-xl font-bold">Projects</h1> */}
      <div className="flex w-1/3 md:w-full overflow-x-scroll h-auto">
        <LineChart />
        <LineChart />
        <LineChart />
      </div>

      <div className=" justify-center object-center">
        <div className="flex  w-fit overflow-x-scroll md:w-1/2 h-auto">
          <BarChart/>
          {/* <PieChart/> */}
        </div>
        <div className="flex  w-fit overflow-x-scroll md:w-1/2 h-auto">
          <BarChart/>
          {/* <PieChart/> */}
        </div>
      </div>
        

    </div>
  );
}
