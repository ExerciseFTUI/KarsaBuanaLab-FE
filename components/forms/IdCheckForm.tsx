"use client";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm, useFormContext } from "react-hook-form";
import { clientValidation } from "@/lib/validations/ClientValidation";
import { Input } from "../ui/input";

interface IdCheckFormProps {
  setResiNumber: (resiNumber: string) => void; // Menerima fungsi untuk menyimpan resi number
}

const IdCheckForm: FC<IdCheckFormProps> = ({ setResiNumber }) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof clientValidation>>({
    resolver: zodResolver(clientValidation),
    defaultValues: {
      resiNumber: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof clientValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setResiNumber(values.resiNumber);
  }
  return (
    <Card className="w-full sm:w-1/2 md:w-1/3 h-full md:h-fit flex flex-col justify-center px-0 lg:px-20 border-0 shadow-none">
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
                    <Input className="py-6" placeholder="Input your number here" {...field} />
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
                    <Input className="py-6" placeholder="Input your password here" {...field} />
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
