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
import { FieldValues, useForm } from "react-hook-form";

interface SamplingTabProps {}

const SamplingTab: FC<SamplingTabProps> = ({}) => {
  const [openModal, setOpenModal] = useState(false);

  const form = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      parameters: [],
    },
  });

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
          <Sampling />
          <Sampling />
          <Sampling />
        </CardContent>
        <CardFooter>{/* <Button>Open Modal</Button> */}</CardFooter>
      </Card>
      <CreateSampleModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          form.reset();
        }}
        form={form}
      />
    </>
  );
};

export default SamplingTab;
