"use client";
import BackButton from "@/components/auth/BackButton";
import { useRouter } from "next/navigation";

export default function Denied() {
  const router = useRouter();
  return (
    <section className="flex flex-col gap-12 items-center">
      <h1 className="text-5xl">Access Denied</h1>
      <p className="text-3xl max-w-2xl text-center">
        You are logged in, but you do not have the required access level to view
        this page.
      </p>
      <div className="flex justify-center items-center gap-5">
        <BackButton
          title="Back To Previous Page"
          variant="outline"
          action={() => router.back()}
        />
        <BackButton
          title="Back To Login Page"
          variant="destructive"
          action={() => router.push("/login")}
        />
      </div>
    </section>
  );
}
