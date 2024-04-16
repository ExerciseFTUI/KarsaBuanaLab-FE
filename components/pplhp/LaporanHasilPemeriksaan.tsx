"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineFile } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { SelectSeparator } from "@/components/ui/select";

import { DateRange } from "react-day-picker";
import {
  changeToReview,
  changeToFinished,
  setDeadlineLHP,
} from "@/lib/actions/pplhp.actions";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Project } from "@/lib/models/project.model";
import LoadingScreen from "@/components/LoadingScreen";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"; // Ensure you have date-fns installed and imported
import { CalendarIcon } from "lucide-react"; // Ensure you have lucide-react installed and imported
import React from "react";

interface LaporanHasilPemeriksaantLink {
  url: string;
  name: string;
}

interface LaporanHasilPemeriksaanProps {
  title: string;
  color: string;
  link: LaporanHasilPemeriksaantLink;
  np: string; // Change from params to np
  context: "lhpdraft" | "finalreview"; // New prop
}

const LaporanHasilPemeriksaan: FC<LaporanHasilPemeriksaanProps> = ({
  title,
  color,
  link,
  np,
  context,
}) => {
  const router = useRouter();

  // Initialize date state with undefined values
  const [date, setDate] = useState<DateRange | undefined>();

  const handleSubmitDraft = async () => {
    try {

      let deadline = {
        from: "",
        to: "",
      };

      // Check if both from and to dates are selected and if just one is selected, save to date?.to
      if (date?.from && date?.to) {
        // Format the from and to dates into separate strings
        const formattedFrom = format(date.from, "dd-LL-y");
        const formattedTo = format(date.to, "dd-LL-y");
  
        // Prepare the deadline object with formatted dates
        deadline = {
          from: formattedFrom,
          to: formattedTo,
        };

      } else if (date?.from) {
        // Format the from date into a string
        const formattedFrom = format(date.from, "dd-LL-y");
  
        // Prepare the deadline object with formatted from date
        deadline = {
          from: formattedFrom,
          to: "",
        };

      } else {
        toast({
          title: "Failed to submit deadline",
          description: "please choose the date range",
          variant: "destructive"
        });
        return;
      }


      // Call setDeadlineLHP with the project ID (np) and the deadline string
      const response = await setDeadlineLHP(np, deadline);
      toast({
        title: "Deadline LHP submitted",
        description: "The deadline has been set",
      });

      if (context === "lhpdraft") {
        // Assuming changeToReview is the function to change the project status to "Change to Review"
        const message = await changeToReview(np);
        console.log(message);
        router.push(`/pplhp/lhpdraft`);
      } else if (context === "finalreview") {
        // Assuming changeToFinished is the function to change the project status to "Change to Finish"
        const message = await changeToFinished(np);
        console.log(message);
        router.push(`/pplhp/finalreview`);
      }
    } catch (error) {
      console.error("Failed to submit draft:", error);
    }
  };

  // Determine the button text based on the context
  const buttonText = context === "lhpdraft" ? "SUBMIT TO LAB" : "FINISH REVIEW";

  return (
    <div className="h-screen px-16 space-y-14">
      <h1 className={`text-center text-2xl font-semibold text-${color}`}>
        {title}
      </h1>
      <div className="space-y-3">
        <h2 className={`text-${color} text-xl text-center md:text-left`}>
          Laporan Hasil Pemeriksaan
        </h2>
        <div className={`bg-${color} px-6 p-5 rounded-3xl`}>
          <div className="flex items-center justify-center bg-ghost_white rounded-full h-12 w-12">
            <AiOutlineFile className={`text-3xl text-${color}`} />
          </div>
          <div className="my-5 space-y-2">
            <p className="italic text-[#9fa38f] text-sm">
              Klik doc ini untuk membuat Draft LHP
            </p>
            <SelectSeparator className="bg-pastel_moss_green" />
          </div>
          <div className="flex items-center justify-between text-ghost_white italic">
            <p>{link.name}</p>
            <a href={link.url} target="_blank">
              <BsArrowRight className="text-4xl" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <h2
          className={`text-${color} text-lg text-semibold text-center md:text-left`}
        >
          Deadline LHP
        </h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left text-base font-medium mt-3",
                `border-${color} border-2 py-6`,
                `hover:bg-gray-100`,
                !date && "text-muted-foreground",
                `text-${color} hover:text-${color}`
              )}
            >
              <CalendarIcon className={`mr-2 h-6 w-6 text-${color}`} />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span className={`text-${color}`}>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <button
          onClick={handleSubmitDraft}
          className={`w-full bg-${color} text-lg text-ghost_white p-3 rounded-2xl mb-5`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default LaporanHasilPemeriksaan;
