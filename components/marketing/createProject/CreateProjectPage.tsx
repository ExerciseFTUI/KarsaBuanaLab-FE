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
  updateProjectFile,
} from "@/lib/actions/marketing.actions";

import { useRouter } from "next/navigation";
import { set } from "date-fns";
import LoadingScreen from "@/components/LoadingComp";

// const createProject = async (
//   body: any,
//   files?: any // Assuming files is a File or an array of File objects
// ) => {
//   try {
//     if (
//       !body.client_name ||
//       !body.project_name ||
//       !body.alamat_kantor ||
//       !body.alamat_sampling ||
//       !body.surel ||
//       !body.contact_person ||
//       !body.regulation ||
//       !body.sampling_list
//       //      || !body.assigned_to
//     ) {
//       throw new Error("Please provide all required fields");
//     }

//     var bodyFormData = new FormData();

//     // Append all fields from the body object to bodyFormData
//     Object.keys(body).forEach((key) => {
//       bodyFormData.append(key, body[key]);
//     });

//     // Append files to bodyFormData
//     if (files || files.length > 0) {
//       if (Array.isArray(files)) {
//         files.forEach((file, index) => {
//           bodyFormData.append(`files${index}`, file);
//         });
//       } else {
//         bodyFormData.append("files", files);
//       }
//     }

//     console.log("Masuk sini");

//     console.log(`http://localhost:5000/projects/create`);

//     const response = await axios.post(
//       `http://localhost:5000/projects/create`,
//       bodyFormData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );

//     console.log("Success");

//     // return response.data as BaseApiResponse<ProjectResult>;
//     return "Success";
//   } catch (error: any) {
//     console.error("Error creating project:", error.message);
//     return null as unknown as BaseApiResponse<PromiseRejectedResult>;
//   }
// };

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
      parameters: [""],
    },
  });

  const { control, watch, setValue, resetField } = sampleForm;

  const arrayField = useFieldArray({
    control,
    name: "samples",
  });

  // useEffect(() => {
  //   console.log(arrayField.fields);
  // }, [arrayField.fields]);

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
  async function onSubmitForm(values: z.infer<typeof createProjectValidation>) {
    if (samples.length > 0) {
      //@ts-ignore
      const sampling_list = samples.map((sample) => sample.sampleName);
      //@ts-ignore
      const regulation_list = samples.map((sample) => sample.regulation);

      console.log("Sampling List: ", sampling_list);
      console.log("Regulation List: ", regulation_list);

      const body = {
        client_name: values.custName,
        project_name: values.title,
        alamat_kantor: values.alamatKantor,
        alamat_sampling: values.alamatSampling,
        surel: values.surel,
        contact_person: values.contactPerson,
        regulation_list: regulation_list,
        sampling_list: sampling_list,
      };

      //Create Project Function
      setIsLoading(true);
      // const response = null;

      // const response = await createProject(body, uploadedFiles);

      // if (!response) {
      //   alert("Failed to create project");
      //   setIsLoading(false);
      //   return
      // }

      if (uploadedFiles) {
        const fileResponse = await updateProjectFile(
          "65afbd8c987cf82566e265d0",
          uploadedFiles
        );

        if (!fileResponse) {
          alert("Failed to upload file, You can add file in update page");
          setIsLoading(false);
          return;
        }
      }

      setIsLoading(false);
      alert("Success creating project");
      router.push("/marketing/running");
    } else {
      alert("Please add at least one sample");
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
      <ProjectForm form={form} onSubmit={onSubmitForm} />
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

        <div
          className="bg-moss_green flex justify-center items-center mt-5 w-2/3 rounded-lg py-4 text-white hover:bg-light_green hover:cursor-pointer"
          onClick={form.handleSubmit(onSubmitForm)}
        >
          Submit
        </div>
      </Tabs>
    </div>
  );
};

export default CreateProjectPage;
