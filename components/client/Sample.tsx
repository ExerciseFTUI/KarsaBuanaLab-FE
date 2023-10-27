import React, { FC } from "react";
import VerticalCheckbox from "../Checkbox/VerticalCheckbox";

interface SampleProps {

}

const Sample: FC<SampleProps> = () => {
    const items = [
        {
            id: "airLimbahDomestik",
            label: "air limbah domestik",
        },
        {
            id: "AMDK",
            label: "air minum / AMDK",
        },
        {
            id: "udaraAmbien",
            label: "udara ambien",
        },
    ]

    const initialValue = [
        "airLimbahDomestik",
        "AMDK"
    ]
    return (
        <VerticalCheckbox formLabel="Schedule Logbook" items={items} defaultValue={initialValue}/>
    );
};

export default Sample;
