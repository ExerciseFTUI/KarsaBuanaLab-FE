"use client";
import { FC } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { SelectSeparator } from "@/components/ui/select";


interface InputDokumenDashboardProps {
    title: string;
    fileName: string;
    color: string;
}


const InputDokumenDashboard: FC<InputDokumenDashboardProps> = ({ title, fileName, color }) => {
    return (
        <div className="h-fit w-[45%]">
            <div className="space-y-3">
                <div className={`bg-${color} px-6 p-5 rounded-3xl`}>
                    <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
                        <AiOutlineFile className={`text-3xl text-${color}`} />
                    </div>
                    <div className="my-5 space-y-2">
                        <p className="italic text-[#9fa38f] text-sm">{title}</p>
                        <SelectSeparator className="bg-pastel_moss_green" />
                    </div>
                    <div className="flex items-center justify-between text-ghost_white italic">
                        <p>{fileName}</p>
                        <a href="" target="_blank">
                            <BsArrowRight className="text-4xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InputDokumenDashboard;
