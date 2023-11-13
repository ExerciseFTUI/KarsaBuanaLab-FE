"use client";
import { AiOutlineFile, AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";

const data = [
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

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen px-16 space-y-6">
      <div className="text-moss_green space-y-6">
        <h2 className="text-xl">Rekaman Sampling</h2>
        <div className="space-y-2">
          {data.map((item) => (
            <a
              key={item.id}
              className="grid grid-rows-12 items-center bg-[#e1e2d7] px-5 p-2 rounded-xl"
              href={item.link}
              target="_blank"
            >
              <div className="flex items-center justify-center bg-moss_green rounded-full h-10 w-10">
                <AiOutlineFile className="text-2xl text-ghost_white" />
              </div>
              <p className="col-start-2 col-span-6">{item.judul}</p>
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
