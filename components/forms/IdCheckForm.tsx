"use client";
import React, { FC, useState } from "react";

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm, useFormContext } from "react-hook-form";
import {
  clientValidation,
  clientValidationType,
} from "@/lib/validations/ClientValidation";
import { Input } from "../ui/input";
import {
  getAnalysisById,
  getProjectDivision,
  getReportById,
  getSampleById,
} from "@/lib/actions/client.actions";
import { useToast } from "@/components/ui/use-toast";
import LoadingScreen from "../LoadingComp";

interface IdCheckFormProps {
  setResiNumber: (resiNumber: string) => void;
  setStage: (stage: string) => void;
  setClientData: (clientData: any) => void;
}

const IdCheckForm: FC<IdCheckFormProps> = ({
  setResiNumber,
  setStage,
  setClientData,
}) => {
  const form = useForm<z.infer<typeof clientValidation>>({
    resolver: zodResolver(clientValidation),
    defaultValues: {
      resiNumber: "660b67cd2a288e583b6eeaf3",
      password: "R6SY6Z",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof clientValidation>) {
    try {
      setIsLoading(true);

      const response = await getProjectDivision(
        values.resiNumber,
        values.password
      );
      const sample = await getSampleById(values.resiNumber);
      const analysis = await getAnalysisById(values.resiNumber);
      const finished = await getReportById(values.resiNumber);
      const combinedData = {
        sample: sample,
        analysis: analysis,
        finished: finished,
      };

      if (!response) {
        toast({
          title: "Failed to get the project",
          description: "please resubmit the form",
        });
        setIsLoading(false);
        return;
      }
      setResiNumber(values.resiNumber);
      setStage(response);
      setClientData(combinedData);
    } catch (error) {
      console.error("Error getting project :", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Card className="w-full sm:w-1/2 md:w-1/3 h-full md:h-fit flex flex-col justify-center px-0 lg:px-20 border-0 shadow-none">
      {isLoading && <LoadingScreen />}
      <CardHeader>
        <CardTitle className="text-3xl mt-10">Check Your ID</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="resiNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resi Number</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6"
                      placeholder="Input your number here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="py-6"
                      type="password"
                      placeholder="Input your password here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row space-x-7">
              <Button
                className="w-full mt-6 py-5 bg-[#656D4A] hover:bg-[#332D29] text-lg"
                type="submit"
                variant="default"
              >
                Check
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default IdCheckForm;
