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
import { createProjectValidation } from "@/lib/validations/CreateProjectValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EditProjectForm from "./EditProjectForm";
import ProjectForm from "../forms/ProjectForm";
import { Project } from "@/lib/models/project.model";
import { useToast } from "@/components/ui/use-toast";

interface EditProjectPageProps {
  project: Project;
}

export default function EditProjectPage({ project }: EditProjectPageProps) {
  //General
  const { toast } = useToast();

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
  const { fields: samples, append, remove } = arrayField;

  console.log(project);

  //Append all the samples from API to the samples array
  if (project.sampling_list && project.sampling_list.length > samples.length) {
    const newSamples = project.sampling_list.map((sample) => {
      return {
        sampleName: sample.sample_name ? sample.sample_name : "Empty",
        regulation: sample.regulation?.regulation_name
          ? sample.regulation.regulation_name
          : "Empty",
        parameters: sample.regulation?.param ? sample.regulation.param : [""],
      };
    });

    append(newSamples);
  }

  //Add to the samples array
  const onSubmitSample: SubmitHandler<FieldValues> = async (data) => {
    console.log(data.parameters);

    //Handle Missing Data
    if (
      data.sampling === "" ||
      data.regulation === "" ||
      data.parameters.length === 0 ||
      data.parameters[0] === ""
    ) {
      alert("Please fill the data");
      return;
    }

    //Get the parameter only value
    const parametersValue = data.parameters.map(
      (parameter: any) => parameter.value
    );

    //Get the needed data
    const finalSample = {
      sampleName: data.sampling, // string
      regulation: data.regulation, // string
      parameters: parametersValue, // array
    };

    //Add to samples array
    append(finalSample);

    //Reset all the form
    setValue("parameters", [""], { shouldValidate: true });
    resetField("sampling");
    resetField("parameters");

    //Close Modal
    setOpenModal(false);

    //Call API Test
    // createProject(null, )
    //End of Call API Test

    //Display Toast
    toast({
      title: "Successfully adding new sample",
      description: "Good Job",
    });
  };

  //================================= End Sample Section

  //================================= Project Information Section

  const form = useForm<z.infer<typeof createProjectValidation>>({
    resolver: zodResolver(createProjectValidation),
    defaultValues: {
      title: project.project_name || "",
      custName: project.client_name || "",
      alamatKantor: project.alamat_kantor || "",
      alamatSampling: project.alamat_sampling || "",
      surel: project.surel || "",
      contactPerson: project.contact_person || "",
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
      <ProjectForm
        form={form}
        onSubmit={onSubmit}
        status={project.status}
        note="Gakuat bayar jasa kita"
      />
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
            onSubmit={onSubmitSample}
          />
        </TabsContent>
        {/* End Sample Section */}

        {/* Document Section */}
        <TabsContent value="document">
          {/* <DocumentTab
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          /> */}
        </TabsContent>
        {/* End Document Section */}
      </Tabs>
    </div>
  );
}
