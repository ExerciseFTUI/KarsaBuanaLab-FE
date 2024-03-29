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
import {
  FieldValues,
  SubmitHandler,
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { BaseSample } from "@/lib/models/baseSample.model";

interface SamplingTabProps {
  openModal: boolean;
  setOpenModal: (boolean: boolean) => void;
  form: UseFormReturn<FieldValues, any, undefined>;
  arrayField: UseFieldArrayReturn<FieldValues, any, "id">;
  onSubmit: SubmitHandler<FieldValues>;
  baseSamples?: BaseSample[];
}

const SamplingTab: FC<SamplingTabProps> = ({
  form,
  arrayField,
  openModal,
  setOpenModal,
  onSubmit,
  baseSamples,
}) => {
  const { toast } = useToast();

  const { control, watch, setValue, resetField } = form;

  const { fields: samples, append, remove, update } = arrayField;
  //Remove Sample
  function deleteSample(index: number) {
    remove(index);
  }
  // Job safety assurance
  // Template sampling

  return (
    <>
    {/* max-h-[90vh] md:max-h-[25rem] */}
      <Card className="overflow-y-auto md:max-h-[70vh] custom-scrollbar">
        <CardHeader>
          <CardTitle>Sampling</CardTitle>
          <CardDescription>
            Make changes to your sampling here. Click save when you&apos;re
            done.
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
                <Sampling
                  key={sample.id}
                  sampleName={sample.sampleName}
                  regulation={sample.regulation}
                  parameters={sample.parameters}
                  index={index}
                  deleteSample={() => deleteSample(index)}
                  update={update}
                  baseSamples={baseSamples}
                />
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
          //Reset Parameter value
          setValue("parameters", [""], { shouldValidate: true });
          // form.reset();
        }}
        form={form}
        onSubmit={onSubmit}
        baseSamples={baseSamples}
        change={false}
      />
    </>
  );
};

export default SamplingTab;
