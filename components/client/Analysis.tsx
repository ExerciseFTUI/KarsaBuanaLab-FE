import React, { FC } from "react";
import VerticalCheckbox from "../Checkbox/VerticalCheckbox";

interface AnalysisProps {

}

const Analysis: FC<AnalysisProps> = () => {
    const items = [
        {
            id: "phAirLimbahDomestik",
            label: "PH Air Limbah Domestik",
        },
        {
            id: "AMDK",
            label: "Kandungan Air  Minum / AMDK",
        },
        {
            id: "--------",
            label: "--------",
        },
    ]
    return (
        <VerticalCheckbox formLabel="Progress Analisa Sample" items={items}/>
    );
};

export default Analysis;
