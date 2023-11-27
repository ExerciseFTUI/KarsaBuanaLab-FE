// "use client"
import React, { useState } from "react"
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
import { Sampling } from "@/lib/type"

// Define the SearchableDropdownProps interface
interface SearchableDropdownProps {
  sample: string;
  setSample: React.Dispatch<React.SetStateAction<string>>;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ sample, setSample }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild>
        <Button 
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" w-80 justify-between"
        >
          {sample
            ? Sampling.samples.find((data) => data.name === sample)?.name
            : "Select Sample"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 end-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Sample..." />
          <CommandEmpty>No Sample found.</CommandEmpty>
          <CommandGroup>
            {Sampling.samples.map((data) => (
              <CommandItem
                key={data.name}
                onSelect={(currentValue) => {
                  setSample(currentValue === sample ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    sample === data.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {data.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SearchableDropdown;
