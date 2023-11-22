"use client";
import React, { FC } from "react";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { registerValidation, registerValidationType } from "@/lib/validations/RegisterValidation";
import { Input } from "../ui/input";

interface RegisterFormProps {}

async function postRegister(values : registerValidationType) : Promise<string> {
  try {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/auth/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : values
    };

    const response = await axios.request(config);
    return response.data.message
  } catch (error : any) {
    console.log(error.response.data.message)
    return error.response.data.message
  }
}

const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "", // Added confirm password field
      email: "", // Added email field
      role: "", // Added role field
      division: "", // Added title fiels
    },
  });

  async function onSubmit(values: z.infer<typeof registerValidation>) {
      const result = await postRegister(values);
      // console.log(result)
      window.alert(result)

      if(result === "User created") 
        form.reset()
  }

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
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
                    <Input type="password" className="" placeholder="" {...field} />
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
                    <Input type="password" className="" placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField // Added role field
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField // Added role field
              control={form.control}
              name="division"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division</FormLabel>
                  <FormControl>
                    <Input className="" placeholder="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-6 bg-[#656D4A] hover:bg-[#332D29]"
              type="submit"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
