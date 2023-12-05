"use client";

import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTab from "@/components/marketing/createProject/SamplingTab";
import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import DocumentTab from "./DocumentTab";
import { createProjectValidation } from "@/lib/validations/CreateProjectValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function CreateProjectPage() {
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

  useEffect(() => {
    console.log(arrayField.fields);
  }, [arrayField.fields]);

  //All the samples get save in here
  const { fields: samples } = arrayField;

  //================================= End Sample Section

  //================================= Project Information Section

  const form = useForm<z.infer<typeof createProjectValidation>>({
    resolver: zodResolver(createProjectValidation),
    defaultValues: {
      title: "",
      custName: "",
      alamatKantor: "",
      alamatSampling: "",
      surel: "",
      contactPerson: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof createProjectValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  //================================= End Project Information Section

  //=============================== Document Section

  const [uploadedFiles, setUploadedFiles] = useState([]);

  //=============================== End Document Section

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      <CreateProjectBaseData form={form} onSubmit={onSubmit} />
      <Tabs defaultValue="sampling" className="w-[40rem] max-sm:w-[420px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sampling">Sampling</TabsTrigger>
          <TabsTrigger value="document">Document</TabsTrigger>
        </TabsList>

        {/* Sample Section */}
        <TabsContent value="sampling">
          <SamplingTab
            form={sampleForm}
            arrayField={arrayField}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </TabsContent>
        {/* End Sample Section */}

        {/* Document Section */}
        <TabsContent value="document">
          <DocumentTab
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </TabsContent>
        {/* End Document Section */}
      </Tabs>
    </div>
  );
}
