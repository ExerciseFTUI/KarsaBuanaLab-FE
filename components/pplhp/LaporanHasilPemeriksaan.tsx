"use client";
import { FC } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { SelectSeparator } from "@/components/ui/select";

interface LaporanHasilPemeriksaantLink {
  url: string;
  name: string;
}

interface LaporanHasilPemeriksaanProps {
  title: string;
  color: string;
  link: LaporanHasilPemeriksaantLink;
}

const LaporanHasilPemeriksaan: FC<LaporanHasilPemeriksaanProps> = ({
  title,
  color,
  link,
}) => {
  return (
    <div className="h-screen px-16 space-y-14">
      <h1 className={`text-center text-2xl font-semibold text-${color}`}>
        {title}
      </h1>
      <div className="space-y-3">
        <h2 className={`text-${color} text-xl text-center md:text-left`}>
          Laporan Hasil Pemeriksaan
        </h2>
        <div className={`bg-${color} px-6 p-5 rounded-3xl`}>
          <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
            <AiOutlineFile className={`text-3xl text-${color}`} />
          </div>
          <div className="my-5 space-y-2">
            <p className="italic text-[#9fa38f] text-sm">
              Klik doc ini untuk membuat Draft LHP
            </p>
            <SelectSeparator className="bg-pastel_moss_green" />
          </div>
          <div className="flex items-center justify-between text-ghost_white italic">
            <p>{link.name}</p>
            <a href={link.url} target="_blank">
              <BsArrowRight className="text-4xl" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <button
          className={`w-full bg-${color} text-lg text-ghost_white p-3 rounded-2xl`}
        >
          SUBMIT DRAFT
        </button>
      </div>
    </div>
  );
};
export default LaporanHasilPemeriksaan;