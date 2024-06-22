"use client";
import React, { FC, useState, useEffect, useRef } from "react";
import { Modal } from "flowbite";
import type { ModalOptions, ModalInterface } from "flowbite";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SiMinutemailer } from "react-icons/si";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaArrowUp, FaArrowDown, FaCopy } from "react-icons/fa";
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
import VerifRevision from "../editProject/VerifRevision";
import { Project } from "@/lib/models/project.model";
import { sendEmail } from "@/lib/actions/client.actions";

interface ProjectFormProps {
  form: UseFormReturn<z.infer<typeof createProjectValidation>>;
  onSubmit(values: z.infer<typeof createProjectValidation>): Promise<void>;
  status?: string;
  project?: Project;
  note?: string;
  updatePayment?(
    values: z.infer<typeof createProjectValidation>
  ): Promise<void>;
  password?: string;
  updateRevision?(
    values: z.infer<typeof createProjectValidation>
  ): Promise<void>;
}

const ProjectForm: FC<ProjectFormProps> = ({
  form,
  project,
  onSubmit,
  status,
  note,
  updatePayment,
  password,
  updateRevision,
}) => {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();
  const [paidStatus, setPaidStatus] = useState(form.getValues("is_paid"));
  var numRevision = form.getValues("numRevisi");
  const [isRevUp, setIsRevUp] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: `Copied to clipboard ${text}`,
      });
    } catch (error) {
      toast({
        title: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const resendEmail = async () => {
    if (!project) {
      toast({
        title: "Failed to resend email, not found id project",
        variant: "destructive",
      });
      return;
    }

    const result = await sendEmail(project._id);
    if (result) {
      toast({
        title: "Email resent successfully",
      });
    } else {
      toast({
        title: "Failed to resend email",
        variant: "destructive",
      });
    }
  };

  return (
    // w-[450px] max-sm:w-[400px] md:max-h-[33rem]
    <Card className=" overflow-y-auto md:max-h-[80vh] custom-scrollbar w-2/5">
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
                        <div className="flex">
                          <Input
                            disabled={true}
                            type="number"
                            className=""
                            placeholder=""
                            {...field}
                          />

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <div className=" flex">
                                <FaArrowUp
                                  className="text-3xl cursor-pointer mx-2 self-center bg-light_green p-1 rounded-lg "
                                  onClick={() => {
                                    form.setValue(
                                      "numRevisi",
                                      (numRevision ?? 0) + 1,
                                      {
                                        shouldValidate: true,
                                      }
                                    );
                                    setIsRevUp(true);
                                  }}
                                />
                                {numRevision !== 0 && (
                                  <FaArrowDown
                                    className="text-3xl cursor-pointer mr-2 self-center bg-light_green p-1 rounded-lg"
                                    onClick={() => {
                                      if (numRevision === 0) {
                                        toast({
                                          title: "Cannot revision lower than 0",
                                          variant: "destructive",
                                        });

                                        form.setValue("numRevisi", 0, {
                                          shouldValidate: true,
                                        });

                                        return;
                                      }

                                      form.setValue(
                                        "numRevisi",
                                        (numRevision ?? 1) - 1,
                                        {
                                          shouldValidate: true,
                                        }
                                      );
                                      setIsRevUp(false);
                                    }}
                                  />
                                )}
                              </div>
                            </AlertDialogTrigger>

                            {numRevision !== -1 && (
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>

                                  <AlertDialogDescription>
                                    Please kindly check it first.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => {
                                      if (isRevUp) {
                                        form.setValue(
                                          "numRevisi",
                                          (numRevision ?? 0) - 1,
                                          {
                                            shouldValidate: true,
                                          }
                                        );
                                      } else {
                                        if (numRevision !== -2) {
                                          form.setValue(
                                            "numRevisi",
                                            (numRevision ?? 0) + 1,
                                            {
                                              shouldValidate: true,
                                            }
                                          );
                                        }
                                      }
                                    }}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={async () => {
                                      if (updateRevision) {
                                        await updateRevision(form.getValues());
                                      }
                                    }}
                                  >
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            )}
                          </AlertDialog>
                        </div>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className=" flex">
                          <Input
                            disabled={true}
                            type="string"
                            className=""
                            placeholder=""
                            {...field}
                          />
                          <FaCopy
                            onClick={() => copyToClipboard(field.value ?? "")}
                            className=" cursor-pointer text-3xl m-2 self-center bg-light_green p-1 rounded-lg"
                          />
                        </div>
                      </FormControl>
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
                    <div className="flex items-center">
                      <Input
                        //   disabled={true}
                        type="string"
                        className=""
                        placeholder=""
                        {...field}
                      />

                      {/* <div
                        onClick={() => console.log("send email")}
                        className=" cursor-pointer text-3xl m-2 self-center bg-light_green p-1 rounded-lg"
                      >
                        Resend
                      </div> */}

                      <div
                        className="bg-light_green text-center font-medium cursor-pointer text-black text-sm w-1/3 rounded-lg p-2 ml-2"
                        onClick={() => {
                          resendEmail();
                        }}
                      >
                        Resend Email
                      </div>
                    </div>
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
