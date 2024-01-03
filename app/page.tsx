"use client";
import React, { useState } from "react";
import ClientForm from "@/components/forms/ClientForm";
import IdCheckForm from "@/components/forms/IdCheckForm";
import { useSession } from "next-auth/react";

export default function Home() {
  const [resiNumber, setResiNumber] = useState("");
  const { data } = useSession();

  if (data) {
    console.log(data.user);
  }
  return (
    // Mantap albert
    <>
      <div className="w-screen flex flex-col md:flex-row">
        <IdCheckForm setResiNumber={setResiNumber} />
        {resiNumber !== "" ? (
          <ClientForm resiNumber={resiNumber} />
        ) : (
          <div className="md:w-2/3 md:h-[90vh] md:flex md:flex-col md:m-6 md:mx-10 md:bg-ghost_white md:rounded-xl" />
        )}
      </div>
    </>
  );
}
