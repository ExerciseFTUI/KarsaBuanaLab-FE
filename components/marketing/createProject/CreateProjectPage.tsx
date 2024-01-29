"use client";

import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTab from "@/components/marketing/createProject/SamplingTab";
import { FC, useEffect, useState } from "react";
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
import ProjectForm from "../forms/ProjectForm";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { BaseApiResponse } from "@/lib/models/baseApiResponse.model";
import { BaseSample } from "@/lib/models/baseSample.model";
import {
  createProject,
  createProjectJson,
} from "@/lib/actions/marketing.actions";

import { useRouter } from "next/navigation";
import { set } from "date-fns";
import LoadingScreen from "@/components/LoadingComp";
import {
  getProjectClient,
  getUser,
  updateProjectFile,
} from "@/lib/actions/marketing.client.actions";

const getProject = async () => {
  //Add try catch
  try {
    const response = await axios.get(
      `https://karsalab.netlabdte.com//marketing/getSample`
    );
    console.log(response.data);
  } catch (error: any) {
    console.error(`Error get project :`, error.message);
  }
};

interface CreateProjectProps {
  baseSamples: BaseSample[];
}

const CreateProjectPage: FC<CreateProjectProps> = ({ baseSamples }) => {
  const { toast } = useToast();

  const { data } = useSession();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  //=============================== Sample Section
  const [openModal, setOpenModal] = useState(false);

  const sampleForm = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      regulation: "",
      parameters: [],
    },
  });

  const { control, watch, setValue, resetField } = sampleForm;

  const arrayField = useFieldArray({
    control,
    name: "samples",
  });

  useEffect(() => {
    // getUser();
    getProjectClient("12");
  }, []);

  //All the samples get save in here
  const { fields: samples, append, remove } = arrayField;

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
      title: "",
      custName: "",
      alamatKantor: "",
      alamatSampling: "",
      surel: "",
      contactPerson: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmitForm2(
    values: z.infer<typeof createProjectValidation>
  ) {
    try {
      setIsLoading(true); // Set loading to true before making API call

      if (samples.length > 0) {
        const sampling_list = samples.map((sample) => {
          return {
            //@ts-ignore
            sample_name: sample.sampleName,
            //@ts-ignore
            regulation_name: sample.regulation,
            //@ts-ignore
            param: sample.parameters,
          };
        });

        const body = {
          client_name: values.custName,
          project_name: values.title,
          alamat_kantor: values.alamatKantor,
          alamat_sampling: values.alamatSampling,
          surel: values.surel,
          contact_person: values.contactPerson,
          sampling_list: sampling_list,
        };

        const response = await createProjectJson(body);
        
        if (!response) {
          toast({
            title: "Failed to create project",
            description: "please resubmit the form",
          });
          setIsLoading(false);
          return
        }

        // if (uploadedFiles.length > 0 && response?._id) {
        //   const fileResponse = await updateProjectFile(
        //     response?._id,
        //     uploadedFiles
        //   );
        //   console.log("Hello World");
        // }

        // if (uploadedFiles.length > 0) {
        //   const fileResponse = await updateProjectFile(
        //     "65b79328c0bdd92b29e84f43",
        //     uploadedFiles
        //   );
        // }

        toast({
          title: "Successfully Create project!",
          description: "Good Job",
        });
        setIsLoading(false);
        router.push("/marketing/running");
      } else {
        toast({
          title: "Oops, you forget something!",
          description: "Please add at least one sample",
        });
      }
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsLoading(false); // Set loading to false after API call is finished
    }
  }

  //================================= End Project Information Section

  //=============================== Document Section

  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  //=============================== End Document Section

  return (
    <div className="flex gap-6 max-md:flex-col max-md:items-center">
      {isLoading && <LoadingScreen />}
      <ProjectForm form={form} onSubmit={onSubmitForm2} status="CREATE" />
      <Tabs
        defaultValue="sampling"
        className="w-[40rem] max-sm:w-[420px] justify-center"
      >
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
            baseSamples={baseSamples}
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

        <div className="flex flex-row justify-center items-center mt-5 w-full">
          <button
            onClick={form.handleSubmit(onSubmitForm2)}
            className=" text-white w-1/3 rounded-lg py-4 hover:bg-dark_green text-base font-medium hover:cursor-pointer bg-moss_green"
          >
            Submit
          </button>
        </div>
      </Tabs>
    </div>
  );
};

export default CreateProjectPage;
