import ReviewDraftPage from "@/components/receive/reviewDraft/ReviewDraftPage";
import { SelectSeparator } from "@/components/ui/select";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

export default function Page() {
  return (
    <>
      <main className="flex justify-between w-full h-screen">
        <div className="w-1/2 px-2">
          <ReviewDraftPage />
        </div>
        <div className="w-1/2 h-screen px-16 space-y-14">
          <h1 className="text-center text-2xl font-semibold text-moss_green">
            Rangkaian Pengamanan Sampel
          </h1>
          <div className="space-y-3">
            <h2 className=" text-moss_green text-xl">Dokumen Log Sampel</h2>
            <div className="flex flex-col space-x-4 lg:flex-row">
              <div className="bg-moss_green px-6 p-5 rounded-3xl w-1/2">
                <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
                  <AiOutlineFile className="text-3xl text-moss_green" />
                </div>
                <div className="my-5 space-y-2">
                  <p className="italic text-[#9fa38f] text-sm">
                    28.2-FPP.Log Penerimaan dan Pendistribusian Sampel
                  </p>
                  <SelectSeparator className="bg-pastel_moss_green" />
                </div>
                <div className="flex items-center justify-between text-ghost_white italic">
                  <p>28.2-FPP.LOG PENERIMAAN DAN PENDISTRIBUSIAN SAMPEL</p>
                  <a href="" target="_blank">
                    <BsArrowRight className="text-4xl" />
                  </a>
                </div>
              </div>
              <div className="bg-light_brown px-6 p-5 rounded-3xl w-1/2">
                <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
                  <AiOutlineFile className="text-3xl text-moss_green" />
                </div>
                <div className="my-5 space-y-2">
                  <p className="italic text-[#9fa38f] text-sm">
                    28.3-FPP.Log Rangkaian Pengaman Sampel
                  </p>
                  <SelectSeparator className="bg-pastel_moss_green" />
                </div>
                <div className="flex items-center justify-between text-ghost_white italic">
                  <p>28.3-FPP.LOG RANGKAIAN PENGAMAN SAMPEL</p>
                  <a href="" target="_blank">
                    <BsArrowRight className="text-4xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="w-full bg-moss_green text-lg text-ghost_white p-3 rounded-2xl">
              SUBMIT DRAFT
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
