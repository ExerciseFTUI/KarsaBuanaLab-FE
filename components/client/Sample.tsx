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
    return (
        <VerticalCheckbox formLabel="Schedule Logbook" items={items}/>
    );
};

export default Sample;
