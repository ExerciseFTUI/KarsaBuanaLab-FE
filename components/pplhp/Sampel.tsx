import { FC } from "react";
import { AiOutlineFile, AiOutlineArrowRight } from "react-icons/ai";
import { getLinkFiles } from "@/lib/actions/receive.actions";

interface SampelData {
  name: string;
  url: string;
}

interface SampelProps {
  data: SampelData[];
  title: string;
  textColor: string;
  bgColor: string;
}

const Sampel: FC<SampelProps> = ({ data, title, textColor, bgColor }) => {
  return (
    <div className="w-full">
      <div className={`w-full text-${textColor} space-y-6`}>
        <h2 className="text-xl text-center md:text-left">{title}</h2>
        <div className="space-y-2">
          {data.map((item) => (
            <a
              key={item.name}
              className={`grid grid-rows-12 items-center bg-${bgColor} text-dark_brown px-3 md:px-5 p-2 rounded-xl`}
              href={item.url}
              target="_blank"
            >
              <div
                className={`flex items-center justify-center bg-${textColor} rounded-full h-10 w-10`}
              >
                <AiOutlineFile className="text-2xl text-ghost_white" />
              </div>
              <p className="col-start-2 col-span-6 mx-5 md:mx-0 text-sm md:text-base">
                {item.name}
              </p>
              <div className="col-start-8">
                <AiOutlineArrowRight className="text-4xl" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sampel;
