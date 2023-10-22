"use client"
import React, {useState, useEffect, FC} from 'react';
import dynamic from 'next/dynamic';

import { FiDownload } from "react-icons/fi";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Schedule from '../client/Schedule';
import Sample from '../client/Sample';

const ClientStepper = dynamic(
  () => import('../Stepper/ClientStepper'),
  {
    ssr: false,
  }
);

interface ClientFormProps {
  resiNumber: string;
}

const ClientForm: FC<ClientFormProps> = ({ resiNumber }) => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { label: 'Schedule', onClick: () => setActiveStep(0) },
    { label: 'Sample', onClick: () => setActiveStep(1) },
    { label: 'Analysis', onClick: () => setActiveStep(2) },
    { label: 'Finished', onClick: () => setActiveStep(3) },
  ];

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  function getSectionComponent() {
    switch(activeStep) {
      case 0: return <Schedule/>;
      case 1: return <Sample/>;
      case 2: return <div className='bg-blue-700 h-5 w-5'/>;
      case 3: return <div className='bg-green-700 h-5 w-5'/>;
      default: return null;
    }
  }

  return (
    <Card className="w-full md:w-2/3 h-[90vh] flex flex-col m-6 mx-10 bg-ghost_white rounded-xl">
      <CardHeader className="flex flex-row bg-dark_green px-10 rounded-xl justify-between shadow-xl">
        <CardTitle className="my-auto text-3xl text-white font-extrabold">{`ID ${resiNumber}`}</CardTitle>
        <FiDownload className="text-4xl text-ghost_green" />
      </CardHeader>
      <div className='border-2 rounded-xl shadow-xl'>
        <ClientStepper
        steps={steps}
        activeStep={activeStep}
         />
      </div>
      <div>
        { getSectionComponent()  }
        { (activeStep !== 0 && activeStep !== steps.length - 1)
          && <button onClick={ () => setActiveStep(activeStep - 1) }>Previous</button>
        }
        { activeStep !== steps.length - 1
          && <button onClick={ () => setActiveStep(activeStep + 1) }>Next</button>
        }
      </div>
    </Card>
  );
};

export default ClientForm;
