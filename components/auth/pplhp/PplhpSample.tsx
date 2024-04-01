import { ProjectAdminPplhpType } from "@/lib/type";
import { FC } from "react";
import { AiOutlineArrowRight, AiOutlineFile } from "react-icons/ai";
import { SamplingPplhp } from "./PplhpType";

interface PplhpSampleProps {
  samples: SamplingPplhp[];
}

const data = [
  {
    name: "Sample 1",
    url: "#",
  },
  {
    name: "Sample 2",
    url: "#",
  },
  {
    name: "Sample 3",
    url: "#",
  },
  {
    name: "Sample 4",
    url: "#",
  },
  {
    name: "Sample 5",
    url: "#",
  },
  {
    name: "Sample 6",
    url: "#",
  },
  {
    name: "Sample 7",
    url: "#",
  },
  {
    name: "Sample 8",
    url: "#",
  },
  {
    name: "Sample 9",
    url: "#",
  },
  {
    name: "Sample 10",
    url: "#",
  },
];

const PplhpSample: FC<PplhpSampleProps> = ({ samples }) => {
  return (
    <div className="w-full">
      <div className={`w-full text-light_brown space-y-6 px-10`}>
        <h2 className="text-xl text-center md:text-left">Samples</h2>
        <div className="space-y-2">
          {samples.length > 0
            ? samples.map((item) => (
                <a
                  key={item.fileId}
                  className={`grid grid-rows-12 items-center bg-white text-dark_brown px-3 md:px-5 p-2 rounded-xl max-w-3xl`}
                  href={item.fileId} //TODO: Change to actual URL
                  target="_blank"
                >
                  <div
                    className={`flex items-center justify-center bg-light_brown rounded-full h-10 w-10`}
                  >
                    <AiOutlineFile className="text-2xl text-ghost_white" />
                  </div>
                  <p className="col-start-2 col-span-6 mx-5 md:mx-0 text-sm md:text-base">
                    {item.sample_name}
                  </p>
                  <div className="col-start-8">
                    <AiOutlineArrowRight className="text-4xl" />
                  </div>
                </a>
              ))
            : "Sample not found"}
        </div>
      </div>
    </div>
  );
};

export default PplhpSample;
