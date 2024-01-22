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
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface ProjectFormProps {
  form: UseFormReturn<z.infer<typeof createProjectValidation>>;
  onSubmit(values: z.infer<typeof createProjectValidation>): Promise<void>;
  status?: string;
  note?: string;
}

const ProjectForm: FC<ProjectFormProps> = ({
  form,
  onSubmit,
  status,
  note,
}) => {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();
  return (
    <Card className="w-[450px] max-sm:w-[400px] max-h-screen overflow-auto custom-scrollbar ">
      <CardHeader>
        <CardTitle className="text-base font-bold ">
          Project Information
        </CardTitle>
        {status?.toLowerCase() === "cancelled" && (
          <div className="text-sm">
            <h1>
              Status :{" "}
              <span className="text-red-600 font-semibold">Canceled</span>
            </h1>
            <p>Gakuat bayar jasa kita</p>
          </div>
        )}
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
                    <Input
                      //   disabled={true}
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
              name="custName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Customer</FormLabel>
                  <FormControl>
                    <Input
                      //   disabled={true}
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
                name="numPenawaran"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nomor Penawaran</FormLabel>
                    <FormControl>
                        <Input
                        disabled={true}
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
                name="numRevisi"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nomor Revisi</FormLabel>
                    <FormControl>
                        <Input
                        disabled={true}
                        type="number"
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
                name="valuasiProject"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Valuasi Project</FormLabel>
                    <FormControl>
                        <Input
                        type="text"
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
                      //   disabled={true}
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
                      //   disabled={true}
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
                      //   disabled={true}
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
                      //   disabled={true}
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
