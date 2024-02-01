"use client";
import React, { FC, useState } from "react";
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
import { register } from "@/lib/actions/auth.action";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

interface RegisterFormProps {}

// async function postRegister(values: registerValidationType): Promise<string> {
//   try {
//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: "http://localhost:3000/auth/register",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: values,
//     };

//     const response = await axios.request(config);
//     return response.data.message;
//   } catch (error: any) {
//     console.log(error.response.data.message);
//     return error.response.data.message;
//   }
// }

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      email: "", // Added email field
      password: "",
      confirmPassword: "", // Added confirm password field
      role: "", // Added role field
      division: "", // Added title fiels
    },
  });

  async function onSubmit(values: z.infer<typeof registerValidation>) {
    // const result = await postRegister(values);

    // if (result === "User created") {
    //   window.alert(result);
    //   form.reset();
    // } else {
    //   window.alert(result);
    // }

    setIsLoading(true);

    const result = await register(values);

    if (result) {
      toast({
        title: "Successfully Register New User",
        description: "Login to continue",
      });

      router.push("/login");
    } else {
      toast({
        title: "Register New User Failed",
        description: "Please Try Again",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <Card className="w-[450px] max-sm:w-[300px]">
      <CardHeader>
        <CardTitle className="text-xl">Add New User</CardTitle>
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
            <FormField // Added confirm password field
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
                          onSelect={() => field.onChange("ADMIN")}
                        >
                          ADMIN
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => field.onChange("STAFF")}
                        >
                          STAFF
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        <DropdownMenuItem
                          onSelect={() => field.onChange("Sampling Recipient")}
                        >
                          Sampling Recipient
                        </DropdownMenuItem>
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
