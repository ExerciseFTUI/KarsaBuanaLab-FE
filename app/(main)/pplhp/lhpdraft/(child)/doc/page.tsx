"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter } from "next/navigation";

const dropdown = [
    {
        judul: "Tahap 1",
        placeholder: "Tahap 1",
        link : [
            {
                value: "link1",
                label: "link1",
            },
            {
                value: "link2",
                label: "link2",
            },
            {
                value: "link3",
                label: "link3",
            },
            {
                value: "link4",
                label: "link4",
            },
            {
                value: "link5",
                label: "link5",
            },
        ]
    },
    {
        judul: "Tahap 2",
        placeholder: "Tahap 2",
        link : [
            {
                value: "link1",
                label: "link1",
            },
            {
                value: "link2",
                label: "link2",
            },
            {
                value: "link3",
                label: "link3",
            },
            {
                value: "link4",
                label: "link4",
            },
            {
                value: "link5",
                label: "link5",
            },
        ]
    },
    {
        judul: "Tahap 3",
        placeholder: "Tahap 3",
        link : [
            {
                value: "link1",
                label: "link1",
            },
            {
                value: "link2",
                label: "link2",
            },
            {
                value: "link3",
                label: "link3",
            },
            {
                value: "link4",
                label: "link4",
            },
            {
                value: "link5",
                label: "link5",
            },
        ]
    },
    {
        judul: "Tahap 4",
        placeholder: "Tahap 4",
        link : [
            {
                value: "link1",
                label: "link1",
            },
            {
                value: "link2",
                label: "link2",
            },
            {
                value: "link3",
                label: "link3",
            },
            {
                value: "link4",
                label: "link4",
            },
            {
                value: "link5",
                label: "link5",
            },
        ]
    },
];

export default function Home() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <div className="w-1/2 h-screen px-16 space-y-6">
            <div className="flex flex-row text-2xl font-medium space-x-0 cursor-pointer">
                <div
                    className="flex flex-col items-end text-ghost_green w-1/2"
                    onClick={() => router.push("sampel/")}
                >
                    <h1 className="m-4 mx-5">Sampel</h1>
                    <div className="w-4/5 h-1 bg-ghost_green rounded-l-full" />
                </div>
                <div className="w-1/2 cursor-pointer text-moss_green">
                    <h1 className="m-4 mx-5">Dokumen</h1>
                    <div className="w-4/5 h-1 bg-moss_green rounded-r-full" />
                </div>
            </div>
            <div className="space-y-4">
                {dropdown.map((field, index) => (
                    <div key={index} className="space-y-3">
                        <h2>{field.judul}</h2>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between border-moss_green rounded-xl p-6"
                                >
                                    {value
                                        ? field.link.find((link) => link.value === value)?.label
                                        : field.placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="min-w-full p-0">
                                <Command>
                                    <CommandGroup>
                                        {field.link.map((link) => (
                                            <CommandItem
                                                key={link.value}
                                                value={link.value}
                                                onSelect={(currentValue) => {
                                                    if (currentValue === value) {
                                                        return;
                                                    }
                                                    window.open(currentValue, '_blank');
                                                    setOpen(false);
                                                }}
                                            >
                                                {link.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                ))}
            </div>
        </div>
    );
}
