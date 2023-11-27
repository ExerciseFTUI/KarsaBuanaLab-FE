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

const samples = [
  {
    value: "air laut",
    label: "Air Laut",
  },
  {
    value: "air tawar",
    label: "air tawar",
  },
  {
    value: "air tanah",
    label: "air tanah",
  },
  {
    value: "tanah pegunungan",
    label: "tanah pegunungan",
  },
  {
    value: "tanah liat",
    label: "tanah liat",
  },
]

// Define the SearchableDropdownProps interface
interface SearchableDropdownProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ value, setValue }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-72 justify-between"
        >
          {value
            ? samples.find((sample) => sample.value === value)?.label
            : "Select Sample"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="  w-72 p-0">
        <Command>
          <CommandInput placeholder="Search Sample..." />
          <CommandEmpty>No Sample found.</CommandEmpty>
          <CommandGroup>
            {samples.map((sample) => (
              <CommandItem
                key={sample.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === sample.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {sample.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SearchableDropdown;