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

interface InventoryFormProps {
  form: UseFormReturn<z.infer<typeof inventoryValidation>>;
  onSubmit(values: z.infer<typeof inventoryValidation>): Promise<void>;
}

const InventoryForm: FC<InventoryFormProps> = ({ form, onSubmit }) => {
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
        <div className="">
          <FormLabel className="text-light_brown">Deadline Tools</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
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
        <Button
          onClick={() => {
            form.handleSubmit(onSubmit);
          }}
          className="w-full hover:bg-dark_brown bg-light_brown mt-3"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default InventoryForm;
