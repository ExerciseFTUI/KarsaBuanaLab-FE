"use client";

import React, { FC, useState } from "react";
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
//Shadcn

interface CreateSampleModalProps {
  isOpen?: boolean;
  onClose: () => void;
  form: UseFormReturn<FieldValues, any, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  title?: string;
}

const CreateSampleModal: FC<CreateSampleModalProps> = ({
  onClose,
  isOpen,
  form,
  onSubmit,
  title,
}) => {
  const { watch, setValue } = form;

  const parameters = watch("parameters");

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
                                <SelectItem value="regulation 1">
                                  regulation 1
                                </SelectItem>
                                <SelectItem value="regulation 2">
                                  regulation 2
                                </SelectItem>
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
