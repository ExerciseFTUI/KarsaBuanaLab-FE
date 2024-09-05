"use client";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, differenceInCalendarDays } from "date-fns";
import Document from "@/components/pplhp/Document";
import { BaseSample } from "@/lib/models/baseSample.model";
import Sampling from "@/components/marketing/createProject/Sampling";

export default function ReviewDraftPage({ details }: { details: any }) {
  const [openModal, setOpenModal] = useState(false);
  const sampleForm = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      regulation: "",
      parameters: [""],
    },
  });

  const { control, watch, setValue, resetField } = sampleForm;

  const arrayField = useFieldArray({
    control,
    name: "samples",
  });

  //All the samples get save in here
  const { fields: samples, append, remove, update } = arrayField;

  function deleteSample(index: number) {
    remove(index);
  }
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="flex-row space-y-10 max-md:flex-col max-md:items-center font-dm-sans">
      <Document
        data={details.files.map((file: any) => ({
          url: file.url,
          name: file.judul,
          type: "Document",
        }))}
        color="light_brown"
      />

      {details.sampling.map((data: any, index: number) => (
        <Sampling
          key={index}
          sampleName={data.sample_name}
          regulation={data.regulation_name[0].regulation_name}
          parameters={data.param.map((item: any) => item.param)}
          index={index}
          deleteSample={() => deleteSample(index)}
          update={update}
        />
      ))}
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
                <>{format(date, "LLL dd, y")}</>
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
              onSelect={setDate}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
