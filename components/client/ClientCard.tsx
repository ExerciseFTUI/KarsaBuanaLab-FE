"use client";
import React, { useState, useEffect, FC } from "react";
import dynamic from "next/dynamic";

import { FiRefreshCw } from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Sample from "../client/Sample";
import Analysis from "../client/Analysis";
import Finished from "../client/Finished";
import { Button } from "../ui/button";
import { ClientDataType } from "@/lib/type";
import { getReportById } from "@/lib/actions/client.actions";
import { revalidatePath } from "next/cache";

const ClientStepper = dynamic(() => import("../Stepper/ClientStepper"), {
  ssr: false,
});

interface ClientCardProps {
  resiNumber: string;
  stage: string;
  clientData: ClientDataType | null;
  projectName: string;
}

const ClientCard: FC<ClientCardProps> = ({
  resiNumber,
  stage,
  clientData,
  projectName,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [step, setStep] = useState(0);
  const [refreshed, setRefreshed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localClientData, setLocalClientData] = useState<ClientDataType | null>(
    null
  );

  useEffect(() => {
    const convertStageToStep = () => {
      switch (stage) {
        case "SAMPLING":
          setStep(0);
          break;
        case "PPLHP":
          setStep(1);
          break;
        case "LAB":
          setStep(1);
          break;
        case "FINISHED":
          setStep(2);
          break;
        default:
          setStep(0);
      }
    };
    convertStageToStep();
  }, [stage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const newClientData = await getReportById(resiNumber);
      setLocalClientData(newClientData);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [resiNumber, stage]);

  const handleRefreshClick = () => {
    setRefreshed(true);
    fetchData();
  };

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const steps = [
    { label: "sample", onClick: () => handleStepClick(0) },
    { label: "Analysis", onClick: () => handleStepClick(1) },
    { label: "Finished", onClick: () => handleStepClick(2) },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          clientData?.sample && (
            <Sample
              data={clientData.sample}
              setEnabled={setEnabled}
              isDone={activeStep < step}
            />
          )
        );
      case 1:
        return (
          clientData?.analysis && (
            <Analysis
              data={clientData.analysis}
              stage={stage}
              setEnabled={setEnabled}
              isDone={activeStep < step}
            />
          )
        );
      case 2:
        return refreshed ? (
          <Finished data={localClientData} resiNumber={resiNumber} />
        ) : (
          clientData?.finished && (
            <Finished data={clientData.finished} resiNumber={resiNumber} />
          )
        );
      default:
        return null;
    }
  }

  return (
    <Card className="w-full md:w-2/3 md:h-[90vh] flex flex-col my-4 md:m-6 md:mx-10 bg-ghost_white rounded-xl">
      <CardHeader className="flex flex-row bg-dark_green px-10 rounded-xl justify-between shadow-xl">
        <div>
          <CardTitle className="my-auto text-3xl text-white font-extrabold">{` ${
            projectName.includes("Project") ? "" : "Project "
          } ${projectName}`}</CardTitle>
          <CardDescription className="my-auto text-white font-bold">
            Progress Project
          </CardDescription>
        </div>
        <FiRefreshCw
          className="text-4xl text-ghost_white cursor-pointer"
          onClick={handleRefreshClick}
        />
      </CardHeader>
      <div className="border-2 rounded-xl shadow-xl">
        <ClientStepper steps={steps} activeStep={activeStep} />
      </div>
      <div className="h-[50%]">{getSectionComponent()}</div>
      <CardFooter className="flex justify-between">
        <Button
          className={`${
            !(activeStep !== 0 && activeStep !== steps.length) && "invisible"
          } text-lg py-2 w-36`}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Previous
        </Button>
        <Button
          className={`${
            !(activeStep !== step) && "invisible"
          }  text-lg py-2 w-36`}
          hidden={!enabled}
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClientCard;
