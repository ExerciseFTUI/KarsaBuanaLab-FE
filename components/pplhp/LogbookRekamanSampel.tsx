"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { submitDetailPPLHP } from "@/lib/actions/pplhp.actions";
import { log } from "node:console";
import { toast } from "../ui/use-toast";
import { useToast } from "@/components/ui/use-toast";

interface LogbookRekamanSampelProps {
  color: string;
  internal: string;
  external: string;
  data: any;
  onDetailsChange: (newDetails: any) => void;
  params: { np: string; sampleId: string };
}

const LogbookRekamanSampel: FC<LogbookRekamanSampelProps> = ({
  color,
  internal,
  external,
  data,
  onDetailsChange,
  params,
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmitDraft = async () => {
    try {
      const updatedDetails = { ...data, draftStatus: "submitted" };
      onDetailsChange(updatedDetails);

      // update the data.sampling.status = "ACCEPTED"
      const submitData = {
        sampling: { ...data.sampling, status: "LAB_RECEIVE" },
      };

      const response = await submitDetailPPLHP(
        params.np,
        params.sampleId,
        submitData
      );

      if (response) {
        console.log("response", response);
        toast({
          title: "Successfully updated data",
          description: "The project already in lab division",
        });
        router.push(`/pplhp/receive/`);
        return;
      } else {
        toast({
          title: "Failed to update data",
          description: "Please try again",
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Failed to submit draft:", error);
    }
  };

  return (
    <div className="h-screen pl-16 space-y-14 lg:space-y-10">
      <h1 className={`text-center text-2xl font-semibold text-${color}`}>
        Logbook Rekaman Sampel
      </h1>
      {data.project_type && data.project_type.toLowerCase() === "internal" ? (
        <LogbookFile
          title="Logbook Internal"
          fileName="Logbook Internal"
          link={internal}
          color={color}
        />
      ) : data.project_type &&
        data.project_type.toLowerCase() === "external" ? (
        <LogbookFile
          title="Logbook Eksternal"
          fileName="Logbook Eksternal"
          link={external}
          color={color}
        />
      ) : (
        <div> The project type data hasn't been set</div>
      )}

      <div>
        <button
          onClick={handleSubmitDraft}
          className={`w-full bg-${color} text-ghost_white p-3 rounded-2xl`}
        >
          Save
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
