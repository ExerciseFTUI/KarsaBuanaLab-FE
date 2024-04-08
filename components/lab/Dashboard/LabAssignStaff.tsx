"use client"
import React from "react";
import { Project } from "@/lib/models/project.model";
import { SamplingRequestData } from "@/lib/type";
import { LabAssignSelect } from "./LabAssignSelect";
import { LabAssignEdit } from "./LabAssignEdit";
import { format, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface LabAssignStaffProps {
  data: SamplingRequestData;
  projects: Project[];
}

const LabAssignStaff: React.FC<LabAssignStaffProps> = ({ data, projects }) => {
  const { files, project, user } = data;

  const samplingNotAssigned = project.sampling_list.filter(
    (s) => s.lab_assigned_to.length === 0
  );

  const samplingAssigned = project.sampling_list.filter(
    (s) => s.lab_assigned_to.length !== 0
  );

  const handleEventClick = (eventInfo:any) => {
    const { start, end } = eventInfo.event;

    const startDate = new Date(start);
    const formattedStartDate = startDate.toLocaleDateString();

    let formattedEndDate = formattedStartDate;
    if (end) {
      const endDate = new Date(end);
      const updatedEndDate = addDays(endDate, 1);
      formattedEndDate = updatedEndDate.toLocaleDateString();
    }

    // Use formattedEndDate in your logic as needed
    console.log("Updated End Date:", formattedEndDate);
  };

  const saveProject = () => {
    // Implement saveProject logic
    console.log("Saving project...");
  };

  return (
    <div className="w-full border-0 border-black">
      <h1 className="text-3xl font-bold text-dark_brown text-center">Assign Staff</h1>

      {/* Display unassigned samples */}
      {samplingNotAssigned.length > 0 && (
        <div className="mt-6">
          <h1 className="italic">Not Assigned: {samplingNotAssigned.length}</h1>

          <div className="flex flex-col gap-2 mt-6">
            <div className="grid grid-cols-3 grid-flow-row text-center">
              <h1 className="font-bold text-lg">Name</h1>
              <h1></h1>
              <h1 className="font-bold text-lg">Assign</h1>
            </div>
            {samplingNotAssigned.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-3 grid-flow-row gap-2 text-center"
              >
                <h1>{s.sample_name}</h1>
                <h1></h1>
                <LabAssignSelect project={project} users={user} sampling={s} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display assigned samples */}
      <div className="my-6">
        <h1 className="italic">Assigned: {samplingAssigned.length}</h1>

        <div className="flex flex-col gap-2 mt-6">
          <div className="grid grid-cols-3 grid-flow-row text-center">
            <h1 className="font-bold text-lg">Name</h1>
            <h1 className="font-bold text-lg">Deadline</h1>
            <h1 className="font-bold text-lg">Edit</h1>
          </div>

          {samplingAssigned.map((u, i) => {
            const jadwal_sampling = u.deadline || { from: "", to: "" };
            const from = jadwal_sampling.from ? jadwal_sampling.from.split("-") : [];
            const to = jadwal_sampling.to ? jadwal_sampling.to.split("-") : [];

            return (
              <div
                key={i}
                className="grid grid-cols-3 grid-flow-row gap-2 text-center"
              >
                <h1>{u.sample_name}</h1>
                <h1>
                  {u.deadline ? (
                    to.length > 0 ? (
                      format(
                        new Date(parseInt(from[2]), parseInt(from[1]) - 1, parseInt(from[0])),
                        "LLL dd, y"
                      ) +
                      " - " +
                      format(
                        new Date(parseInt(to[2]), parseInt(to[1]) - 1, parseInt(to[0])),
                        "LLL dd, y"
                      )
                    ) : (
                      format(
                        new Date(parseInt(from[2]), parseInt(from[1]) - 1, parseInt(from[0])),
                        "LLL dd, y"
                      )
                    )
                  ) : (
                    "Jadwal belum ada."
                  )}
                </h1>
                <LabAssignEdit project={project} sampling={u} users={user} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue project to verification */}
      {samplingNotAssigned.length === 0 && (
        <>
          <Separator orientation="horizontal" className="bg-dark_brown" />

          <div className="mt-6 w-full flex items-center justify-around">
            <h1 className="text-xl">
              Continue this project to <b>Verifikasi Data</b>?
            </h1>

            <Button
              className="bg-light_brown hover:bg-dark_brown font-medium text-lg pb-3"
              onClick={saveProject}
            >
              Save
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LabAssignStaff;
