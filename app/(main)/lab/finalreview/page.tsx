import LabDataTable from "@/components/lab/LabDataTable";
import { getProject } from "@/lib/actions/pplhp.actions";
import { Project } from "@/lib/models/project.model";

const data = [
  {
    id: "1",
    noPenawaran: "PNW1",
    judul: "Project 1 daaaa",
    cp: "Contact Person 1",
    lokasi: "Location 1 dad",
    lokasiPengambilanSampel: "Jl kukusan",
  },
  {
    id: "2",
    noPenawaran: "PNW2",
    judul: "Project 2",
    cp: "Contact Person 2",
    lokasi: "Location 2",
    lokasiPengambilanSampel: "Jl. Mawar",
  },
  {
    id: "3",
    noPenawaran: "PNW3",
    judul: "Project 3",
    cp: "Contact Person 3",
    lokasi: "Location 3",
    lokasiPengambilanSampel: "Jl. Kenari",
  },
  {
    id: "4",
    noPenawaran: "PNW4",
    judul: "Project 4",
    cp: "Contact Person 4",
    lokasi: "Location 4",
    lokasiPengambilanSampel: "Jl. Melati",
  },
  {
    id: "5",
    noPenawaran: "PNW5",
    judul: "Project 5",
    cp: "Contact Person 5",
    lokasi: "Location 5",
    lokasiPengambilanSampel: "Jl. Dahlia",
  },
  {
    id: "6",
    noPenawaran: "PNW6",
    judul: "Project 6",
    cp: "Contact Person 6",
    lokasi: "Location 6",
    lokasiPengambilanSampel: "Jl. Anggrek",
  },
  {
    id: "7",
    noPenawaran: "PNW7",
    judul: "Project 7",
    cp: "Contact Person 7",
    lokasi: "Location 7",
    lokasiPengambilanSampel: "Jl. Kenanga",
  },
  {
    id: "8",
    noPenawaran: "PNW8",
    judul: "Project 8",
    cp: "Contact Person 8",
    lokasi: "Location 8",
    lokasiPengambilanSampel: "Jl. Cempaka",
  },
  {
    id: "9",
    noPenawaran: "PNW9",
    judul: "Project 9",
    cp: "Contact Person 9",
    lokasi: "Location 9",
    lokasiPengambilanSampel: "Jl. Surya",
  },
  {
    id: "10",
    noPenawaran: "PNW10",
    judul: "Project 10",
    cp: "Contact Person 10",
    lokasi: "Location 10",
    lokasiPengambilanSampel: "Jl. Pelangi",
  },
  {
    id: "11",
    noPenawaran: "PNW11",
    judul: "Project 11",
    cp: "Contact Person 11",
    lokasi: "Location 11",
    lokasiPengambilanSampel: "Jl. Matahari",
  },
  {
    id: "12",
    noPenawaran: "PNW12",
    judul: "Project 12",
    cp: "Contact Person 12",
    lokasi: "Location 12",
    lokasiPengambilanSampel: "Jl. Bunga",
  },
  {
    id: "13",
    noPenawaran: "PNW13",
    judul: "Project 13",
    cp: "Contact Person 13",
    lokasi: "Location 13",
    lokasiPengambilanSampel: "Jl. Nusa Indah",
  },
  {
    id: "14",
    noPenawaran: "PNW14",
    judul: "Project 14",
    cp: "Contact Person 14",
    lokasi: "Location 14",
    lokasiPengambilanSampel: "Jl. Bumi Damai",
  },
  {
    id: "15",
    noPenawaran: "PNW15",
    judul: "Project 15",
    cp: "Contact Person 15",
    lokasi: "Location 15",
    lokasiPengambilanSampel: "Jl. Purnama",
  },
  {
    id: "16",
    noPenawaran: "PNW16",
    judul: "Project 16",
    cp: "Contact Person 16",
    lokasi: "Location 16",
    lokasiPengambilanSampel: "Jl. Taman Sari",
  },
  {
    id: "17",
    noPenawaran: "PNW17",
    judul: "Project 17",
    cp: "Contact Person 17",
    lokasi: "Location 17",
    lokasiPengambilanSampel: "Jl. Harmoni",
  },
  {
    id: "18",
    noPenawaran: "PNW18",
    judul: "Project 18",
    cp: "Contact Person 18",
    lokasi: "Location 18",
    lokasiPengambilanSampel: "Jl. Seruni",
  },
  {
    id: "19",
    noPenawaran: "PNW19",
    judul: "Project 19",
    cp: "Contact Person 19",
    lokasi: "Location 19",
    lokasiPengambilanSampel: "Jl. Rafflesia",
  },
  {
    id: "20",
    noPenawaran: "PNW20",
    judul: "Project 20",
    cp: "Contact Person 20",
    lokasi: "Location 20",
    lokasiPengambilanSampel: "Jl. Flamboyan",
  }
];

export default async function Home() {
  const projects = await getProject("running");
  console.log(projects)
  return (
    <div className="flex justify-between w-full h-screen">
      <LabDataTable data={projects} link="finalreview/" />
    </div>
  );
}