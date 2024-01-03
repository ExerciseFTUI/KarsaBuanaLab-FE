import React, { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useForm } from "react-hook-form";
import { surveyValidation } from "@/lib/validations/SurveyValidation";

interface SurveyFormProps {
  isPaid: boolean;
}

const SurveyForm: FC<SurveyFormProps> = ({ isPaid }) => {
  const form = useForm<z.infer<typeof surveyValidation>>({
    resolver: zodResolver(surveyValidation),
    defaultValues: {
      question1: "Siapa namamu?",
      question2: "Dimana rumahmu?",
      question3: "Apa pekerjaan mu?",
      question4: "punya pacar?",
      question5: "berapa pacarmu?",
      question6: "maukah jadi pacarku?",
      question7: "bagaimana menjadi istriku?",
      question8: "Deal?",
    },
  });

  const questionCount = Object.keys(form).length;

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof surveyValidation>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={!isPaid}
          className="flex bg-black_brown justify-center rounded-xl text-xl text-ghost_white py-2 w-full"
        >
          Laporan Hasil Penelitian
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl sm:max-h-[85vh] mx-3">
        <DialogHeader>
          <DialogTitle className="text-3xl">
            Please Fill the Survey First
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-1/2 py-4 -mx-3 border-b-2 border-slate-200">
          <div className="px-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {Array.from({ length: questionCount }).map((_, index) => (
                  <FormField
                    key={`question${index + 1}`}
                    control={form.control}
                    name={`question${index + 1}` as `question${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start gap-4 my-4">
                        <FormLabel>{`Question ${index + 1}`}</FormLabel>
                        <FormControl>
                          <Input className="py-6" {...field} placeholder={field.value} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </form>
            </Form>
          </div>
        </ScrollArea>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="absolute bottom-5 w-1/2 text-lg p-6"
          >
            Submit Survey
          </Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SurveyForm;