"use client"
import { useState } from "react";
import Sampel from "@/components/pplhp/Sampel";
import Document from "@/components/pplhp/Document";
import LaporanHasilPemeriksaan from "@/components/pplhp/LaporanHasilPemeriksaan";


const sampelData = [
  {
    id: "1",
    judul: "Doc Sampel 1-name",
    link: "/link1",
  },
  {
    id: "2",
    judul: "Doc Sampel 2-name",
    link: "/link2",
  },
  {
    id: "3",
    judul: "Doc Sampel 3-name",
    link: "/link3",
  },
  {
    id: "4",
    judul: "Doc Sampel 4-name",
    link: "/link4",
  },
  {
    id: "5",
    judul: "Doc Sampel 5-name",
    link: "/link5",
  },
];

const documentData = [
  {
    judul: "Tahap 1",
    placeholder: "Tahap 1",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ]
  },
  {
    judul: "Tahap 2",
    placeholder: "Tahap 2",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ]
  },
  {
    judul: "Tahap 3",
    placeholder: "Tahap 3",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ]
  },
  {
    judul: "Tahap 4",
    placeholder: "Tahap 4",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ]
  },
];

const LaporanHasilPemeriksaanData = {
  value: "link1.",
  label: "link 1",
}

export default function Home({ params }: { params: { np: string } }) {
  const [selectedTab, setSelectedTab] = useState("Sampel");
  // Get sampel data
  // Get Document data
  // Get Laporan Hasil Pemeriksaan data
  return (
    <div className="flex flex-col md:flex-row justify-between w-full h-screen gap-36 md:gap-0">
      <div className="md:w-1/2 h-screen px-16 space-y-6">
        <div className="flex flex-row text-2xl font-medium space-x-0 cursor-pointer">
          <div
            className={`flex flex-col items-end ${selectedTab === "Sampel" ? "text-moss_green" : "text-ghost_green"
              } w-1/2`}
            onClick={() => setSelectedTab("Sampel")}
          >
            <h1 className="m-4 mx-5">Sampel</h1>
            <div
              className={`w-4/5 h-1 rounded-l-full ${selectedTab === "Sampel" ? "bg-moss_green" : "bg-ghost_green"
                } w-1/2`}
            />
          </div>
          <div
            className={`w-1/2 cursor-pointer ${selectedTab === "Dokumen" ? "text-moss_green" : "text-ghost_green"
              }`}
            onClick={() => setSelectedTab("Dokumen")}
          >
            <h1 className="m-4 mx-5">Dokumen</h1>
            <div
              className={`w-4/5 h-1  rounded-r-full ${selectedTab === "Dokumen" ? "bg-moss_green" : "bg-ghost_green"
                } w-1/2`}
            />
          </div>
        </div>

        {selectedTab === "Sampel" && (
          <Sampel data={sampelData} title="Rekaman Sampling" textColor="moss_green" bgColor="[#e1e2d7]" />
        )}
        {selectedTab === "Dokumen" && (
          <Document data={documentData} />
        )}
      </div>
      <div className="md:w-1/2">
        <LaporanHasilPemeriksaan title="Pembuatan Draft LHP" color="moss_green" link={LaporanHasilPemeriksaanData} />
      </div>
    </div>
  );
}
