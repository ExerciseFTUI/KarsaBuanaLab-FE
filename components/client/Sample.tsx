"use client";
import React, { FC, useEffect, useState } from "react";
import CustomCheckbox from "../Checkbox/CustomCheckbox";
import axios from "axios";
import { getSampleById } from "@/lib/actions/client.actions";
import { ClientResponses } from "@/lib/type";

interface SampleProps {
  data: ClientResponses[];
}

const Sample: FC<SampleProps> = ({ data }) => {
  return (
    <>
      <CustomCheckbox formLabel="Schedule Logbook" items={data ? data : []} />
    </>
  );
};

export default Sample;
