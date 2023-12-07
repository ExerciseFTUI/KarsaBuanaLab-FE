import { SelectSeparator } from "@/components/ui/select";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-between w-full h-screen">
          {children}
          <div className="w-1/2 h-screen px-16 space-y-14">
              <h1 className="text-center text-2xl font-semibold text-moss_green">Pembuatan Draft LHP</h1>
              <div className="space-y-3">
                  <h2 className="text-moss_green text-xl">Laporan Hasil Pemeriksaan</h2>
                  <div  className="bg-moss_green px-6 p-5 rounded-3xl">
                      <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
                            <AiOutlineFile className="text-3xl text-moss_green" />
                      </div>
                      <div className="my-5 space-y-2">
                          <p className="italic text-[#9fa38f] text-sm">Klik doc ini untuk membuat Draft LHP</p>
                          <SelectSeparator className="bg-pastel_moss_green" />
                      </div>
                      <div className="flex items-center justify-between text-ghost_white italic">
                          <p>nama-file-buat.doc</p>
                          <a href="" target="_blank">
                              <BsArrowRight className="text-4xl" />
                          </a>
                      </div>
                  </div>
              </div>
              <div>
                  <button className="w-full bg-moss_green text-lg text-ghost_white p-3 rounded-2xl">SUBMIT DRAFT</button>
              </div>
          </div>
    </main>
  );
}
