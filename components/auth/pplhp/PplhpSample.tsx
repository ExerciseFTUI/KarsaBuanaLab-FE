import { FC } from "react";
import { AiOutlineArrowRight, AiOutlineFile } from "react-icons/ai";

interface PplhpSampleProps {}

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

const PplhpSample: FC<PplhpSampleProps> = () => {
  return (
    <div className="w-full">
      <div className={`w-full text-light_brown space-y-6 px-10`}>
        <h2 className="text-xl text-center md:text-left">Samples</h2>
        <div className="space-y-2">
          {data
            ? data.map((item) => (
                <a
                  key={item.name}
                  className={`grid grid-rows-12 items-center bg-white text-dark_brown px-3 md:px-5 p-2 rounded-xl max-w-3xl`}
                  href={item.url}
                  target="_blank"
                >
                  <div
                    className={`flex items-center justify-center bg-light_brown rounded-full h-10 w-10`}
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
              ))
            : "Please refresh the page"}
        </div>
      </div>
    </div>
  );
};

export default PplhpSample;
