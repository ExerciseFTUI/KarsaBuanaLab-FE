"use client";

import CreateProjectBaseData from "@/components/forms/CreateProjectBaseData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SamplingTab from "@/components/marketing/createProject/SamplingTab";
import Dropzone from "@/components/Dropzone";
import { useEffect, useState } from "react";
import { MdOpenInNew, MdRestoreFromTrash } from "react-icons/md";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
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
import LoadingScreen from "@/components/LoadingComp";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteProjectFile,
  updateProjectFile,
} from "@/lib/actions/marketing.client.actions";
import { Button } from "@/components/ui/button";
import DeleteDialog from "@/components/DeleteDialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import CancelPopup from "@/components/cancelPopup";
import { revalidatePath } from "next/cache";
import { addInventoryFile } from "@/lib/actions/inventory.client.action";

interface EditProjectPageProps {
  project: Project;
  baseSamples: BaseSample[];
  status?: string;
}

export default function EditProjectPage({
  project,
  baseSamples,
  status,
}: EditProjectPageProps) {
  //General
  const { toast } = useToast();

  const router = useRouter();
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false); // State to control the cancellation confirmation popup
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

  //All the samples get save in here
  const { fields: samples, append, remove } = arrayField;

  //Checker
  const [change, setChange] = useState(false);

  //Append all the samples from API to the samples array
  if (project.sampling_list && project.sampling_list.length > samples.length) {
    const newSamples = project.sampling_list.map((sample) => {
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
      setChange(true);
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
      password: project.password || "",
      title: project.project_name || "",
      custName: project.client_name || "",
      alamatKantor: project.alamat_kantor || "",
      alamatSampling: project.alamat_sampling || "",
      surel: project.surel || "",
      contactPerson: project.contact_person || "",
      numPenawaran: project.no_penawaran || "",
      numRevisi: project.jumlah_revisi || 0,
      valuasiProject: project.valuasi_proyek || "0",
      is_paid: project.is_paid || false,
      desc_failed: project.desc_failed || "",
      status: project.status || "",
    },
  });

  async function onSubmit2(values: z.infer<typeof createProjectValidation>) {
    try {
      setIsLoading(true); // Set loading to true before making API calls

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
        desc_failed: values.desc_failed,
      };

      // // Check if all properties same exclude the is_paid will increase jumlahRevisi
      // const propertiesMatch = Object.keys(body).every(
      //   (key) => key === 'is_paid' || key === 'status' || body[key] as any  === project[key]
      // );

      // if (propertiesMatch) {
      //   body.jumlah_revisi? body.jumlah_revisi -= 1 : body.jumlah_revisi
      // }

      // Edit Project Function
      const responseInfo = await updateProjectInfo(body);

      if (!responseInfo) {
        toast({
          title: "Oops, Failed!",
          description: "Failed Updating Project Info",
          variant: "destructive",
        });
        return;
      }

      if (samples.length > 0) {
        const samplingBody = samples.map((sample) => {
          return {
            //@ts-ignore
            sample_name: sample.sampleName,
            //@ts-ignore
            regulation_name: sample.regulation,
            //@ts-ignore
            param: sample.parameters,
          };
        });

        const responseSampling = await updateProjectSample(
          samplingBody,
          project._id
        );

        if (!responseSampling) {
          toast({
            title: "Ooops, Failed!",
            description: "Failed Updating Project Samples",
            variant: "destructive",
          });
          router.refresh();
          return;
        }
      }

      if (uploadedFiles.length > 0) {
        // Perform file upload logic here if needed
        const responseFile = await updateProjectFile(
          project._id,
          uploadedFiles
        );
      }

      //Display Toast
      toast({
        title: "Successfully updating the project",
        description: "Good Job",
      });

      if (status === "RUNNING") {
        router.push("/marketing/running");
      } else if (status === "FINISHED") {
        router.push("/marketing/finished");
      } else if (status === "CANCELLED") {
        router.push("/marketing/cancelled");
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error.message;
      toast({
        title: "Oops, Failed!",
        description: errorMsg,
        variant: "destructive",
      });
      console.error("Error from backend", errorMsg);
      console.error("Error during project update:", errorMsg);
    } finally {
      setIsLoading(false); // Set loading to false after API calls are finished
    }
  }

  // =============== Action to update reason why project cancelled =================================== //
  const [reason, setReason] = useState("");

  async function handleCancelledProject() {
    try {
      const body = {
        _id: project._id,
        desc_failed: reason,
        status: "CANCELLED",
      };

      //Connect to API
      const responseInfo = await updateProjectInfo(body);
      if (!responseInfo) {
        toast({
          title: "Oops, Failed!",
          description: "Failed to cancel the project, please try again",
        });

        return;
      }

      toast({
        title: "Project success cancelled!",
        description: "The project has been cancelled",
      });

      router.push("/marketing/cancelled");
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error;
      toast({
        title: "Oops, Failed!",
        description: errorMsg,
        variant: "destructive",
      });
      console.error("Error from backend", errorMsg);
      console.error("Error during project update:", errorMsg);
    }
  }
  // =============== End of Action to update reason why project cancelled =================================== //

  // ========================= Action to update num revision ============================================== //

  async function updateRevision(
    values: z.infer<typeof createProjectValidation>
  ) {
    try {
      const body = {
        _id: project._id,
        jumlah_revisi: values.numRevisi,
      };

      //Connect to API
      const responseInfo = await updateProjectInfo(body);
      if (!responseInfo) {
        toast({
          title: "Oops, Failed!",
          description: "Failed to update revision number",
        });

        return;
      }

      // refresh the page
      toast({
        title: "Success",
        description: "Revision number updated successfully",
      });

      router.refresh();
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error;
      toast({
        title: "Oops, Failed!",
        description: errorMsg,
        variant: "destructive",
      });
      console.error("Error from backend", errorMsg);
      console.error("Error during project update:", errorMsg);
    } finally {
      router.refresh();
    }
  }

  // ========================= End of Action to update num revision ============================================== //

  // ========================= Action to update status payment ============================================== //

  async function updatePayment(
    values: z.infer<typeof createProjectValidation>
  ) {
    try {
      const body = {
        _id: project._id,
        is_paid: values.is_paid,
      };

      //Connect to API
      const responseInfo = await updateProjectInfo(body);
      if (!responseInfo) {
        toast({
          title: "Oops, Failed!",
          description: "Failed to update payment",
        });

        return;
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error;
      toast({
        title: "Oops, Failed!",
        description: errorMsg,
        variant: "destructive",
      });
      console.error("Error from backend", errorMsg);
      console.error("Error during project update:", errorMsg);
    } finally {
      router.refresh();
    }
  }

  // ========================= End of Action to update status payment ============================================== //

  //================================= End Project Information Section

  //=============================== Document Section

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileIdToDelete, setFileIdToDelete] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmitDocs = () => {
    // Log the uploaded files to the console

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

  const handleDeleteFile = async (id: string, file_id: string) => {
    const response = await deleteProjectFile(id, file_id);
    if (response) {
      //send toast
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      router.refresh();
    } else {
      //send toast
      toast({
        title: "Failed",
        description: "File failed to delete",
        variant: "destructive",
      });
    }
  };

  const password = form.watch("password");

  //=============================== End Document Section

  return (
    <>
      {showCancelConfirmation && (
        <CancelPopup
          isCancelled={true}
          setIsCancelled={setShowCancelConfirmation}
          message={`Are you sure you want to cancel the project ${project.project_name}?`} // Include project name in the message
          handleCancelledProject={handleCancelledProject}
          reason={reason}
          setReason={setReason}
        />
      )}

      {isLoading && <LoadingScreen />}

      <div className="flex gap-6 justify-evenly max-md:flex-col max-md:items-center">
        <ProjectForm
          project={project}
          form={form}
          onSubmit={onSubmit2}
          status={status}
          note="Gakuat bayar jasa kita"
          updatePayment={updatePayment}
          password={password}
          updateRevision={updateRevision}
        />
        <Tabs defaultValue="sampling" className="w-[40rem] max-sm:w-[420px] ">
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
              className={`overflow-y-auto md:max-h-[70vh] custom-scrollbar`}
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
                  {project.lab_file.length === 0 && (
                    <p className=" text-sm flex flex-row justify-center py-3">
                      Lab File Not Found
                    </p>
                  )}
                  <div className=" grid grid-cols-2 gap-4 justify-center items-center">
                    {project.lab_file.map((file, index) => (
                      <a
                        key={index + file._id}
                        href={`https://drive.google.com/file/d/${file.file_id}/edit`}
                        className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex delay-150"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.file_name}
                        <MdOpenInNew />
                      </a>
                    ))}
                    {/* <a
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
                    </a> */}
                  </div>
                </div>
                {/* End of Based spreadsheet files */}

                {/* Uploaded files */}
                <div className="mx-5 mt-5">
                  <h1 className="font-semibold mb-2">Another Files</h1>
                  {project.file.length === 0 && (
                    <p className=" text-sm flex flex-row justify-center py-3">
                      File Not Found
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4 justify-center items-center">
                    {project.file.map((file, index) => (
                      <div
                        className="bg-light_green items-center justify-between rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium flex delay-150"
                        key={index + file._id}
                      >
                        <a
                          href={`https://drive.google.com/file/d/${file.file_id}/view`}
                          className="w-full mr-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.file_name}
                        </a>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="delay-150"
                          onClick={() => {
                            setDialogOpen(true);
                            setFileIdToDelete(file._id);
                          }}
                        >
                          <TrashIcon className="h-5 w-5 " />
                        </Button>
                      </div>
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
              onClick={form.handleSubmit(onSubmit2)}
              className=" bg-light_green rounded-lg px-5 py-3 hover:bg-dark_green hover:text-white font-medium"
            >
              Submit
            </button>
            {/* Cancelled Project */}
            {status?.toLocaleLowerCase() === "running" && (
              <button
                onClick={() => setShowCancelConfirmation(true)}
                className=" bg-red-400 px-5 hover:bg-red-500 font-medium text-black hover:text-white rounded-lg py-3"
              >
                Cancel Project
              </button>
            )}
            {/* End of Cancelled Project */}
          </div>
          {/* End Button for submit */}

          {/* End Document Section */}
        </Tabs>
      </div>
      <DeleteDialog
        setIsOpen={setDialogOpen}
        isOpen={dialogOpen}
        deleteFunction={() => handleDeleteFile(project._id, fileIdToDelete)}
        description="This action cannot be undone. This will be permanently delete your file "
      />
    </>
  );
}
