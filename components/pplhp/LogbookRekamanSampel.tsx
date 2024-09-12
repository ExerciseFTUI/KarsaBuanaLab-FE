"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { SelectSeparator } from "@/components/ui/select";
import { changeToDraft } from "@/lib/actions/pplhp.actions";

interface LogbookRekamanSampelProps {
  color: string;
  internal: string;
  external: string;
  params: { np: string };
}

const LogbookRekamanSampel: FC<LogbookRekamanSampelProps> = ({
  color,
  internal,
  external,
  params,
}) => {
  const router = useRouter();

  const handleSubmitDraft = async () => {
    try {
      const message = await changeToDraft(params.np);
      router.push(`/pplhp/lhpdraft/`);
    } catch (error) {
      console.error("Failed to submit draft:", error);
    }
  };

  return (
    <div className="h-screen pl-16 space-y-14 lg:space-y-10">
      <h1 className={`text-center text-2xl font-semibold text-${color}`}>
        Logbook Rekaman Sampel
      </h1>
      <LogbookFile
        title="Logbook Eksternal"
        fileName="Logbook Eksternal"
        link={external}
        color={color}
      />
      <LogbookFile
        title="Logbook Internal"
        fileName="Logbook Internal"
        link={internal}
        color={color}
      />
      <div>
        <button
          onClick={handleSubmitDraft}
          className={`w-full bg-${color} text-ghost_white p-3 rounded-2xl`}
        >
          save
        </button>
      </div>
    </div>
  );
};

interface LogbookFileProps {
  title: string;
  fileName: string;
  link: string;
  color: string;
}

const LogbookFile: FC<LogbookFileProps> = ({
  title,
  fileName,
  link,
  color,
}) => {
  return (
    <div
      className="space-y-3 hover:cursor-pointer"
      onClick={() => window.open(link)}
    >
      <h2 className={`text-${color} text-xl text-center md:text-left`}>
        {title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className={`w-full bg-${color} p-5 rounded-3xl`}>
          <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
            <AiOutlineFile className={`text-3xl text-${color}`} />
          </div>
          <div className="my-5 space-y-1">
            <p className="italic text-[#9fa38f] text-xs">
              Klik doc ini untuk membuat Draft LHP
            </p>
            <SelectSeparator className="bg-pastel_moss_green" />
          </div>
          <div className="flex items-center justify-between text-ghost_white italic text-sm">
            <p>{fileName}</p>
            <a href={link} target="_blank">
              <BsArrowRight className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogbookRekamanSampel;
