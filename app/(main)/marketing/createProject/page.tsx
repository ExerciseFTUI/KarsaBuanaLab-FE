import Sampling from "@/components/Sampling";
import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";

export default function Home() {
  return (
    <div className=" w-fit flex ">
      <CreateProjectBaseData />
      <Sampling />
    </div>
  );
}
