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

import { useForm } from "react-hook-form";
import { createProjectValidation } from "@/lib/validations/CreateProjectValidation";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface CreateProjectBaseDataProps {}

const CreateProjectBaseData: FC<CreateProjectBaseDataProps> = ({}) => {
    const router = useRouter();
    const query = useSearchParams();
    const { toast } = useToast();

  // 1. Define your form.
    const form = useForm<z.infer<typeof createProjectValidation>>({
        resolver: zodResolver(createProjectValidation),
        defaultValues: {
        title: "Analisis PT Aqua",
        numPenawaran: "VII/23/Aqua/12/2/2023",
        numRevisi: "1",
        custName: "Sulaiman Firdaus",
        alamatKantor: "Bandung, Jawa Barat",
        alamatSampling: "Air terjun Cisawuk",
        surel: "",
        contactPerson: "6282212219878",
        valuasiProject: "Rp 3.000.000"
        },
    });

  // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof createProjectValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        //NextAuth SignIn
        signIn("credentials", {
        ...values,
        redirect: false, //Add redirect to data object
        }).then((callback) => {
        console.log(callback);
        if (callback?.error) {
            toast({
            description: "Invalid username or password",
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            });
        }
        if (callback?.ok && !callback?.error) {
            toast({ title: "Successfully logged in", description: "Welcome back" });
            const callbackUrl = query.get("callbackUrl");
            router.push(callbackUrl || "/");
        }
        });
        // .finally(() => setIsLoading(false));
    }

    return (
        <Card className="w-[450px] overflow-auto h-[36rem] custom-scrollbar ">
        <CardHeader>
            <CardTitle className="text-xl">Project Information</CardTitle>
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
                        <Input disabled={true} className="" placeholder="" {...field} />
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
                name="custName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nama Customer</FormLabel>
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
                name="alamatKantor"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alamat Kantor</FormLabel>
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
                name="alamatSampling"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Alamat Sampling</FormLabel>
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
                name="surel"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Surel</FormLabel>
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
                name="contactPerson"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                        <Input
                        disabled={true}
                        type="phone"
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
                <Button
                className="w-full mt-6 bg-[#656D4A] hover:bg-[#332D29]"
                type="submit"
                >
                Revisi
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>
    );
    };

export default CreateProjectBaseData;