import { FC } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { SelectSeparator } from "@/components/ui/select";

interface RangkaianPengamananSampelLink {
  value: string;
  label: string;
}

interface RangkaianPengamananSampelProps {
  title: string;
  color: string;
  link: RangkaianPengamananSampelLink[];
}

const RangkaianPengamananSampel: FC<RangkaianPengamananSampelProps> = ({
  title,
  color,
  link,
}) => {
  return (
    <div className="h-screen px-16 space-y-14 lg:space-y-10">
      <h1 className={`text-center text-2xl font-semibold text-${color}`}>
        Rangkaian Pengamanan Sampel
      </h1>
      <div className="space-y-3">
        <h2 className={`text-${color} text-xl text-center md:text-left`}>
          Dokumen Log Sampel
        </h2>
        <div className="flex flex-col lg:space-x-4 lg:flex-row gap-5">
          {link.map((item, index) => (
            <div
              key={index}
              className={`bg-${color} px-6 p-5 rounded-3xl lg:w-[200px]`}
            >
              <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
                <AiOutlineFile className={`text-3xl text-${color}`} />
              </div>
              <div className="my-5 space-y-2">
                <p className="italic text-[#9fa38f] text-sm">{item.label}</p>
                <SelectSeparator className="bg-pastel_moss_green" />
              </div>
              <div className="flex items-center justify-between text-ghost_white italic">
                <p>{item.label}</p>
                <a href={item.value} target="_blank">
                  <BsArrowRight className="text-4xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          className={`w-full bg-${color} text-lg text-ghost_white p-3 rounded-2xl`}
        >
          SUBMIT DRAFT
        </button>
      </div>
    </div>
  );
};

{
  /* <div className="w-full lg:w-1/2 px-4 mt-14 lg:mt-0 lg:px-16 space-y-4 lg:space-y-14 ">
          <h1 className="text-center text-2xl font-semibold text-moss_green">
            Rangkaian Pengamanan Sampel
          </h1>
          <div className="space-y-3">
            <h2 className="text-moss_green text-xl">Dokumen Log Sampel</h2>
            <div className="flex flex-col  lg:space-x-4 lg:flex-row gap-5">
              <div className="bg-moss_green px-6 p-5 rounded-3xl flex-1">
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
              <div className="bg-light_brown px-6 p-5 rounded-3xl flex-1">
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
        </div> */
}
export default RangkaianPengamananSampel;
