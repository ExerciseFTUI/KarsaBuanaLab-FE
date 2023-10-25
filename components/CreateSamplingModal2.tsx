"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";

import { FiAlertTriangle } from "react-icons/fi";
import { Dialog } from "@headlessui/react";
import Modal from "./Modal";
import { Button } from "./ui/button";

import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import SelectMultiple from "./forms/SelectMultiple";

//Shadcn
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
//Shadcn

interface CreateSamplingModal2Props {
  isOpen?: boolean;
  onClose: () => void;
  form: UseFormReturn<FieldValues, any, undefined>;
}

const CreateSamplingModal2: FC<CreateSamplingModal2Props> = ({
  onClose,
  isOpen,
  form,
}) => {
  const router = useRouter();

  const { watch, setValue } = form;

  const sampling = watch("sampling");
  const parameters = watch("parameters");
  console.log(sampling);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-start max-sm:flex-col max-sm:items-center">
        <div className="ml-1 mt-3 sm:mt-0 text-center sm:text-left">
          <Dialog.Title
            as="h3"
            className={"text-base leading-6 font-semibold text-gray-900"}
          >
            Add Sample
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Add sample to your project. You can add as many samples as you
              want to a project.
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
                            onValueChange={(color) => field.onChange(color)}
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select the sample" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Template File</SelectLabel>
                                <SelectItem value="Sample 1">
                                  Sample 1
                                </SelectItem>
                                <SelectItem value="Sample 2">
                                  Sample 2
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <div className="w-full mt-2">
                <SelectMultiple
                  disabled={form.watch("sampling").length === 0}
                  label="Parameters"
                  // options={users.map((user) => ({
                  //   value: user.id,
                  //   label: user.name,
                  // }))}
                  options={[
                    { value: "Parameter1", label: "Parameter 1" },
                    { value: "Parameter2", label: "Parameter 2" },
                    { value: "Parameter3", label: "Parameter 3" },
                    { value: "Parameter4", label: "Parameter 4" },
                    { value: "Parameter5", label: "Parameter 5" },
                    { value: "Parameter6", label: "Parameter 6" },
                  ]}
                  onChange={(value) =>
                    setValue("parameters", value, { shouldValidate: true })
                  }
                  value={parameters}
                />
              </div>
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

export default CreateSamplingModal2;
