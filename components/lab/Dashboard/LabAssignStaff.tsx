"use client"

import React from "react"

import { Project } from "@/lib/models/project.model"
import { SamplingRequestData } from "@/lib/type"
import { LabAssignSelect } from "./LabAssignSelect"
import { useRouter } from "next/navigation"
import { LabAssignEdit } from "./LabAssignEdit"

interface params {
  data: SamplingRequestData
  projects: Project[]
}

export default function LabAssignStaff({ data, projects }: params) {
  const { files, project, user } = data

  const samplingNotAssigned = project.sampling_list.filter(
    (s) => s.lab_assigned_to.length === 0
  )
  const samplingAssigned = project.sampling_list.filter(
    (s) => s.lab_assigned_to.length !== 0
  )

  return (
    <div className="w-full border-0 border-black">
      <h1 className="text-3xl font-bold text-dark_brown text-center">
        Assign Staff
      </h1>

      {
        /* samplingNotAssigned.length > 0 */ true && (
          <div className="mt-6">
            <h1 className="italic">
              Not Assigned: {samplingNotAssigned.length}
            </h1>

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
                  <h1 className="">{s.sample_name}</h1>

                  <h1></h1>

                  <LabAssignSelect
                    project={project}
                    users={user}
                    sampling={s}
                  />
                </div>
              ))}
            </div>
          </div>
        )
      }

      <div className="mt-6">
        <h1 className="italic">Assigned: {samplingAssigned.length}</h1>

        <div className="flex flex-col gap-2 mt-6">
          <div className="grid grid-cols-3 grid-flow-row text-center">
            <h1 className="font-bold text-lg">Name</h1>
            <h1 className="font-bold text-lg">Deadline</h1>
            <h1 className="font-bold text-lg">Edit</h1>
          </div>

          {samplingAssigned.map((u, i) => (
            <div
              key={i}
              className="grid grid-cols-3 grid-flow-row gap-2 text-center"
            >
              <h1 className="">{u.sample_name}</h1>

              <h1 className="">{u.deadline}</h1>

              <LabAssignEdit project={project} sampling={u} users={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
