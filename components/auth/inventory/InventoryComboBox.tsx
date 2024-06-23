// "use client"
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { Sampling } from "@/lib/type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dropzone from "@/components/Dropzone";
import DropzoneSample from "@/components/DropzoneSample";
import { useToast } from "@/components/ui/use-toast";
import { BaseSample } from "@/lib/models/baseSample.model";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import CancelPopup from "@/components/cancelPopup";
import {
  deleteBaseSample,
  editBaseSample,
} from "@/lib/actions/marketing.actions";
import { useRouter } from "next/navigation";
import { addBaseSample } from "@/lib/actions/marketing.client.actions";
import LoadingScreen from "@/components/LoadingScreen";
import { InventoryVendor } from "./InventoryType";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { inventoryValidation } from "./InventoryValidation";
import { inventoryValidationV2 } from "./InventoryValidationV2";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the InventoryComboBoxProps interface
interface InventoryComboBoxProps {
  sample: string;
  setSample: React.Dispatch<React.SetStateAction<string>>;
  baseSample: InventoryVendor[];
  form: UseFormReturn<z.infer<typeof inventoryValidation>>;
  isDisabled: boolean;
}

const InventoryComboBox: React.FC<InventoryComboBoxProps> = ({
  sample,
  setSample,
  baseSample,
  isDisabled,
}: InventoryComboBoxProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [sampleName, setSampleName] = useState("");
  const [edit, setEdit] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [hoveredSample, setHoveredSample] = useState("");

  const tempForm = useForm<z.infer<typeof inventoryValidationV2>>({
    resolver: zodResolver(inventoryValidationV2),
    defaultValues: {
      tool: ``,
      description: ``,
      deadline: new Date(),
      vendor: sample,
      category: ``,
      maintenanceEvery: ``,
    },
  });

  const onSubmit = async () => {
    setIsLoading(true);

    setIsLoading(false);

    setShowNewTeamDialog(false);

    alert("Succesfully Add New Vendor");
  };

  const handleDeleteVendor = async () => {
    alert("Succesfully Deleted");
  };

  return (
    <div className="w-full">
      {isLoading && <LoadingScreen text="Creating new base sample" />}
      {showDeleteConfirmation && (
        <CancelPopup
          isCancelled={true}
          setIsCancelled={setShowDeleteConfirmation}
          message={`Are you sure you want to delete ${sampleName.replace(
            /_/g,
            " "
          )} sample?`} // Concatenate sampleName in the message
          handleCancelledProject={handleDeleteVendor}
        />
      )}

      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={isDisabled}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className=" w-full justify-between text-light_brown  border-light_brown border-2 focus:ring-0 hover:text-light_brown"
            >
              {sample ? sample : "Select Vendor"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 end-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" side="right">
            <Command className="w-full">
              <CommandInput placeholder="Search Vendor" className="" />
              <CommandEmpty>No Sample found.</CommandEmpty>
              <CommandEmpty
                className=" p-2 m-1 rounded-md bg-light_green hover:bg-dark_green hover:text-white hover:cursor-pointer flex flex-row items-center "
                onSelect={() => {
                  setOpen(false);
                  setShowNewTeamDialog(true);
                }}
              >
                <CommandSeparator />
                <PlusCircledIcon className="h-5 w-5" />
                <p className=" text-base font-semibold ml-3 ">Add New Vendor</p>
              </CommandEmpty>
              <CommandGroup>
                {baseSample.map((data) => (
                  <CommandItem
                    key={data._id}
                    onSelect={(currentValue: any) => {
                      setSample(currentValue === sample ? "" : currentValue);
                      if (!edit) setOpen(false);
                    }}
                    className="-mx-4 flex justify-between items-center relative text-light_brown" // Add relative class for positioning
                    onMouseEnter={() => setHoveredSample(data._id)} // Set the hovered sample when mouse enters
                    onMouseLeave={() => setHoveredSample("")} // Clear the hovered sample when mouse leaves
                  >
                    <div className="flex items-start">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          sample === data.sample_name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <span>{data.sample_name.replace(/_/g, " ")}</span>
                    </div>
                    {/* Conditional rendering of delete and edit buttons based on hover state */}
                    {hoveredSample === data._id && (
                      <div className="flex flex-row">
                        <MdDelete
                          className="h-5 w-5 mr-2 text-red-500 hover:cursor-pointer hover:text-white hover:bg-red-500 hover:rounded-md"
                          onClick={() => {
                            setEdit(false);
                            setSampleName(data.sample_name);
                            setShowDeleteConfirmation(true);
                          }}
                        />
                      </div>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      className=" bg-light_green hover:bg-dark_green hover:text-white hover:cursor-pointer flex flex-row items-center "
                      onSelect={() => {
                        setOpen(false);
                        setShowNewTeamDialog(true);
                      }}
                    >
                      <PlusCircledIcon className="h-5 w-5" />
                      <p className=" text-base font-semibold ml-3 ">
                        Add new Vendor
                      </p>
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogContent className="border-2 border-dark_green w-40">
          <DialogHeader>
            <DialogTitle>Add new Vendor</DialogTitle>
            <DialogDescription>
              Add a new sample to manage project smoothly.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Sample name</Label>
                <Input
                  id="sampleName"
                  value={sampleName}
                  onChange={(e) => setSampleName(e.target.value)}
                  placeholder="Air Tanah 2024"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewTeamDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => onSubmit()}
              className=" bg-light_green text-black hover:text-white hover:bg-dark_green"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryComboBox;
