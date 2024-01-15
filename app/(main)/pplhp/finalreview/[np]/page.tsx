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
        judul: "Preparation Sampling",
        placeholder: "Preparation Sampling",
        link: [
            {
                value: "link1",
                label: "Logbook jadwal sampling",
            },
            {
                value: "link2",
                label: "Surat tugas",
            },
            {
                value: "link3",
                label: "Surat Penawaran",
            },
            {
                value: "link4",
                label: "Form Kaji Ulang",
            },
        ]
    },
    {
        judul: "Result Sampling",
        placeholder: "Result Sampling",
        link: [
            {
                value: "link1",
                label: "List pengambilan sample",
            },
            {
                value: "link2",
                label: "Berita Acara",
            },
            {
                value: "link3",
                label: "Rekaman Sampling",
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
            <div className="md:w-3/5 h-fit px-16 space-y-6">
                <div className="flex flex-row text-2xl font-medium space-x-0 cursor-pointer">
                    <div
                        className={`flex flex-col items-end ${selectedTab === "Sampel" ? "text-dark_brown" : "text-ghost_brown"
                            } w-1/2`}
                        onClick={() => setSelectedTab("Sampel")}
                    >
                        <h1 className="m-4 mx-5">Sampel</h1>
                        <div
                            className={`w-4/5 h-1 rounded-l-full ${selectedTab === "Sampel" ? "bg-dark_brown" : "bg-ghost_brown"
                                } w-1/2`}
                        />
                    </div>
                    <div
                        className={`w-1/2 cursor-pointer ${selectedTab === "Dokumen" ? "text-dark_brown" : "text-ghost_brown"
                            }`}
                        onClick={() => setSelectedTab("Dokumen")}
                    >
                        <h1 className="m-4 mx-5">Dokumen</h1>
                        <div
                            className={`w-4/5 h-1 rounded-r-full ${selectedTab === "Dokumen" ? "bg-dark_brown" : "bg-ghost_brown"
                                } w-1/2`}
                        />
                    </div>
                </div>

                {selectedTab === "Sampel" && (
                    <Sampel data={sampelData} title="Final Review Rekaman Lab" textColor="light_brown" bgColor="white" />
                )}
                {selectedTab === "Dokumen" && (
                    <Document data={documentData} color="light_brown" />
                )}
            </div>
            <div className="md:w-2/5">
                <LaporanHasilPemeriksaan title="Pengisian LHP" color="dark_brown" link={LaporanHasilPemeriksaanData} />
            </div>
        </div>
    );
}
