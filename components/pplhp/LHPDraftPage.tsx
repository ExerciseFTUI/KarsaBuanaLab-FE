"use client";
import { useState } from "react";
import Sampel from "@/components/pplhp/Sampel";
import Document from "@/components/pplhp/Document";

export default function LHPDraftPage({ linkData }) {
  const [selectedTab, setSelectedTab] = useState("Sampel");
  const sampelData = linkData.sampling_list;
  const documentData = linkData.file;
  // Get sampel data
  // Get Document data
  // Get Laporan Hasil Pemeriksaan data
  return (
    <div className="flex flex-col md:flex-row justify-between w-full h-screen gap-36 md:gap-0">
      <div className="md:w-3/5 h-fit px-16 space-y-6">
        <div className="flex flex-row text-2xl font-medium space-x-0 cursor-pointer">
          <div
            className={`flex flex-col items-end ${
              selectedTab === "Sampel" ? "text-moss_green" : "text-ghost_green"
            } w-1/2`}
            onClick={() => setSelectedTab("Sampel")}
          >
            <h1 className="m-4 mx-5">Sampel</h1>
            <div
              className={`w-4/5 h-1 rounded-l-full ${
                selectedTab === "Sampel" ? "bg-moss_green" : "bg-ghost_green"
              } w-1/2`}
            />
          </div>
          <div
            className={`w-1/2 cursor-pointer ${
              selectedTab === "Dokumen" ? "text-moss_green" : "text-ghost_green"
            }`}
            onClick={() => setSelectedTab("Dokumen")}
          >
            <h1 className="m-4 mx-5">Dokumen</h1>
            <div
              className={`w-4/5 h-1  rounded-r-full ${
                selectedTab === "Dokumen" ? "bg-moss_green" : "bg-ghost_green"
              } w-1/2`}
            />
          </div>
        </div>

        {selectedTab === "Sampel" && (
          <Sampel
            data={sampelData}
            title="Rekaman Sampling"
            textColor="moss_green"
            bgColor="[#e1e2d7]"
          />
        )}
        {selectedTab === "Dokumen" && (
          <Document data={documentData} color="moss_green" />
        )}
      </div>
    </div>
  );
}
