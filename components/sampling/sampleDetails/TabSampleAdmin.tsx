"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HyperLinkButton from "../HyperlinkButton";
import { Button } from "@/components/ui/button";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { groupUserStaffColumns } from "../sampleListDataTables/DataTableColumns";
import { useRouter } from "next/navigation";
import { changeDivision, verifySample } from "@/lib/actions/sampling.actions";
import LoadingScreen from "@/components/LoadingScreen";
import { SamplingRequestData } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import SamplingTabsTrigger from "../TabsTrigger";
import { TrashIcon } from "@radix-ui/react-icons";
import DeleteDialog from "@/components/DeleteDialog";
import { deleteProjectFile } from "@/lib/actions/marketing.client.actions";

export default function TabSampleAdmin({
  data,
}: {
  data: SamplingRequestData;
}) {
  const { project, files, user } = data;
  const sampling_list = project.sampling_list;
  const canSave =
    sampling_list.filter((s) => s.status == "ACCEPTED").length ==
    sampling_list.length;

  const table = useReactTable({
    data: user,
    columns: groupUserStaffColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const submitSample = async (sample_id: string, status: string) => {
    setIsLoading(true);

    const response = await verifySample(project._id, status, sample_id);

    setIsLoading(false);

    if (!response) {
      toast({
        title: "Failed to Verify Sampling",
        description: "Please Try Again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sampling Has Been Verified",
        description: "Please check again if its correct",
      });

      if (status == "SUBMIT") {
        // check all sample status, if all sample status is "SUBMIT", then go to path "/sampling/sample"
        let allSampleSubmitted = true;
        response.result.sampling_list.forEach((s) => {
          if (s.status != "SUBMIT") {
            allSampleSubmitted = false;
          }
        });

        if (allSampleSubmitted) {
          // change the project division to PPLHP
          const changeDivisionResponse = await changeDivision(
            project._id,
            "PPLHP"
          );
          if (!changeDivisionResponse) {
            toast({
              title: "Failed to Save Project",
              description: "Please Try Again",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Project has been moved to PPLHP Division!",
              // description: "Please check again if its correct",
            });
            router.push("/sampling/sample");
            return;
          }
        }
      }
    }

    router.refresh();
  };

  const saveSample = async (project_id: string, division: string) => {
    setIsLoading(true);

    project.sampling_list.forEach(async (s) => {
      const response = await verifySample(project_id, "SUBMIT", s._id);

      if (!response) {
        toast({
          title: "Failed to Verify Sampling",
          description: "Please Try Again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sampling Has Been Verified",
          description: "Please check again if its correct",
        });
      }
    });

    const response = await changeDivision(project._id, division);

    if (!response)
      toast({
        title: "Failed to Save Project",
        description: "Please Try Again",
        variant: "destructive",
      });
    else
      toast({
        title: "Project has been moved to PPLHP Division!",
        // description: "Please check again if its correct",
      });

    setIsLoading(false);
    router.push("/sampling/sample");
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
      <Tabs defaultValue="buatDokumen" className="flex-1">
        {isLoading && <LoadingScreen text="" />}

        {/* TABS TRIGGER */}
        <TabsList className="flex shadow-none bg-transparent">
          <SamplingTabsTrigger value="buatDokumen" header="Buat Dokumen" />

          <SamplingTabsTrigger
            value="verifikasiSampel"
            header="Verifikasi Rekaman Sampling"
          />
        </TabsList>

        {/*
         * This specific code is used for changing each sample's STATUS by SPV
         * 1. If SPV choose to ACCEPT the sample, then the sample goes to PPLHP Division with
         *    a STATUS of "SUBMIT".
         * 2. If SPV choose to REVISE the sample, then the sample will stay in the SAMPLING Division
         *    and will be shown again to the related staff.
         */}
        <TabsContent className="py-4" value="verifikasiSampel">
          <div className="flex flex-col gap-4 w-full">
            {sampling_list.map((s, i) => (
              <div key={i} className="inline-flex gap-4">
                <HyperLinkButton
                  className="w-full"
                  title={s.sample_name}
                  href={files.sampling_list[i].url || "/"}
                />

                {/* Check s.status, if status == "WAITING" || "NOT ASSIGNED", just showing 1 disable button with text of "Waiting staff" */}
                {s.status === "REVISION" || s.status === "NOT ASSIGNED" ? (
                  <Button
                    className="sampling-btn"
                    title="Waiting Staff"
                    disabled
                  >
                    Waiting
                  </Button>
                ) : s.status === "SUBMIT" ? (
                  <Button
                    className="sampling-btn"
                    title="Already Accepted"
                    disabled
                  >
                    Accepted
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {/* Button for ACCEPT-ing the sample */}
                    <AlertDialog>
                      <AlertDialogTrigger
                        className={cn(
                          "hover:!bg-dark_brown !bg-moss_green !block !w-fit !text-white !rounded-lg !px-4 !ease-in-out !duration-150 !font-medium !text-sm"
                        )}
                      >
                        Accept
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure to ACCEPT this sampling?
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <AlertDialogDescription>
                          This action will move {s.sample_name} to PPLHP
                          division!
                        </AlertDialogDescription>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => submitSample(s._id, "SUBMIT")}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Button for REVISE-ing the sample */}
                    <AlertDialog>
                      <AlertDialogTrigger
                        className={cn(
                          "!block !w-fit !text-white !rounded-lg !px-4 !ease-in-out !duration-150 !font-medium !text-sm",
                          "!bg-red-600 hover:!bg-red-800"
                        )}
                      >
                        <span>Revisi</span>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you sure to REVISE this sampling?
                          </AlertDialogTitle>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => submitSample(s._id, "REVISION")}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            ))}

            {/* Upload Project Files */}
            <div>
              <h1 className="font-bold text-xl text-black w-fit mb-4 py-2 rounded-md text-center">
                Project Files
              </h1>
              <div>
                <Card
                  className={`overflow-y-auto md:max-h-[70vh] custom-scrollbar !pb-4`}
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
                  </div>
                </Card>
              </div>
              {/* Upload Files */}
            </div>
          </div>
        </TabsContent>

        {/* TABS for PROJECT DETAILS */}
        <TabsContent
          className="py-4 space-y-8 flex flex-col items-center"
          value="buatDokumen"
        >
          <div className="w-full">
            <h1 className="text-xl font-semibold mb-2">Assigned Staff</h1>
            <div className="  ">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <div
                    key={row.id}
                    className="flex gap-4 items-center text-black font-medium ml-4 mb-2"
                  >
                    {index + 1}. {row.original.username}
                  </div>
                ))
              ) : (
                <div className="h-24 text-center">No results.</div>
              )}
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-xl font-semibold mb-5">
              Logbook Rekaman Sampel
            </h1>

            <HyperLinkButton
              title="Logbook Rekaman Sampel"
              href={
                files.file.find(
                  (f: any) => f.name == "Logbook Jadwal Sampling"
                ) || "/"
              }
              className=""
            />
          </div>

          <div className="w-full">
            <h1 className="text-xl font-semibold mb-5">Berita Acara</h1>

            <HyperLinkButton
              title="Berita Acara"
              href={
                files.file.find((f: any) => f.name == "berita-acara") || "/"
              }
              className=""
            />
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
