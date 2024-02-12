"use client";
import { AiOutlineFile, AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function SamplingTab({ data }:any) {
  const router = useRouter();
  return (
    <div className="px-16">
      <div className="text-moss_green space-y-6">
        <h2 className="text-xl">Rekaman Sampling</h2>
        <div className="space-y-2">
          {data.map((item:any) => (
            <a
              key={item.name}
              className="grid grid-rows-12 items-center bg-[#e1e2d7] px-5 p-2 rounded-xl"
              href={item.url}
              target="_blank"
            >
              <div className="flex items-center justify-center bg-moss_green rounded-full h-10 w-10 mr-2">
                <AiOutlineFile className="text-2xl text-ghost_white" />
              </div>
              <p className="col-start-2 col-span-6">{item.name}</p>
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