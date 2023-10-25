import Sampling from "@/components/Sampling";
import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";

export default function Home() {
  return (
    <div className=" w-full flex justify-between gap-6 max-xl:flex-col max-xl:items-center px-5">
      <CreateProjectBaseData />
      <div className="">
        <Sampling />
      </div>
    </div>
  );
}
