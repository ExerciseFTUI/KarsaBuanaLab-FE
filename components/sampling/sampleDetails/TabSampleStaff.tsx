"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HyperLinkButton from "../HyperlinkButton";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { groupUserStaffColumns } from "../sampleListDataTables/DataTableColumns";
import { Button } from "@/components/ui/button";
import { verifySample } from "@/lib/actions/sampling.actions";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { SamplingRequestData } from "@/lib/type";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SamplingTabsTrigger from "../TabsTrigger";
import { TrashIcon } from "@radix-ui/react-icons";
import Dropzone from "@/components/Dropzone";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { MdOpenInNew } from "react-icons/md";
import DeleteDialog from "@/components/DeleteDialog";
import {
  deleteProjectFile,
  updateProjectFile,
} from "@/lib/actions/marketing.client.actions";
import { cn } from "@/lib/utils";

export default function TabSampleStaff({
  data,
}: {
  data: SamplingRequestData;
}) {
  const { project, user, files } = data;

  const table = useReactTable({
    data: user,
    columns: groupUserStaffColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();
  const { toast } = useToast();

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileIdToDelete, setFileIdToDelete] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitSample = async (e: any, sample_id: string) => {
    setIsLoading(true);

    const response = await verifySample(project._id, "WAITING", sample_id);

    setIsLoading(false);

    if (!response) {
      toast({
        title: "Failed to Verify Sampling",
        description: "Please Try Again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sampling Has Been Requested to be Verified",
        description: "Wait for the Supervisor to check the sampling",
      });
    }

    // router.push("/sampling/sample");
    router.refresh();
  };

  const handleUploadFile = async () => {
    if (uploadedFiles.length > 10) {
      toast({
        title: "Failed",
        description: "Maximum file is 10!",
        variant: "destructive",
      });
      return;
    }

    const response = await updateProjectFile(project._id, uploadedFiles);
    if (response) {
      //send toast
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      setUploadedFiles([]);
      router.refresh();
    } else {
      //send toast
      toast({
        title: "Failed",
        description: "File failed to upload",
        variant: "destructive",
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

  return (
    <>
      <Tabs defaultValue="Sampel" className="flex-1 w-full">
        {isLoading && <LoadingScreen text="" />}
        {/* TABS TRIGGER */}
        <TabsList className="flex w-full shadow-none bg-transparent">
          <SamplingTabsTrigger value="Sampel" header="Sampel" />

          <SamplingTabsTrigger value="Group" header="Group" />
        </TabsList>

        <TabsContent className="py-4 flex flex-col gap-8" value="Sampel">
          {/* List of Rekaman Sampel */}
          <div>
            <h1 className="font-bold text-xl text-black w-fit mb-4 py-2 rounded-md text-center">
              Verifikasi Rekaman Sampel
            </h1>
            <div className="flex gap-4 flex-col">
              {project.sampling_list.map((s, i) => (
                <div key={i} className="flex items-center gap-8">
                  <HyperLinkButton
                    title={s.sample_name}
                    href={files.sampling_list[i].url || "/"}
                  />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="sampling-btn sampling-btn-disabled"
                        disabled={
                          s.status === "WAITING" ||
                          s.status === "ACCEPTED" ||
                          s.status === "SUBMIT"
                        }
                      >
                        {s.status === "SUBMIT"
                          ? "Accepted"
                          : s.status === "WAITING"
                          ? "Verifying"
                          : s.status === "ACCEPTED"
                          ? "Verified"
                          : s.status === "REVISION"
                          ? "Revision"
                          : "Save"}
                      </Button>
                    </AlertDialogTrigger>

                    {/* Conditionally render AlertDialogContent based on status */}
                    {!(
                      s.status === "WAITING" ||
                      s.status === "ACCEPTED" ||
                      s.status === "SUBMIT"
                    ) && (
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure to SUBMIT this sampling?
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={(e) => submitSample(e, s._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    )}
                  </AlertDialog>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Project Files */}
          <div>
            <h1 className="font-bold text-xl text-black w-fit mb-4 py-2 rounded-md text-center">
              Project Files
            </h1>
            <div>
              <Card
                className={`overflow-y-auto md:max-h-[70vh] custom-scrollbar`}
              >
                <div>
                  <h1 className=" font-semibold mx-5 mt-5 ">
                    {" "}
                    Uploaded Files{" "}
                  </h1>

                  {/* Uploaded files */}
                  <div className="mx-5 mt-5">
                    {project.file.length === 0 && (
                      <p className=" text-sm flex flex-row justify-center py-3">
                        No uploaded files.
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

                  <div
                    className={cn(
                      "w-full",
                      uploadedFiles.length > 0 ? "mb-4" : ""
                    )}
                  >
                    {/* Drag and drop files area */}
                    <h1 className=" font-semibold mx-5 mt-5 ">
                      {" "}
                      Upload Files{" "}
                    </h1>

                    <Dropzone setUploadedFiles={setUploadedFiles} />
                    {/* End of Drag and drop files area */}

                    {uploadedFiles.length > 0 && (
                      <AlertDialog>
                        <AlertDialogTrigger className="flex mx-auto">
                          <Button className="sampling-btn flex w-fit mx-auto">
                            Upload
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure to upload these files?
                            </AlertDialogTitle>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={(e) => handleUploadFile()}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            {/* Upload Files */}
          </div>
        </TabsContent>

        {/* List of staff with same projects */}
        <TabsContent className="py-4" value="Group">
          {/* mapping the (row) => row.original.username */}
          <div className=" bg-light_brown rounded-lg px-4 py-2 ">
            <p className="text-white mb-4">Your teammate : </p>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <div
                  key={row.id}
                  className="flex gap-4 items-center text-white mb-2"
                >
                  {index + 1}. {row.original.username}
                </div>
              ))
            ) : (
              <div className="h-24 text-center">No results.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <DeleteDialog
        setIsOpen={setDialogOpen}
        isOpen={dialogOpen}
        deleteFunction={() => handleDeleteFile(project._id, fileIdToDelete)}
        description="This action cannot be undone. This will be permanently delete your file "
      />
    </>
  );
}
