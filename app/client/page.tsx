"use client"
import React, {useState} from "react";
import ClientForm from "@/components/forms/ClientForm";
import IdCheckForm from "@/components/forms/IdCheckForm";

export default function Page() {
  const [resiNumber, setResiNumber] = useState('')
  return (
    <>
      <div className="w-screen flex flex-col md:flex-row">
        <IdCheckForm setResiNumber={setResiNumber} />
        <ClientForm resiNumber={resiNumber} />
      </div>
    </>
  );
}
