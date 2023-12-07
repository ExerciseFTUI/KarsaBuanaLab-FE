"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { PlusCircleIcon } from "lucide-react";
import SamplingTab from "@/components/receive/reviewDraft/SamplingTab";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import DocumentTab from "./DocumentTab";

const documentData = [
  {
    judul: "Tahap 1",
    placeholder: "Tahap 1",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
  {
    judul: "Tahap 2",
    placeholder: "Tahap 2",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
  {
    judul: "Tahap 3",
    placeholder: "Tahap 3",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
  {
    judul: "Tahap 4",
    placeholder: "Tahap 4",
    link: [
      {
        value: "link1",
        label: "link1",
      },
      {
        value: "link2",
        label: "link2",
      },
      {
        value: "link3",
        label: "link3",
      },
      {
        value: "link4",
        label: "link4",
      },
      {
        value: "link5",
        label: "link5",
      },
    ],
  },
];

export default function ReviewDraftPage() {
  //=============================== Sample Section
  const [openModal, setOpenModal] = useState(false);
  const sampleForm = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      regulation: "",
      parameters: [""],
    },
  });

  const { control, watch, setValue, resetField } = sampleForm;

  const arrayField = useFieldArray({
    control,
    name: "samples",
  });

  //All the samples get save in here
  const { fields: samples } = arrayField;

  //================================= End Sample Section

  //=============================== Document Section

  //=============================== End Document Section

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center overflow-hidden">
      <Tabs defaultValue="sampling" className="w-[40rem] max-sm:w-[420px]">
        <TabsList className="grid w-full grid-cols-2 space-x-0 cursor-pointer my-8 text-moss_green">
          <TabsTrigger className="text-2xl" value="sampling">
            Sampling
          </TabsTrigger>
          <TabsTrigger className="text-2xl" value="document">
            Document
          </TabsTrigger>
        </TabsList>

        {/* Sample Section */}
        <TabsContent value="sampling">
          <SamplingTab />
        </TabsContent>
        {/* End Sample Section */}

        {/* Document Section */}
        <TabsContent value="document">
          <DocumentTab />
        </TabsContent>
        {/* End Document Section */}
      </Tabs>
    </div>
  );
}
