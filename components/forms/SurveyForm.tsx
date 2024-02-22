import React, { FC, useEffect, useState } from "react";

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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useForm, useFormContext } from "react-hook-form";
import {
  surveyValidation,
  surveyValidationType,
} from "@/lib/validations/SurveyValidation";
import { FinishedData, QuestionType } from "@/lib/type";
import { getSurvey, submitSurvey } from "@/lib/actions/client.actions";
import { useToast } from "../ui/use-toast";

interface SurveyFormProps {
  data: FinishedData;
  resiNumber: string;
}

const SurveyForm: FC<SurveyFormProps> = ({ data, resiNumber }) => {
  const [questions, setQuestions] = useState<QuestionType[]>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getSurvey();
      setQuestions(data);
      console.log(questions);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(questions);
  }, []);

  const form = useForm<z.infer<typeof surveyValidation>>({
    resolver: zodResolver(surveyValidation),
  });
  async function onSubmit(values: z.infer<typeof surveyValidation>) {
    try {
      setLoading(true);

      // const response = await submitSurvey(values.resiNumber);

      // if (!response) {
      //   toast({
      //     title: "Failed to get the project",
      //     description: "please resubmit the form",
      //   });
      //   setIsLoading(false);
      //   return;
      // }
    } catch (error) {
      console.error("Error getting project :", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          // disabled={!data.is_paid}
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
        <ScrollArea className="w-full h-[55%] py-4 -mx-3">
          <div className="px-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* {questions?.map((question) => (
                  <div>
                    {question.type === "essay" && (
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
                    )}
                  </div>
                ))} */}

                <div className="flex justify-center bg-white h-fit w-full my-16">
                  <Button type="submit" className="bottom-0 w-1/2 text-lg p-6">
                    Submit Survey
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default SurveyForm;
