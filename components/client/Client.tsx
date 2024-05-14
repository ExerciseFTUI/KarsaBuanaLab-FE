"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import IdCheckForm from "../forms/IdCheckForm";
import ClientCard from "./ClientCard";

export default function Client() {
  const [resiNumber, setResiNumber] = useState("");
  const [stage, setStage] = useState("");
  const [clientData, setClientData] = useState();

  console.log("clientData", clientData);

  const { data } = useSession();

  return (
    <>
      <div className="w-screen flex flex-col md:flex-row">
        <IdCheckForm
          setResiNumber={setResiNumber}
          setStage={setStage}
          setClientData={setClientData}
        />
        {resiNumber !== "" ? (
          <ClientCard
            resiNumber={resiNumber}
            stage={stage}
            clientData={clientData ? clientData : null}
          />
        ) : (
          <div className="w-full md:w-2/3 h-[90vh] flex flex-col m-6 mx-10 bg-ghost_white rounded-xl" />
        )}
      </div>
    </>
  );
}
