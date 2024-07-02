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
import { InventoryVendor, inventoryConditionEnum } from "../InventoryType";

interface InventoryFormProps {
  form: UseFormReturn<z.infer<typeof inventoryValidation>>;
  onSubmit(values: z.infer<typeof inventoryValidation>): Promise<void>;
  isViewOnly: boolean;
  allVendor: InventoryVendor[];
}

const InventoryForm: FC<InventoryFormProps> = ({
  form,
  onSubmit,
  isViewOnly,
  allVendor,
}) => {
  const [date, setDate] = useState<Date>();
  const [vendor, setVendor] = useState("");

  useEffect(() => {
    setDate(form.watch("deadline"));
    setVendor(form.watch("vendor"));
  }, []);

  const {
    watch,
    formState: { errors },
  } = form;

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
              <FormLabel className="text-light_brown">Merk</FormLabel>
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
              <FormLabel className="text-light_brown">Condition</FormLabel>
              <Select
                disabled={isViewOnly}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-light_brown border-light_brown border-2 focus:ring-0">
                    <SelectValue
                      className="text-light_brown"
                      placeholder="Select the Condition"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-sm text-light_brown">
                  {inventoryConditionEnum.map((condition, index) => (
                    <SelectItem
                      key={index + condition}
                      className="p-3"
                      value={condition}
                    >
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col w-full  gap-y-3">
          <FormLabel className="text-light_brown">Vendor</FormLabel>
          <InventoryComboBox
            sample={vendor}
            setSample={(vendor: string) => {
              setVendor(vendor);
              form.setValue("vendor", vendor);
            }}
            baseSample={allVendor}
            form={form}
            isDisabled={isViewOnly}
          />
          {errors.vendor && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.vendor.message}
            </p>
          )}
        </div>
        <FormField
          control={form.control}
          name="maintenanceEvery"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-light_brown">Kalibrasi</FormLabel>
              <Select
                disabled={isViewOnly}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="text-light_brown border-light_brown border-2 focus:ring-0">
                    <SelectValue placeholder="Calibrate Every" />
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
        {/* <Button className="w-full hover:bg-dark_brown bg-light_brown mt-3">
          Submit
        </Button> */}
      </form>
    </Form>
  );
};

export default InventoryForm;
