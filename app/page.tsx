"use client";
import React, { useState } from "react";
import ClientForm from "@/components/forms/ClientForm";
import IdCheckForm from "@/components/forms/IdCheckForm";
import { useSession } from "next-auth/react";

export default function Home() {
  const [resiNumber, setResiNumber] = useState("");
  const { data } = useSession();

  return (
    // Mantap albert
    <>
      <div className="w-screen flex flex-col md:flex-row">
        <IdCheckForm setResiNumber={setResiNumber} />
        {resiNumber !== "" ? (
          <ClientForm resiNumber={resiNumber} />
        ) : (
          <div className="w-full md:w-2/3 h-[90vh] flex flex-col m-6 mx-10 bg-ghost_white rounded-xl" />
        )}
      </div>
    </>
  );
}
