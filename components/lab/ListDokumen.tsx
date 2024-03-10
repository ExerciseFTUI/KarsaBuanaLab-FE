"use client";
import { FC } from "react";
import { RiShareBoxLine } from "react-icons/ri";

interface ListDokumenProps {
  title: string;
  link: string;
  color: string;
}

const ListDokumen: FC<ListDokumenProps> = ({ title, link, color }) => {
  return (
    <div className="h-fit">
      <a href={link} target="_blank">
        <div
          className={`bg-${color} py-10 rounded-3xl flex justify-between items-center px-6 gap-6`}
        >
          <p className="text-white text-sm my-auto">{title}</p>
          <RiShareBoxLine className="text-white text-2xl" />
        </div>
      </a>
    </div>
  );
};
export default ListDokumen;
