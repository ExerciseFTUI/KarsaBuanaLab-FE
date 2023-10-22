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
import { loginValidation } from "@/lib/validations/LoginValidation";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = ({}) => {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginValidation>) {
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
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>To continue to Lab Karsa Buana</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="" {...field} />
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
                      type="password"
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
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
