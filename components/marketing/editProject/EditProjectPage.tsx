"use client";

import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTab from "@/components/marketing/createProject/SamplingTab";
import Dropzone from "@/components/Dropzone";
import { useEffect, useState } from "react";
import { MdOpenInNew } from "react-icons/md";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createProjectValidation } from "@/lib/validations/CreateProjectValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EditProjectForm from "./EditProjectForm";
import ProjectForm from "../forms/ProjectForm";
import { Project } from "@/lib/models/project.model";
import { useToast } from "@/components/ui/use-toast";
import {
  updateProject,
  updateProjectInfo,
  updateProjectSample,
} from "@/lib/actions/marketing.actions";
import { useRouter } from "next/navigation";
import { set } from "date-fns";
import { BaseSample } from "@/lib/models/baseSample.model";

interface EditProjectPageProps {
  project: Project;
  baseSamples: BaseSample[];
}

export default function EditProjectPage({
  project,
  baseSamples,
}: EditProjectPageProps) {
  //General
  const { toast } = useToast();

  const router = useRouter();

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

  //All the samples get save in here
  const { fields: samples, append, remove } = arrayField;

  //Checker
  const [change, setChange] = useState(false);

  //Append all the samples from API to the samples array
  if (project.sampling_list && project.sampling_list.length > samples.length) {
    const newSamples = project.sampling_list.map((sample) => {
      // console.log(sample);
      return {
        sampleName: sample.sample_name ? sample.sample_name : "Empty",
        regulation: sample.regulation_name[0]?.regulation_name
          ? sample.regulation_name[0].regulation_name
          : "Empty",
        parameters: sample.param ? sample.param : [""],
        // parameters: sample.regulation_name[0]?.regulation_name
        //   ? sample.regulation_name[0].default_param
        //   : [""],
        // parameters: sample.regulation_name[0]?.param
        //   ? sample.regulation_name[0].param
        //   : [""],
      };
    });

    if (!change) {
      append(newSamples);
    }
  }

  //Add to the samples array
  const onSubmitSample: SubmitHandler<FieldValues> = async (data) => {
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

    //Display Toast
    toast({
      title: "Successfully adding new sample",
      description: "Good Job",
    });

    //Checker
    setChange(true);
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
      numPenawaran: project.no_penawaran || "",
      numRevisi: project.jumlah_revisi || 0,
      valuasiProject: project.valuasi_proyek || "0",
    },
  });

  async function onSubmit(values: z.infer<typeof createProjectValidation>) {
    const body = {
      _id: project._id,
      project_name: values.title,
      client_name: values.custName,
      alamat_kantor: values.alamatKantor,
      alamat_sampling: values.alamatSampling,
      surel: values.surel,
      contact_person: values.contactPerson,
      no_penawaran: values.numPenawaran,
      jumlah_revisi: values.numRevisi,
      valuasi_proyek: values.valuasiProject,
    };

    //Edit Project Function
    const responseInfo = await updateProjectInfo(body);
    if (!responseInfo) {
      alert("Failed Updating Project Info");
      return;
    }
    if (samples.length > 0) {
      //@ts-ignore
      const sampling_list = samples.map((sample) => sample.sampleName);
      //@ts-ignore
      const regulation_list = samples.map((sample) => sample.regulation);

      console.log("Sampling List: ", sampling_list);
      console.log("Regulation List: ", regulation_list);

      const bodySampling = {
        _id: project._id,
        regulation_list: ["Pemerintah Bogor"],
        sampling_list: ["Air_Limbah"],
      };

      const responseSampling = await updateProjectSample(bodySampling);

      if (!responseSampling) {
        alert("Failed Updating Project Samples");
        router.refresh();
        return;
      }
    }

    if (uploadedFiles.length > 0) {
      alert("Updating File");
    }

    alert("Success Updating Project");

    router.push("/marketing/running");
  }

  //================================= End Project Information Section

  //=============================== Document Section

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmitDocs = () => {
    // Log the uploaded files to the console
    console.log("Uploaded Files:", uploadedFiles);

    // TODO: Implement the logic to submit uploadedFiles to the server
    if (uploadedFiles.length > 0) {
      // For demonstration purposes, show a success message using toastify
      toast({
        title: "Submitted!",
        description: "Files Submitted Successfully!",
      });
    } else {
      // If no files are uploaded, show an error message
      toast({
        title: "Oops, Something Wrong",
        description: "Please upload files before submitting",
      });
    }
  };

  // TODO: Change this arrays use the uploaded files from API
  const buttonNames = ["Surat Pemerintah", "Super Semar 212"];

  //=============================== End Document Section

  return (
    <>
      {isCancelled && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="modal-content bg-white rounded-lg border-2 p-8">
            <p className="text-center text-xl font-bold mb-4">
              Are you sure you want to cancel the project?
            </p>
            <form>
              <label htmlFor="reason" className="block mb-2">
                Reason:
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setIsCancelled(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  //onClick={handleSubmitDocs}  // You can replace this with your actual cancel logic
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex gap-6 max-md:flex-col max-md:items-center">
        <ProjectForm
          form={form}
          onSubmit={onSubmit}
          status="EDIT"
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
              baseSamples={baseSamples}
            />
          </TabsContent>
          {/* End Sample Section */}

          {/* Document Section */}
          <TabsContent value="document">
            {/* Right Card for Dropzone */}

            <Card
              className={`overflow-y-auto md:max-h-[25rem] max-h-[90vh] custom-scrollbar`}
            >
              <div>
                <CardHeader>
                  <CardTitle className="text-base font-bold">
                    Detailed Files
                  </CardTitle>
                </CardHeader>

                {/* Based spreadsheet files */}
                <div className="mx-5">
                  <h1 className=" font-semibold mb-2 "> Based Files </h1>
                  <div className=" grid grid-cols-2 gap-4 justify-center items-center">
                    <a
                      href="#"
                      className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                    >
                      Formulir Permohonan Pengajuan <MdOpenInNew />
                    </a>
                    <a
                      href="#"
                      className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                    >
                      KUPTK <MdOpenInNew />
                    </a>
                    <a
                      href="#"
                      className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                    >
                      Surat Penawaran <MdOpenInNew />
                    </a>
                  </div>
                </div>
                {/* End of Based spreadsheet files */}

                {/* Uploaded files */}
                <div className="mx-5 mt-5">
                  <h1 className="font-semibold mb-2">Another Files</h1>
                  <div className="grid grid-cols-2 gap-4 justify-center items-center">
                    {buttonNames.map((buttonName, index) => (
                      <a
                        key={index}
                        href="#"
                        className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                      >
                        {buttonName} <MdOpenInNew />
                      </a>
                    ))}
                  </div>
                </div>
                {/* End of Uploaded files */}

                {/* Spreadsheet untuk jadwal sampling */}
                {/* <div className="mx-5 mt-5">
                  <h1 className="font-semibold mb-2">Schedule Sampling</h1>
                  <div className="grid grid-cols-2 gap-4 justify-center items-center">
                    <a
                      href="#"
                      className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex"
                      >
                      Jadwal Sampling <MdOpenInNew />
                    </a>
                    <div className="grid grid-cols-2 gap-4 justify-center items-center">
                      <button className=" bg-ghost_brown text-white px-5 py-3 hover:bg-light-green rounded-lg text-base font-semibold ">Acc</button>
                      <button className=" bg-red-400 hover:bg-red-500 px-5 py-3 text-white rounded-lg text-base font-semibold ">Revisi</button>
                    </div>
                  </div>
                </div> */}
                {/* End of Spreadsheet untuk jadwal sampling */}

                {/* Drag and drop files area */}
                <h1 className=" font-semibold mx-5 mt-5 "> Upload Files </h1>
                <Dropzone setUploadedFiles={setUploadedFiles} />
                {/* End of Drag and drop files area */}
              </div>
            </Card>
            {/* End of Right Card for Dropzone */}
            {/* <DocumentTab
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
            /> */}
          </TabsContent>
          {/* Button for submit */}
          <div className="m-5 flex justify-evenly items-center  ">
            <button
              onClick={form.handleSubmit(onSubmit)}
              className=" bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium"
            >
              Submit
            </button>
            {/* Cancelled Project */}
            <button
              onClick={() => setIsCancelled(true)}
              className=" bg-red-400 px-5 hover:bg-red-500 font-medium text-black hover:text-white rounded-lg py-3"
            >
              Cancel Project
            </button>
            {/* End of Cancelled Project */}
          </div>
          {/* End Button for submit */}

          {/* End Document Section */}
        </Tabs>
      </div>
    </>
  );
}
