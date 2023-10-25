"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  createSamplingSchema,
  createSamplingSchemaType,
} from "@/lib/validations/createSamplingSchema";
import SelectMultiple from "./forms/SelectMultiple";

interface Props {
  open: boolean;

  setOpen: (open: boolean) => void;
}

function CreateSamplingModal({ open, setOpen }: Props) {
  const router = useRouter();

  const form = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      parameters: [],
    },
  });
  const { watch, setValue } = form;

  const parameters = watch("parameters");

  const openChangeWrapper = (value: boolean) => {
    setOpen(value);
    form.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // try {
    //   await createTask(data);
    //   toast({
    //     title: "Success",
    //     description: "Task created successfully!!",
    //   });
    //   openChangeWrapper(false);
    //   router.refresh();
    // } catch (e) {
    //   toast({
    //     title: "Error",
    //     description: "Cannot create task",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <Dialog open={open} onOpenChange={openChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">Add Sample :</DialogTitle>
          <DialogDescription>
            Add sample to your collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-1">
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="sampling"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sample</FormLabel>
                    <FormControl>
                      <Select onValueChange={(color) => field.onChange(color)}>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select the file template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Template File</SelectLabel>
                            <SelectItem value="Sample 1">Sample 1</SelectItem>
                            <SelectItem value="Sample 2">Sample 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            className={cn("w-full dark:text-white text-white")}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateSamplingModal;
