import { useState, FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RiShareBoxLine } from "react-icons/ri";

interface DocumentLink {
  value: string;
  label: string;
}

interface DocumentProps {
  data: DocumentLink[];
  color: String;
}

const Document: FC<DocumentProps> = ({ data, color }) => {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-14">
      {data.map((link, index) => (
        <div className="space-y-5">
          <h1 className={`text-${color} text-lg font-semibold`}>{`Tahap ${
            index + 1
          }`}</h1>
          <div className="flex flex-wrap justify-between gap-5">
            <a
              className={`flex flex-row bg-${color} rounded-xl p-4 w-full md:w-[48\%] justify-between items-center`}
              href={link.value}
              target="_blank"
            >
              <p className="text-white text-sm">{link.name}</p>
              <RiShareBoxLine className="text-white text-3xl" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Document;
