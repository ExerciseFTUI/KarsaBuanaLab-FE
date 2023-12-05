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

import { UseFormReturn, useForm } from "react-hook-form";
import { createProjectValidation } from "@/lib/validations/CreateProjectValidation";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface CreateProjectBaseDataProps {
  form: UseFormReturn<z.infer<typeof createProjectValidation>>;
  onSubmit: (values: z.infer<typeof createProjectValidation>) => any;
}

const CreateProjectBaseData: FC<CreateProjectBaseDataProps> = ({ form }) => {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();

  // 1. Define your form.
  // const form = useForm<z.infer<typeof createProjectValidation>>({
  //   resolver: zodResolver(createProjectValidation),
  //   defaultValues: {
  //     title: "",
  //     custName: "",
  //     alamatKantor: "",
  //     alamatSampling: "",
  //     surel: "",
  //     contactPerson: "",
  //   },
  // });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createProjectValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    alert("Hello WOrld");
    console.log(values);
  }

  return (
    <Card className="w-[450px] max-sm:w-[400px] max-h-screen overflow-auto custom-scrollbar ">
      <CardHeader>
        <CardTitle className="text-base font-bold ">
          Project Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="custName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Customer</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className=""
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamatKantor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Kantor</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className=""
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamatSampling"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Sampling</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className=""
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surel</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className=""
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      className=""
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProjectBaseData;
