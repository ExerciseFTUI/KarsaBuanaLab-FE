import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { create } from "domain";
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
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

import { toast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import SelectMultiple from "./forms/SelectMultiple";

interface CreateSamplingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateSamplingSheet: FC<CreateSamplingSheetProps> = ({
  open,
  onOpenChange,
}) => {
  const router = useRouter();

  const form = useForm<FieldValues>({
    defaultValues: {
      sampling: "",
      parameters: [],
    },
  });
  const { watch, setValue } = form;

  const parameters = watch("parameters");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Project</SheetTitle>
          <SheetDescription>Add a new project to the database</SheetDescription>
        </SheetHeader>
        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription>Project Name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (

              )}
            />
          </form>
        </Form> */}
        <div className="w-60">
          <SelectMultiple
            label="Parameters"
            // options={users.map((user) => ({
            //   value: user.id,
            //   label: user.name,
            // }))}
            options={[
              { value: "Parameter1", label: "Parameter 1" },
              { value: "Parameter2", label: "Parameter 2" },
              { value: "Parameter3", label: "Parameter 3" },
              { value: "Parameter4", label: "Parameter 4" },
              { value: "Parameter5", label: "Parameter 5" },
              { value: "Parameter6", label: "Parameter 6" },
            ]}
            onChange={(value) =>
              setValue("parameters", value, { shouldValidate: true })
            }
            value={parameters}
          />
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <Separator />
          <Button
            disabled={form.formState.isSubmitting}
            variant={"outline"}
            onClick={form.handleSubmit(onSubmit)}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="w-4 h-4 animate-spin ml-2" />
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateSamplingSheet;
