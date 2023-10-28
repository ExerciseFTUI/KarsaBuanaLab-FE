"use client";

import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
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
import Sampling from "@/components/marketing/createProject/Sampling";
import { PlusIcon } from "@radix-ui/react-icons";
import { PlusCircleIcon } from "lucide-react";
import SamplingTab from "@/components/marketing/createProject/SamplingTab";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

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

  //All the samples get save in here
  const { fields: samples } = arrayField;

  //================================= End Sample Section

  //=============================== Document Section

  //=============================== End Document Section

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      <CreateProjectBaseData />
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
          <Card>
            <CardHeader>
              <CardTitle>Document</CardTitle>
              <CardDescription>
                Change your document here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Isi Komponen Document Disini */}
            </CardContent>

            <CardFooter>
              <Button>Save document</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {/* End Document Section */}
      </Tabs>
    </div>
  );
}
