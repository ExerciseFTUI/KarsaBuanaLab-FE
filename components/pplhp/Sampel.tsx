"use client";
import { FC } from "react";
import { AiOutlineFile, AiOutlineArrowRight } from "react-icons/ai";


interface SampelData {
  id: string;
  judul: string;
  link: string;
}


interface SampelProps {
    data: SampelData[];
    title: string;
    textColor: string;
    bgColor: string;
}


const Sampel: FC<SampelProps> = ({ data, title, textColor, bgColor }) => {
    return (
        <div className="w-full">
            <div className={`w-full text-${textColor} space-y-6`}>
                <h2 className="text-xl">{title}</h2>
                <div className="space-y-2">
                    {data.map((item) => (
                        <a
                            key={item.id}
                            className={`grid grid-rows-12 items-center bg-${bgColor} text-dark_brown px-5 p-2 rounded-xl`}
                            href={item.link}
                            target="_blank"
                        >
                            <div className={`flex items-center justify-center bg-${textColor} rounded-full h-10 w-10`}>
                                <AiOutlineFile className="text-2xl text-ghost_white" />
                            </div>
                            <p className="col-start-2 col-span-6">{item.judul}</p>
                            <div className="col-start-8">
                                <AiOutlineArrowRight className="text-4xl" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Sampel;
