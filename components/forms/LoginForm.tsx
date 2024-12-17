"use client";
import React, { FC, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaEyeSlash, FaEye } from "react-icons/fa";
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
import {
  loginValidation,
  loginValidationType,
} from "@/lib/validations/LoginValidation";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { access } from "fs";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";

interface LoginFormProps {}

// async function postLogin(values:loginValidationType) {
//   try {
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'http://localhost:3000/auth/login',
//       headers: {
//         'authorization': '',
//         'Content-Type' : 'application/json'
//       },
//       data: values
//     };

//     const response = await axios.request(config);
//     return (response.data.accessToken, response.data.refreshToken)
//   } catch (error : any) {
//     return (error)
//   }
// }

const LoginForm: FC<LoginFormProps> = ({}) => {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginValidation>>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    // Call API

    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsLoading(true);
    //NextAuth SignIn
    signIn("credentials", {
      ...values,
      redirect: false, //Add redirect to data object
    })
      .then((callback) => {
        if (callback?.error) {
          toast({
            description: "Invalid username or password",
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
          });
        }
        if (callback?.ok && !callback?.error) {
          toast({
            title: "Successfully logged in",
            description: "Welcome back",
          });
          const callbackUrl = query.get("callbackUrl");
          router.push(callbackUrl || "/admin");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Card className="w-[450px] max-sm:w-[350px]">
      <CardHeader>
        <CardTitle className="text-xl">Log In</CardTitle>
        <CardDescription>To continue to Lab Karsa Buana</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
              render={({ field }) => {
                const [showPassword, setShowPassword] = useState(false);

                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="py-6 pr-10" // Adjust padding for the icon
                          type={showPassword ? "text" : "password"}
                          placeholder="Input your password here"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-3 flex items-center"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="w-5 h-5 text-gray-500" />
                          ) : (
                            <FaEye className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              disabled={isLoading}
              className="w-full mt-6 bg-[#656D4A] hover:bg-[#332D29]"
              type="submit"
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
