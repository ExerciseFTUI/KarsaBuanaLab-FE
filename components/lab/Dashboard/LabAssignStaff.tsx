"use client";

import React, { useEffect } from "react";
import { Project } from "@/lib/models/project.model";
import { SamplingRequestData } from "@/lib/type";
import { LabAssignSelect } from "./LabAssignSelect";
import { useRouter } from "next/navigation";
import { LabAssignEdit } from "./LabAssignEdit";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { saveSample } from "@/lib/actions/lab.actions";
import { toast } from "@/components/ui/use-toast";

interface LabAssignStaffProps {
  data: SamplingRequestData;
  sampleId: string; // Added this prop to focus on specific sample
  projects: Project[];
}

export default function LabAssignStaff({
  data,
  sampleId,
  projects,
}: LabAssignStaffProps) {
  const { project, user } = data;

  // Find the sampling item that matches the provided sampleId
  const sampling = project.sampling_list.find((s) => s._id === sampleId);

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  async function saveProject() {
    setIsLoading(true);

    const response = await saveSample(project._id, "NEED ANALYZE");

    setIsLoading(false);

    if (!response) {
      toast({
        title: "Failed to Assign Deadline and User",
        description: "Please Try Again",
        variant: "destructive",
      });
    } else {
      toast({
        title: "User and Deadline Has Been Assigned",
        description: "Check again in the screen if it's correct",
      });
    }

    router.replace(`/lab/dashboard/`);
  }

  let deadline = "Haven't set deadline yet";
  if (sampling) {
    deadline = sampling.deadline?.to
      ? sampling.deadline.to
      : sampling.deadline?.from ?? "Haven't set deadline yet";
  }

  if (!sampling) {
    return <div>No sampling data found for the given sample ID.</div>;
  }

  const isAssigned =
    sampling.lab_assigned_to && sampling.lab_assigned_to.length !== 0;

  return (
    <div className="w-full border-0 border-black">
      <h1 className="text-3xl font-bold text-dark_brown text-center">
        Assign Staff for {sampling.sample_name}
      </h1>

      {!isAssigned ? (
        <div className="mt-6">
          <h1 className="italic">Not Assigned</h1>
          <div className="flex flex-col gap-2 mt-6">
            <div className="grid grid-cols-3 grid-flow-row text-center">
              <h1 className="font-bold text-lg">Name</h1>
              <h1></h1>
              <h1 className="font-bold text-lg">Assign</h1>
            </div>
            <div className="grid grid-cols-3 grid-flow-row gap-2 text-center">
              <h1 className="">{sampling.sample_name}</h1>
              <h1></h1>
              <LabAssignSelect
                project={project}
                users={user}
                sampling={sampling}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="my-6">
          <h1 className="italic">Assigned</h1>

          <div className="flex flex-col gap-2 mt-6">
            <div className="grid grid-cols-3 grid-flow-row text-center">
              <h1 className="font-bold text-lg">Name</h1>
              <h1 className="font-bold text-lg">Deadline</h1>
              <h1 className="font-bold text-lg">Edit</h1>
            </div>

            <div className="grid grid-cols-3 grid-flow-row gap-2 text-center">
              <h1 className="">{sampling.sample_name}</h1>
              <h1 className="">{deadline}</h1>
              <LabAssignEdit
                project={project}
                sampling={sampling}
                users={user}
              />
            </div>
          </div>
        </div>
      )}

      <Separator orientation="horizontal" className="bg-dark_brown my-16" />

      <div className="mt-6 w-full flex items-center justify-around">
        <h1 className="text-xl">
          Continue this project to <b>Verifikasi Data</b>?
        </h1>

        <Button
          className="bg-light_brown hover:bg-dark_brown font-medium text-lg pb-3"
          onClick={saveProject}
          disabled={isLoading}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
