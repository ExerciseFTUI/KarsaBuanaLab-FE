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
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons"
import { Sampling } from "@/lib/type"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Dropzone from "@/components/Dropzone"
import DropzoneSample from "@/components/DropzoneSample"
import { useToast } from "@/components/ui/use-toast"
import { BaseSample } from "@/lib/models/baseSample.model"

// Define the SearchableDropdownProps interface
interface SearchableDropdownProps {
  sample: string;
  setSample: React.Dispatch<React.SetStateAction<string>>;
  baseSample: BaseSample[];
}


const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ sample, setSample, baseSample } : SearchableDropdownProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false)
  const [JSAFile, setJSAFile] = useState([])
  const [templateSampleForm, setTemplateSampleForm] = useState([])
  const [sampleName, setSampleName] = useState("")

  const onSubmit = () => {
    // Check if sampleName is empty or JSAFile and templateSampleForm are empty arrays
    if (sampleName === "" || (JSAFile.length === 0 || templateSampleForm.length === 0)) {
      toast({
          title: "You forgot something!",
          variant: "destructive",
          description: "Make sure all input name and files have been uploaded",
      });
    } else {
      // Log the values if all fields have valid values
      console.log("Name of the sample:", sampleName);
      console.log("JSA File:", JSAFile);
      console.log("Template Sample Form:", templateSampleForm);
      
      // TODO: Call Post API and set loading also toast 

      setShowNewTeamDialog(false);
    }
  }

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button 
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" w-80 justify-between"
            >
            {sample
              ? sample
              : "Select Sample"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 end-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search Sample..." />
            <CommandEmpty>No Sample found.</CommandEmpty>
            <CommandGroup>
            {/* SET NEW BASESAMPLE.NAME IN HERE AND REPLATE THE SAMPLING */}
              {baseSample.map((data) => (
                <CommandItem
                  key={data._id}
                  onSelect={(currentValue: any) => {
                    setSample(currentValue === sample ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      sample === data.sample_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.sample_name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
                <CommandList>
                <CommandGroup>
                    <DialogTrigger asChild >
                    <CommandItem
                    className=' bg-light_green hover:bg-dark_green hover:text-white hover:cursor-pointer flex flex-row items-center '
                        onSelect={() => {
                        setOpen(false)
                        setShowNewTeamDialog(true)
                        }}
                    >
                        <PlusCircledIcon className="h-5 w-5" />
                        <p className=" text-base font-semibold ml-3 ">Create New Sample</p>
                    </CommandItem>
                    </DialogTrigger>
                </CommandGroup>
                </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className="border-2 border-dark_green w-40">
        <DialogHeader >
          <DialogTitle>Create New Base Sample</DialogTitle>
            <DialogDescription>
                Add a new sample to manage project smoothly.
            </DialogDescription>
          </DialogHeader>
          <div >
            <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                <Label htmlFor="name">Sample name</Label>
                <Input 
                  id="sampleName"
                  value={sampleName}
                  onChange={(e) => setSampleName(e.target.value)} 
                  placeholder="Air Tanah 2024" />
                </div>
                <div className="">
                <Label htmlFor="plan">Upload Files</Label>
                <DialogDescription className=" text-xs">
                    Each of section just only for one file.
                </DialogDescription>
                <div className="w-full h-[0.1rem] bg-dark_green"></div>
                <div className=" w-fit overflow-clip flex flex-row justify-between items-center">
                  <div className=" flex flex-col py-2 w-1/2 overflow-x-clip">
                    <Label className=" mb-3">File Job Safety Assurance</Label>
                    <DropzoneSample type={"JSA"} setUploadedFiles={setJSAFile} />
                  </div>
                  <div className=" w-1 h-56 bg-dark_green mx-1"></div>
                  <div className=" flex flex-col py-2 w-1/2 overflow-x-clip">
                    <Label className=" mb-3">Template Sampling Excel Form</Label>
                    <DropzoneSample type={"Template"} setUploadedFiles={setTemplateSampleForm} />
                  </div>
                </div>
                </div>
            </div>
      </div>
      <DialogFooter>
      <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
          Cancel
      </Button>
      <Button type="submit" onClick={() => onSubmit()} className=" bg-light_green text-black hover:text-white hover:bg-dark_green">Submit</Button>
      </DialogFooter>
  </DialogContent>
</Dialog>
  );
}

export default SearchableDropdown;
