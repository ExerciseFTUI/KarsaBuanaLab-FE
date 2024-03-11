import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";

import { cn } from "@/lib/utils";

import { UserAuthForm } from "@/components/login/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  return (
    <div className="">
      <div className="container relative  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 h-screen">
        <div className="max-sm:flex max-sm:justify-center max-sm:items-center max-sm:w-full absolute right-4 top-4 md:right-8 md:top-8">
          <Image
            src={"/assets/logo.png"}
            alt={"Logo"}
            width={180}
            height={180}
            priority
          />
        </div>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Karsa Buana
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quidem laborum voluptates architecto consequatur quo molestiae
                dolorum eveniet ex mollitia expedita!&rdquo;
              </p>
              <footer className="text-sm">Orang Bijak</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8 flex w-full h-screen justify-center items-center">
          <div className="mx-auto flex w-[300px] flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign In To Karsa Buana
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to login
              </p>
            </div>
            {/* Place UserAuthForm inside Suspense */}
            <Suspense fallback={<LoadingScreen text="Wait a minutes . . ." />}>
              <UserAuthForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
