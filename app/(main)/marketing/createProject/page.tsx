import Dropzone from "@/components/Dropzone";
import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";

export default function Home() {
    return (
        <div className=" w-fit flex justify-between items-center">
            <CreateProjectBaseData/>
            <Dropzone/>
        </div>
    )
}