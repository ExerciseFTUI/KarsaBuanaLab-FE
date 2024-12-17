"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { loginValidation } from "@/lib/validations/LoginValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const query = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
          router.push(callbackUrl || "/gateway");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input
                    className=""
                    placeholder="Email or Username"
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
          <Button disabled={isLoading} className="w-full mt-3  " type="submit">
            {isLoading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Sign In "
            )}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue to
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          //   <Icons.gitHub className="mr-2 h-4 w-4" />
          "Client Page"
        )}{" "}
      </Button>
    </div>
  );
}
