import { ProjectAdminPplhpType } from "@/lib/type";
import { FC } from "react";
import { AiOutlineArrowRight, AiOutlineFile } from "react-icons/ai";
import { LabFile } from "./PplhpType";

interface PplhpDocumentProps {
  document: LabFile[];
}

const data = [
  {
    name: "Document 1",
    url: "#",
  },
  {
    name: "Document 2",
    url: "#",
  },
  {
    name: "Document 3",
    url: "#",
  },
  {
    name: "Document 4",
    url: "#",
  },
  {
    name: "Document 5",
    url: "#",
  },
  {
    name: "Document 6",
    url: "#",
  },
  {
    name: "Document 7",
    url: "#",
  },
  {
    name: "Document 8",
    url: "#",
  },
  {
    name: "Document 9",
    url: "#",
  },
  {
    name: "Document 10",
    url: "#",
  },
];

const PplhpDocument: FC<PplhpDocumentProps> = ({ document }) => {
  return (
    <div className="w-full">
      <div className={`w-full text-light_brown space-y-6 px-10`}>
        <h2 className="text-xl text-center md:text-left">Document</h2>
        <div className="space-y-2">
          {document.length > 0
            ? document.map((item) => (
                <a
                  key={item._id}
                  className={`grid grid-rows-12 items-center bg-white text-dark_brown px-3 md:px-5 p-2 rounded-xl max-w-3xl`}
                  href={item.file_id} //TODO: change to actual url
                  target="_blank"
                >
                  <div
                    className={`flex items-center justify-center bg-light_brown rounded-full h-10 w-10`}
                  >
                    <AiOutlineFile className="text-2xl text-ghost_white" />
                  </div>
                  <p className="col-start-2 col-span-6 mx-5 md:mx-0 text-sm md:text-base">
                    {item.file_name}
                  </p>
                  <div className="col-start-8">
                    <AiOutlineArrowRight className="text-4xl" />
                  </div>
                </a>
              ))
            : "Document Not Found"}
        </div>
      </div>
    </div>
  );
};

export default PplhpDocument;
