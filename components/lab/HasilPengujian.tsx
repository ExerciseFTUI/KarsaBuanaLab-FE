"use client";
import { FC } from "react";
import { Separator } from "@/components/ui/separator"



interface HasilPengujianProps {
    title: string;
    regulasi: number;
    hasilUji: number;
}


const HasilPengujian: FC<HasilPengujianProps> = ({ title, regulasi, hasilUji }) => {
    return (
        <div className="h-fit text-light_brown">
            <p className="text-sm">{title}</p>
            <div className="flex space-x-4 h-fit">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col items-center space-y-1">
                        <div className="border-[3px] border-[#c7b9a7] py-2 w-36 text-center rounded-3xl text-black">{regulasi}</div>
                        <p className="text-xs">Regulasi</p>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <div className="border-[3px] border-[#c7b9a7] py-2 w-36 text-center rounded-3xl text-black">{hasilUji}</div>
                        <p className="text-xs">Hasil Uji</p>
                    </div>
                </div>
                <div className="bg-black h-10 w-[1px]" />
                <div className="gap-4 flex items-center">
                    <button className="bg-light_brown text-white py-2 w-28 text-center rounded-3xl" >Acc</button>
                    <button className="border-[3px] border-[#dfdfdf] text-[#c2c2c2] py-2 w-28 text-center rounded-3xl" >Reanalisa</button>

                </div>
            </div>
        </div>
    );
}
export default HasilPengujian;
