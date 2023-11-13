import React, { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useForm, useFormContext } from "react-hook-form";
import { surveyValidation } from "@/lib/validations/SurveyValidation";

interface SurveyFormProps {
    isPaid: boolean;
}

const SurveyForm: FC<SurveyFormProps> = ({ isPaid }) => {
  const form = useForm<z.infer<typeof surveyValidation>>({
    resolver: zodResolver(surveyValidation),
    defaultValues: {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
      question5: "",
      question6: "",
      question7: "",
      question8: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof surveyValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!isPaid} className="flex bg-black_brown justify-center rounded-xl text-xl text-ghost_white py-2 w-full">
            Laporan Hasil Penelitian
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl sm:max-h-[85vh] mx-3">
        <DialogHeader>
          <DialogTitle className="text-3xl">Please Fill the Survey First</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-1/2 py-4 -mx-3">
          <div className="px-3">
            <Form  {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="question1"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 1</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question2"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 2</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question3"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 3</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question4"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 4</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question5"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 5</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question6"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 6</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question7"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 7</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="question8"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-4 my-4">
                      <FormLabel>Question 8</FormLabel>
                      <FormControl>
                        <Input className="py-6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center">
                  <Button type="submit" className="absolute bottom-0 w-1/2 text-lg p-6">Submit Survey</Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
        <DialogFooter >
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default SurveyForm;