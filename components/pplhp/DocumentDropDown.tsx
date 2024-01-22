"use client"

import { useState, FC } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface DocumentLink {
    value: string;
    label: string;
}

interface DocumentData {
    judul: string;
    placeholder: string;
    link: DocumentLink[];
}


interface DocumentDropDownProps {
    data: DocumentData[];
}


const DocumentDropDown: FC<DocumentDropDownProps> = ({ data }) => {
    const [value, setValue] = useState("")

    return (
        <div className="w-full">
            <div className="space-y-4 w-full">
                {data.map((tahap) => (
                    <Select key={tahap.judul} onValueChange={(currentValue) => {
                        if (currentValue === value) {
                            return;
                        }
                        window.open(currentValue, '_blank')
                    }}>
                        <h2>{tahap.judul}</h2>
                        <SelectTrigger className="w-full p-6 rounded-2xl">
                            <SelectValue placeholder={tahap.judul} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{tahap.judul}</SelectLabel>
                                {tahap.link.map((link) => (
                                    <SelectItem key={link.value} value={link.value} >
                                        {link.label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>

                        </SelectContent>

                    </Select>
                ))}
            </div>
        </div>
    );
}
export default DocumentDropDown;
