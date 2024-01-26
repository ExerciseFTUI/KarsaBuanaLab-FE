"use client";

import React, { FC, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { DevTool } from "@hookform/devtools";

import {
  FieldValues,
  SubmitHandler,
  UseFieldArrayAppend,
  UseFormReturn,
} from "react-hook-form";

//Shadcn
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Modal from "@/components/Modal";
import MultipleSelect from "@/components/MultipleSelect";
import { Button } from "@/components/ui/button";
import { array } from "zod";
import { BaseSample } from "@/lib/models/baseSample.model";
import { get } from "http";
//Shadcn

interface CreateSampleModalProps {
  isOpen?: boolean;
  onClose: () => void;
  form: UseFormReturn<FieldValues, any, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  title?: string;
  baseSamples?: BaseSample[];
}

const CreateSampleModal: FC<CreateSampleModalProps> = ({
  onClose,
  isOpen,
  form,
  onSubmit,
  title,
  baseSamples,
}) => {
  const { watch, setValue, resetField } = form;

  const [currentSample, setCurrentSample] = useState("");
  const [currentRegulation, setCurrentRegulation] = useState("");
  const [currentParameter, setCurrentParameter] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const sampling = watch("sampling");
  const regulation = watch("regulation");
  const parameters = watch("parameters");

  console.log(regulation);

  useEffect(() => {
    setCurrentSample(sampling);
    setValue("parameters", [""], {
      shouldValidate: true,
    });
  }, [sampling]);

  useEffect(() => {
    setCurrentRegulation(regulation);
    resetField("parameters");
    setValue("parameters", getSpecificRegulationDefaultParam(), {
      shouldValidate: true,
    });
  }, [regulation]);

  // useEffect(() => {
  //   setCurrentParameter(getParameter());
  // }, [sampling]);

  const getParameter = () => {
    const temp = baseSamples?.find(
      (sample) => sample?.sample_name === currentSample
    );

    if (temp) {
      const parameters = temp.param || [];
      return parameters.map((param) => ({ value: param, label: param }));
    }

    return [{ value: "", label: "" }];
  };

  const getSpecificRegulationDefaultParam = (): any[] => {
    const temp = baseSamples?.find(
      (sample) => sample?.sample_name === sampling
    );

    if (temp) {
      const specificRegulation = temp.regulation.find(
        (item) => item.regulation_name === regulation
      );

      if (specificRegulation) {
        return specificRegulation.default_param.map((param) => {
          return { value: param, label: param };
        });
      }
    }

    return [];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-start max-sm:flex-col max-sm:items-center w-full">
        <div className="ml-1 mt-3 sm:mt-0 text-center sm:text-left w-full">
          <Dialog.Title
            as="h3"
            className={"text-base leading-6 font-semibold text-gray-900"}
          >
            {title ? title : "Add Sample"}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {title ? title : "Add Sample"} to your project.
            </p>
            <div className="w-full mt-5">
              <Form {...form}>
                <form
                  className="space-y-4 flex flex-col"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="sampling"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sample</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(sample) => field.onChange(sample)}
                            defaultValue={watch("sampling")}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select the sample" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select the sample</SelectLabel>
                                {baseSamples?.map((sample) => (
                                  <SelectItem
                                    key={sample._id}
                                    value={sample.sample_name}
                                  >
                                    {sample.sample_name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="regulation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regulation</FormLabel>
                        <FormControl>
                          <Select
                            disabled={!watch("sampling")}
                            onValueChange={(regulation) =>
                              field.onChange(regulation)
                            }
                            defaultValue={watch("regulation")}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select the regulation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select the regulation</SelectLabel>
                                {baseSamples?.map((sample) => {
                                  if (sample.sample_name == currentSample) {
                                    return sample.regulation.map(
                                      (regulation) => (
                                        <SelectItem
                                          key={`${sample._id}-${regulation._id}`}
                                          value={regulation.regulation_name}
                                        >
                                          {regulation.regulation_name}
                                        </SelectItem>
                                      )
                                    );
                                  }
                                })}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full mt-2">
                    <MultipleSelect
                      disabled={!watch("regulation")}
                      label="Parameters"
                      options={
                        getParameter()
                      }
                      onChange={(value) => {
                        setValue("parameters", value, { shouldValidate: true });
                      }}
                      value={parameters}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 flex flex-row-reverse">
        <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button>
      </div>
    </Modal>
  );
};

export default CreateSampleModal;
