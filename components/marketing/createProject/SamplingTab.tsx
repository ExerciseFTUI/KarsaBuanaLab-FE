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
  useFieldArray,
  useForm,
} from "react-hook-form";

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

  const { control, watch, setValue, resetField } = form;

  const {
    fields: samples,
    append,
    remove,
    update,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "samples", // unique name for your Field Array
  });

  //Add to the samples array
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //Get the parameter only value
    const parametersValue = data.parameters.map(
      (parameter: any) => parameter.value
    );

    //Get the needed data
    const finalSample = {
      sampleName: data.sampling,
      regulation: data.regulation,
      parameters: parametersValue,
    };

    //Add to samples array
    append(finalSample);

    //Reset all the form
    setValue("parameters", [""], { shouldValidate: true });
    resetField("sampling");
    resetField("parameters");

    //Close Modal
    setOpenModal(false);
  };

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
                    index={index}
                    deleteSample={() => deleteSample(index)}
                    update={update}
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
          //Reset Parameter value
          setValue("parameters", [""], { shouldValidate: true });
          // form.reset();
        }}
        form={form}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default SamplingTab;
