"use client";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  registerValidation,
  registerValidationType,
} from "@/lib/validations/RegisterValidation";
import { Input } from "../ui/input";
import { register, updateUser } from "@/lib/actions/auth.action";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { UserType } from "@/lib/type";

interface RegisterFormProps {
  isUpdate: boolean;
  account?: UserType;
}

const RegisterForm: FC<RegisterFormProps> = ({ isUpdate, account }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),

    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      division: "",
    },
  });

  useEffect(() => {
    if (isUpdate && account) {
      form.reset({
        username: account.username,
        email: account.email,
        role: account.role,
        division: account.division,
        password: "",
        confirmPassword: "",
      });
    }
  }, [isUpdate, account, form]);

  async function onSubmit(values: z.infer<typeof registerValidation>) {
    setIsLoading(true);
    console.log("values", values);

    if (isUpdate && account) {
      const result = await updateUser(account?._id, values);

      if (result.result) {
        toast({
          title: "Successfully Updated User",
          description: "Check the updated user in the list",
        });
        setIsLoading(false);

        router.push("/admin");
      } else {
        toast({
          title: "Update User Failed",
          description: result.message || "Please Try Again",
          variant: "destructive",
        });
      }

      setIsLoading(false);
      return;
    } else {
      console.log("values", values);

      const result = await register(values);

      if (result.result) {
        toast({
          title: "Successfully Register New User",
          description: "Login to continue",
        });
        setIsLoading(false);

        router.push("/admin");
      } else {
        toast({
          title: "Register New User Failed",
          description: result.message || "Please Try Again",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
  }

  return (
    <Card className="w-[450px] max-sm:w-[300px]">
      <CardHeader>
        <CardTitle className="text-xl">
          {isUpdate ? "Update User" : "Add New User"}
        </CardTitle>
        <CardDescription>To join Lab Karsa Buana</CardDescription>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    {isUpdate ? "New Password" : "Password"}{" "}
                  </FormLabel>
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
            <FormField // Added confirm password field
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isUpdate ? "Confirm New Password" : "Confirm Password"}
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <div className=" w-full flex justify-between items-center">
                    <FormLabel className="mr-10">Role</FormLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="w-72">
                        <Button
                          className="border-2 border-light_green"
                          variant="outline"
                        >
                          {field.value ? field.value : "Select Role"}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72">
                        <DropdownMenuLabel>Roles</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onSelect={() => {
                            field.onChange("ADMIN");
                            form.setValue("division", "Marketing");
                          }}
                        >
                          ADMIN
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => {
                            field.onChange("MANAGER TEKNIS");
                            form.setValue("division", "Marketing");
                          }}
                        >
                          MANAGER TEKNIS
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => field.onChange("SPV")}
                        >
                          SUPERVISOR
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => field.onChange("USER")}
                        >
                          STAFF / USER
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* check the role is ADMIN OR MANAGER TEKNIS OR NOT */}
            {(form.watch("role") === "USER" ||
              form.watch("role") === "SPV") && (
              <FormField // Added role field
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <div className=" w-full flex justify-between items-center">
                      <FormLabel className="mr-10">Division</FormLabel>
                      <DropdownMenu>
                        <DropdownMenuTrigger className=" w-72" asChild>
                          <Button
                            className=" border-2 border-light_green"
                            variant="outline"
                          >
                            {field.value ? field.value : "Select Division"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72">
                          <DropdownMenuLabel>Division</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Marketing")}
                          >
                            Marketing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Sampling")}
                          >
                            Sampling
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem
                          onSelect={() => field.onChange("Sampling Recipient")}
                        >
                          Sampling Recipient
                        </DropdownMenuItem> */}
                          <DropdownMenuItem
                            onSelect={() => field.onChange("PPLHP")}
                          >
                            PPLHP
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => field.onChange("Lab")}
                          >
                            Lab
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              disabled={isLoading}
              className="w-full mt-6 bg-[#656D4A] hover:bg-[#332D29]"
              type="submit"
              onClick={() => {
                console.log("clicked");
              }}
            >
              {isLoading ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : isUpdate ? (
                "Update Account"
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
