"use client";
import InputDokumenDashboard from "@/components/lab/InputDokumenDashboard";
import InputDokumenFinalReview from "@/components/lab/InputDokumenFinalReview";
import ListDokumen from "@/components/lab/ListDokumen";
import { UserDataTable } from "@/components/sampling/UserDataTable";
import { groupUserStaffColumns } from "@/components/sampling/sampleListDataTables/DataTableColumns";
import { Separator } from "@/components/ui/separator";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

const dokumenData = [
  { title: "Rekaman tahap 19.1-FIK s.d 19.132-FIK", link: "/link1" },
  { title: "Judul Dokumen 2", link: "/link2" },
  { title: "Judul Dokumen 3", link: "/link3" },
];

const dummyData = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", age: 35, email: "bob@example.com" },
  // Tambahkan data dummy sesuai kebutuhan Anda
];

const inputDokumenData = [
  {
    title: "Judul Dokumen 1",
    fileName: "Nama File 1",
    color: "moss_green",
  },
  {
    title: "Judul Dokumen 2",
    fileName: "Nama File 2",
    color: "light_brown",
  },
  {
    title: "Judul Dokumen 3",
    fileName: "Nama File 3",
    color: "moss_green",
  },
];

export default function Home({ params }: { params: { np: string } }) {
  const [selectedTab, setSelectedTab] = useState("Document");

  return (
    <div className="flex flex-row justify-between m-5 mx-10 h-full">
      <div className="flex flex-col w-[45%]">
        <h1 className="text-black_brown text-2xl font-semibold pb-8">
          Lihat Dokumen
        </h1>
        <div className="space-y-5">
          {dokumenData.map((data, index) => (
            <ListDokumen
              key={index}
              title={data.title}
              link={data.link}
              color="light_brown"
            />
          ))}
        </div>
      </div>
      <Separator orientation="vertical" className="bg-light_brown" />
      <div className="flex flex-col w-[45%] relative">
        <div className="flex flex-row text-2xl font-medium space-x-0 cursor-pointer pb-10   ">
          <div
            className={`flex flex-col items-end ${
              selectedTab === "Document"
                ? "text-dark_brown"
                : "text-ghost_brown"
            } w-1/2`}
            onClick={() => setSelectedTab("Document")}
          >
            <h1 className="mb-4 mx-5">Document</h1>
            <div
              className={`w-4/5 h-1 rounded-l-full ${
                selectedTab === "Document" ? "bg-dark_brown" : "bg-ghost_brown"
              }`}
            />
          </div>
          <div
            className={`w-1/2 cursor-pointer ${
              selectedTab === "Group" ? "text-dark_brown" : "text-ghost_brown"
            }`}
            onClick={() => setSelectedTab("Group")}
          >
            <h1 className="mb-4 mx-5">Group</h1>
            <div
              className={`w-4/5 h-1 rounded-r-full ${
                selectedTab === "Group" ? "bg-dark_brown" : "bg-ghost_brown"
              }`}
            />
          </div>
        </div>
        {selectedTab === "Document" && (
          <div className="gap-4 flex flex-row flex-wrap">
            {inputDokumenData.map((data, index) => (
              <InputDokumenDashboard
                key={index} // Perhatikan penggunaan index sebagai key, ini sebaiknya digunakan jika data tidak memiliki properti unik (seperti id)
                title={data.title}
                fileName={data.fileName}
                color={data.color}
              />
            ))}
          </div>
        )}

        {selectedTab === "Group" && (
          <div className="gap-4 flex flex-row flex-wrap">
            {/* <UserDataTable table={dummyData} /> */}
          </div>
        )}

        <div className="flex flex-row absolute bottom-5 w-full justify-between">
          <button className="w-[47%] text-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown">
            Cancel
          </button>
          <button className="w-[47%] text-white bg-dark_brown font-semibold p-3 rounded-2xl border-2 border-dark_brown">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
