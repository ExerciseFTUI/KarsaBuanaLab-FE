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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Dialog,
  DialogClose,
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
// import {
//   surveyValidation,
// } from "@/lib/validations/SurveyValidation";
import {
  AnswerType,
  FinishedData,
  QuestionType,
  SurveySchema,
} from "@/lib/type";
import { getSurvey, submitSurvey } from "@/lib/actions/client.actions";
import { useToast } from "../ui/use-toast";

const surveyData: QuestionType[] = [
  {
    text: "Please share your feedback about our product.",
    type: "essay",
    choices: [],
    _id: "65cf38e96b9daebce80bb89c",
  },
  {
    text: "Which programming languages do you use regularly?",
    type: "multiple_choice",
    choices: ["JavaScript", "Python", "Java", "C#"],
    _id: "65cf38e96b9daebce80bb89d",
  },
  {
    text: "How satisfied are you with our service?",
    type: "rating",
    choices: ["1", "2", "3", "4", "5"],
    _id: "65cf38e96b9daebce80bb89b",
  },
];

interface SurveyFormProps {
  questions: SurveySchema;
  data: FinishedData;
  resiNumber: string;
}

const SurveyForm: FC<SurveyFormProps> = ({ questions, data, resiNumber }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(true);
  const surveyValidation = z.object(
    Object.fromEntries(
      surveyData.map((question, index) => [
        `question${index + 1}`,
        z.string().min(1, { message: `Question ${index + 1} is Required` }),
      ])
    )
  );

  const form = useForm<z.infer<typeof surveyValidation>>({
    resolver: zodResolver(surveyValidation),
  });

  async function onSubmit(values: z.infer<typeof surveyValidation>) {
    try {
      setLoading(true);
      const answerArray: AnswerType[] = [];

      values && setDisabled(false);

      questions.questions.forEach((question, index) => {
        const value = values["question" + (index + 1)] || "";
        answerArray.push({ questionId: question._id, value });
      });

      const response = await submitSurvey(
        questions._id,
        resiNumber,
        answerArray
      );

      if (!response) {
        toast({
          title: "Failed to get the project",
          description: "please resubmit the form",
        });
        setLoading(false);
        return;
      }
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
      <DialogContent className="sm:max-w-6xl sm:max-h-[85%] mx-3">
        <DialogHeader>
          <DialogTitle className="text-3xl h-1/4">
            Please Fill the Survey First
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-[60%] py-4 -mx-3">
          <div className="px-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {questions.questions?.map((question, id) => (
                  <div className="py-5" key={id}>
                    {question.type === "essay" && (
                      <FormField
                        control={form.control}
                        name={`question${id + 1}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-4 my-4">
                            <FormLabel className="text-lg">
                              {id + 1}. {question.text}
                            </FormLabel>
                            <FormControl>
                              <Input className="py-6" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {question.type === "multiple_choice" && (
                      <FormField
                        control={form.control}
                        name={`question${id + 1}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-4 my-4">
                            <FormLabel className="text-lg">
                              {id + 1}. {question.text}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {question.choices.map((choice, id) => (
                                  <FormItem
                                    className="flex items-center space-x-3 space-y-0"
                                    key={id}
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={choice} />
                                    </FormControl>
                                    <FormLabel className="">{choice}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    {question.type === "rating" && (
                      <FormField
                        control={form.control}
                        name={`question${id + 1}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-4 my-4">
                            <FormLabel className="text-lg">
                              {id + 1}. {question.text}
                            </FormLabel>{" "}
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                {question.choices.map((choice, id) => (
                                  <FormItem
                                    className="flex items-center space-x-3 space-y-0"
                                    key={id}
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={choice} />
                                    </FormControl>
                                    <FormLabel className="">{choice}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                ))}
                {!disabled ? (
                  <DialogClose asChild>
                    <div className="flex justify-center bg-white h-fit w-full my-16">
                      <Button
                        type="submit"
                        className="bottom-0 w-1/2 text-lg p-6"
                      >
                        Submit Survey
                      </Button>
                    </div>
                  </DialogClose>
                ) : (
                  <div className="flex justify-center bg-white h-fit w-full my-16">
                    <Button
                      type="submit"
                      className="bottom-0 w-1/2 text-lg p-6"
                    >
                      Submit Survey
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default SurveyForm;
