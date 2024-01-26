import React, { FC } from "react";
import CustomCheckbox from "../Checkbox/CustomCheckbox";

interface SampleProps {}

const Sample: FC<SampleProps> = () => {
  const items = [
    {
      label: "air limbah domestik",
      accepted: true,
    },
    {
      label: "air minum / AMDK",
      accepted: true,
    },
    {
      label: "udara ambien",
      accepted: false,
    },
  ];
  return <CustomCheckbox formLabel="Schedule Logbook" items={items} />;
};

export default Sample;
