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
            <a href={link} target="_blank" >
                <div className={`bg-${color} py-10 rounded-3xl relative`}>
                    <RiShareBoxLine className="text-white text-2xl absolute top-0 right-0 m-5 mx-6" />
                    <p className="text-white mx-10 text-sm my-auto">{title}</p>
                </div>
            </a>
        </div>
    );
}
export default ListDokumen;
