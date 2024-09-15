"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, isValid } from "date-fns"; // Import isValid from date-fns
import Document from "@/components/pplhp/Document";
import Sampling from "@/components/marketing/createProject/Sampling";
import { BaseSample } from "@/lib/models/baseSample.model";

export default function ReviewDraftPage({
  details,
  baseSamples,
  onDetailsChange,
  params,
}: {
  details: any;
  baseSamples: BaseSample[];
  onDetailsChange: (newDetails: any) => void;
  params: { np: string; sampleId: string };
}) {
  // Check if receive_date is valid, fallback to undefined if not
  const initialDate = new Date(details.sampling.receive_date);
  const [date, setDate] = useState<Date | undefined>(
    isValid(initialDate) ? initialDate : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);

    const updatedDetails = {
      ...details,
      sampling: {
        ...details.sampling,
        receive_date: selectedDate, // Update the receive_date
      },
    };

    onDetailsChange(updatedDetails); // Pass updated details to the parent
  };

  return (
    <div className="flex-row space-y-10 max-md:flex-col max-md:items-center font-dm-sans">
      {/* project type information */}
      <div className="flex flex-row space-x-4 -mb-8 items-center justify-start ">
        <p className="text-lg font-medium text-light_brown">Tipe Proyek: </p>

        <p className="text-lg font-semibold text-black">
          {details.project_type}
        </p>
      </div>

      <Document
        data={details.files.map((file: any) => ({
          url: file.url,
          name: file.judul,
          type: "Document",
        }))}
        color="light_brown"
      />

      <Sampling
        sampleName={details.sampling.sample_name}
        regulation={details.sampling.regulation_name[0].regulation_name}
        parameters={details.sampling.param.map((item: any) => item.param)}
        index={0}
        baseSamples={baseSamples}
        deleteSample={() => {}}
        update={() => {}}
        isPPLHP={true}
        params={params}
      />

      <div className="space-y-4">
        <p className="text-lg font-medium text-light_brown">
          Tanggal Masuk sampel
        </p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                "border-light_brown border-2 py-6",
                "hover:bg-ghost_brown hover:bg-opacity-10",
                !date && "text-muted-foreground",
                "text-light_brown hover:text-light_brown"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-light_brown" />
              {date ? (
                format(date, "LLL dd, y")
              ) : (
                <span className="text-light_brown">Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
