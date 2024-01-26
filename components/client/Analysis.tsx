import React, { FC } from "react";
import CustomCheckbox from "../Checkbox/CustomCheckbox";

interface AnalysisProps {}

const Analysis: FC<AnalysisProps> = () => {
  const items = [
    {
      label: "PH Air Limbah Domestik",
      accepted: true,
    },
    {
      label: "Kandungan Air  Minum / AMDK",
      accepted: false,
    },
    {
      label: "--------",
      accepted: false,
    },
  ];
  return <CustomCheckbox formLabel="Progress Analisa Sample" items={items} />;
};

export default Analysis;
