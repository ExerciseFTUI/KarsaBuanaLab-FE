"use client";
import React, { FC, useState, useEffect } from "react";

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
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormProps {
  form: UseFormReturn<z.infer<typeof createProjectValidation>>;
  onSubmit(values: z.infer<typeof createProjectValidation>): Promise<void>;
  status?: string;
  note?: string;
  updatePayment?(
    values: z.infer<typeof createProjectValidation>
  ): Promise<void>;
}

const ProjectForm: FC<ProjectFormProps> = ({
  form,
  onSubmit,
  status,
  note,
  updatePayment,
}) => {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();
  const [paidStatus, setPaidStatus] = useState(form.getValues("is_paid"));

  return (
    <Card className="w-[450px] max-sm:w-[400px] md:max-h-[33rem]  overflow-auto custom-scrollbar ">
      <CardHeader>
        <CardTitle className="text-base font-bold ">
          Project Information
        </CardTitle>
        {status?.toLowerCase() === "cancelled" && (
          <div className="text-sm">
            <h1>
              Status :{" "}
              <span className="text-red-600 font-semibold">Cancelled</span>
            </h1>
          </div>
        )}
        {status?.toLocaleLowerCase() === "running" && (
          <div>
            <h1 className="text-sm mb-3">
              Status Pembayaran:{" "}
              <span className="font-bold">
                {paidStatus ? "Lunas" : "Belum lunas"}
              </span>
            </h1>
            <div className=" flex flex-row w-full h-fit justify-center">
              <button
                onClick={async () => {
                  setPaidStatus(!paidStatus);
                  form.setValue("is_paid", !paidStatus, {
                    shouldValidate: true,
                  });
                  if (updatePayment) {
                    await updatePayment(form.getValues()); // Pass the latest form values to updatePayment
                  }
                }}
                className={` ${
                  paidStatus
                    ? "bg-red-400 hover:bg-red-700"
                    : "bg-moss_green hover:bg-dark_green"
                } h-2/3 text-white py-2 px-5 rounded-lg `}
              >
                {paidStatus ? "Batalkan Pelunasan" : "Verifikasi Pelunasan"}
              </button>
            </div>
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
            {status?.toLocaleLowerCase() === "cancelled" && (
              <FormField
                control={form.control}
                name="desc_failed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason Project Failed</FormLabel>
                    <FormControl>
                      {field.value === "" ? (
                        <Input
                          className=""
                          placeholder="Not yet set reason"
                          {...field}
                        />
                      ) : (
                        <Textarea
                          className=" h-24 border-2 border-[#bbbabf]"
                          placeholder=""
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
            {status?.toLocaleLowerCase() !== "create" && (
              <div>
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
                          disabled={
                            status?.toLocaleLowerCase() === "finished"
                              ? true
                              : false
                          }
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
              </div>
            )}
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
