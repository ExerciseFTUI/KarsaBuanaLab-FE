import React, { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea"
import { scheduleValidation } from "@/lib/validations/ScheduleValidation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm, useFormContext } from "react-hook-form";

interface ScheduleProps {

}

const Schedule: FC<ScheduleProps> = () => {
    // 1. Define your form.
  const form = useForm<z.infer<typeof scheduleValidation>>({
    resolver: zodResolver(scheduleValidation),
    defaultValues: {
      comment: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof scheduleValidation>) {
    // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values.comment);
  }
    return (
        <section className="mt-4 m-10">
            <h1 className="text-2xl font-bold">Schedule Logbook</h1>
            <div className="bg-[#bbbabf] w-full h-0.5 m-2"/>
            <a href="/" target="_blank">
                <Button className="w-full bg-moss_green justify-center rounded-xl text-xl text-ghost_white py-2 mt-6 hover:bg-black_brown">
                    Schedule
                </Button>
            </a>
            <div className="mt-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
                        <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-semibold text-[#bbbabf] text-lg">Notes Here</FormLabel>
                            <FormControl>
                                <Textarea className="border-2 border-[#bbbabf] rounded-lg h-24" {...field} />
                            </FormControl>
                            </FormItem>
                        )}
                        />
                        
                        <div className="flex flex-row space-x-7 justify-end">
                            <Button
                            className="w-fit mt-2 py-3 bg-[#656D4A] hover:bg-[#332D29]"
                            type="submit"
                            variant="default"
                            >
                            Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    );
};

export default Schedule;
