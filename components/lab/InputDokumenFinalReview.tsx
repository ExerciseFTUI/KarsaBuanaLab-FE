"use client";
import { FC } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { SelectSeparator } from "@/components/ui/select";

interface InputDokumenFinalReviewProps {
  fileName: string;
  url: string;
  color: string;
}

const InputDokumenFinalReview: FC<InputDokumenFinalReviewProps> = ({
  fileName,
  url,
  color,
}) => {
  return (
    <div className="h-fit space-y-14">
      <div className="space-y-3">
        <div className={`bg-${color} px-6 p-5 rounded-3xl`}>
          <div className="flex items-center justify-center mx-auto bg-ghost_white rounded-full h-24 w-24">
            <AiOutlineFile className={`text-6xl text-${color}`} />
          </div>
          <div className="my-2 space-y-2">
            <p className="italic text-[#bfae98] text-xs">
              Klik doc ini untuk membuat Draft LHP
            </p>
            <SelectSeparator className="bg-pastel_moss_green" />
          </div>
          <div className="flex items-center justify-between text-ghost_white italic">
            <p className="text-sm">{fileName}</p>
            <a href={url} target="_blank">
              <BsArrowRight className="text-3xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InputDokumenFinalReview;
