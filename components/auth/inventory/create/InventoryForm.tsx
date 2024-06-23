"use client";

import { FC, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { inventoryValidation } from "../InventoryValidation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import InventoryComboBox from "../InventoryComboBox";
import { InventoryVendor } from "../InventoryType";

const mockVendor: InventoryVendor[] = [
  {
    param: "Temperature",
    regulation: "ISO 9001",
    _id: "1a2b3c4d5e6f7g8h9i0j",
    sample_name: "Sample A",
    file_id: "file123",
    file_safety_id: "safety123",
    __v: 0,
  },
  {
    param: "pH Level",
    regulation: "ISO 14001",
    _id: "1a2b3c4d5e6f7g8h9i1j",
    sample_name: "Sample B",
    file_id: "file124",
    file_safety_id: "safety124",
    __v: 0,
  },
  {
    param: "Conductivity",
    regulation: "ISO 17025",
    _id: "1a2b3c4d5e6f7g8h9i2j",
    sample_name: "Sample C",
    file_id: "file125",
    file_safety_id: "safety125",
    __v: 0,
  },
  {
    param: "Salinity",
    regulation: "ISO 22000",
    _id: "1a2b3c4d5e6f7g8h9i3j",
    sample_name: "Sample D",
    file_id: "file126",
    file_safety_id: "safety126",
    __v: 0,
  },
  {
    param: "Dissolved Oxygen",
    regulation: "ISO 45001",
    _id: "1a2b3c4d5e6f7g8h9i4j",
    sample_name: "Sample E",
    file_id: "file127",
    file_safety_id: "safety127",
    __v: 0,
  },
];

interface InventoryFormProps {
  form: UseFormReturn<z.infer<typeof inventoryValidation>>;
  onSubmit(values: z.infer<typeof inventoryValidation>): Promise<void>;
  isViewOnly: boolean;
}

const InventoryForm: FC<InventoryFormProps> = ({
  form,
  onSubmit,
  isViewOnly,
}) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(form.watch("deadline"));
  }, []);

  const { watch } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="tool"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light_brown">Tools Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isViewOnly}
                  className={`rounded-2xl px-5 py-5 border-light_brown border-2 focus-visible:ring-0 ${
                    watch("tool").length > 0 ? "opacity-100" : "opacity-50"
                  }  focus:opacity-100 placeholder:text-light_brown text-light_brown`}
                  {...field}
                  placeholder="Tools name"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light_brown">Description</FormLabel>
              <FormControl>
                <Input
                  disabled={isViewOnly}
                  className={`rounded-2xl px-5 py-5 border-light_brown border-2 focus-visible:ring-0 ${
                    watch("description").length > 0
                      ? "opacity-100"
                      : "opacity-50"
                  }  focus:opacity-100 placeholder:text-light_brown text-light_brown`}
                  {...field}
                  placeholder="Add your description here"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light_brown">Category</FormLabel>
              <Select
                disabled={isViewOnly}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-light_brown border-light_brown border-2 focus:ring-0">
                    <SelectValue
                      className="text-light_brown"
                      placeholder="Select the maintenance"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-sm text-light_brown">
                  <SelectItem className="p-3" value="Tools">
                    Tools
                  </SelectItem>
                  <SelectItem className="p-3" value="Materials">
                    Materials
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full  gap-y-3">
          <FormLabel className="text-light_brown">Vendor</FormLabel>
          <InventoryComboBox
            sample="sample"
            setSample={() => {}}
            baseSample={mockVendor}
            form={form}
            isDisabled={isViewOnly}
          />
        </div>
        <FormField
          control={form.control}
          name="maintenanceEvery"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light_brown">
                Maintenance Every
              </FormLabel>
              <Select
                disabled={isViewOnly}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-light_brown border-light_brown border-2 focus:ring-0">
                    <SelectValue placeholder="Select the maintenance" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-sm text-light_brown">
                  <SelectItem className="p-3" value="1 Month">
                    1 Month
                  </SelectItem>
                  <SelectItem className="p-3" value="2 Month">
                    2 Month
                  </SelectItem>
                  <SelectItem className="p-3" value="3 Month">
                    3 Month
                  </SelectItem>
                  <SelectItem className="p-3" value="4 Month">
                    4 Month
                  </SelectItem>
                  <SelectItem className="p-3" value="6 Month">
                    6 Month
                  </SelectItem>
                  <SelectItem className="p-3" value="1 Year">
                    1 Year
                  </SelectItem>
                  <SelectItem className="p-3" value="2 Year">
                    2 Year
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="">
          <FormLabel className="text-light_brown">Deadline Tools</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={isViewOnly}
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left text-base font-medium mt-2",
                  "border-light_brown border-2 py-6",
                  "hover:bg-ghost_brown hover:bg-opacity-10",
                  !date && "text-muted-foreground",
                  "text-light_brown hover:text-light_brown",
                  "opacity-100 "
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                className="border rounded-lg text-dark_brown  border-light_brown "
                classNames={{
                  day_selected:
                    "bg-light_brown text-primary-foreground hover:bg-light_brown hover:text-primary-foreground focus:bg-light_brown focus:text-primary-foreground",
                }}
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  form.setValue("deadline", date);
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <Button
          onClick={() => {
            form.handleSubmit(onSubmit);
          }}
          className="w-full hover:bg-dark_brown bg-light_brown mt-3"
        >
          Submit
        </Button> */}
      </form>
    </Form>
  );
};

export default InventoryForm;
