"use client";
import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Sampling from "./Sampling";
import CreateSampleModal from "./CreateSampleModal";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";

interface SamplingTabProps {}

const SamplingTab: FC<SamplingTabProps> = ({}) => {
  const [openModal, setOpenModal] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      regulation: "",
      parameters: [""],
    },
  });

  const { control } = form;

  const {
    fields: samples,
    append,
    remove,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "samples", // unique name for your Field Array
  });

  //Remove Sample
  function deleteSample(index: number) {
    remove(index);
  }

  return (
    <>
      <Card className="overflow-y-auto max-h-[90vh] custom-scrollbar">
        <CardHeader>
          <CardTitle>Sampling</CardTitle>
          <CardDescription>
            Make changes to your sampling here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={"outline"}
            className="w-full mb-6"
            onClick={() => setOpenModal(true)}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add Sample
          </Button>
          {samples.length === 0 && (
            <h1 className="text-center">There are no samples yet</h1>
          )}
          {samples.length > 0 && (
            <>
              {samples.map((sample: any, index) => (
                <>
                  <Sampling
                    key={sample.id}
                    sampleName={sample.sampleName}
                    regulation={sample.regulation}
                    parameters={sample.parameters}
                    deleteSample={() => deleteSample(index)}
                  />
                </>
              ))}
            </>
          )}
        </CardContent>
        <CardFooter>{/* <Button>Open Modal</Button> */}</CardFooter>
      </Card>
      <CreateSampleModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          // form.reset();
        }}
        form={form}
        fields={samples}
        append={append}
      />
    </>
  );
};

export default SamplingTab;
