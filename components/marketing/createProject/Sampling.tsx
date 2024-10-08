"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { FC, useState, useTransition } from "react";
import {
  CaretDownIcon,
  CaretUpIcon,
  TrashIcon,
  PlusIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  FieldValues,
  SubmitHandler,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  useForm,
} from "react-hook-form";
import CreateSampleModal from "./CreateSampleModal";
import { toast, useToast } from "@/components/ui/use-toast";
import { BaseSample } from "@/lib/models/baseSample.model";
import { updateSamplePPLHP } from "@/lib/actions/pplhp.actions";
import { useRouter } from "next/navigation";
import { loadComponents } from "next/dist/server/load-components";
import LoadingScreen from "@/components/LoadingComp";

interface SamplingProps {
  sampleName: string;
  regulation: string;
  parameters: string[];
  deleteSample: () => void;
  index: number;
  update: UseFieldArrayUpdate<FieldValues, "samples">;
  baseSamples?: BaseSample[];
  isApproval?: boolean;
  isPPLHP?: boolean;
  params?: {
    np: string;
    sampleId: string;
  };
}

const Sampling: FC<SamplingProps> = ({
  sampleName,
  regulation,
  parameters,
  deleteSample,
  index,
  update,
  baseSamples,
  isApproval,
  isPPLHP,
  params,
}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, startTranstition] = useTransition();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const approval = isApproval || false;

  //React Hook Form
  const form = useForm<FieldValues>({
    defaultValues: {
      sampling: sampleName,
      regulation: regulation,
      parameters: parameters,
    },
  });

  const { setValue, resetField } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //Updating Sample
    //Get the parameter only value
    const parametersValue = data.parameters.map(
      (parameter: any) => parameter.value
    );

    //Get the needed data
    const finalSample = {
      sampleName: data.sampling,
      regulation: data.regulation,
      parameters: parametersValue,
    };

    if (isPPLHP && params) {
      setIsSubmitting(true);
      setOpenModal(false);
      //Update the sample
      const successUpdate = await updateSamplePPLHP(
        params?.np,
        params?.sampleId,
        finalSample
      );

      setIsSubmitting(false);

      router.push(`/pplhp/receive/${params.np}/${successUpdate}`);
    } else {
      update(index, finalSample);
    }

    toast({
      title: "Successfully updating the sample",
      description: "Good Job",
    });

    //Reset all the form
    setValue("parameters", [""], { shouldValidate: true });
    resetField("sampling");
    resetField("parameters");
    setOpenModal(false);
  };

  return (
    <>
      {isSubmitting && <LoadingScreen />}

      <CreateSampleModal
        title="Update Sample"
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          //Reset Parameter value
          // setValue("parameters", [""], { shouldValidate: true });

          //===============BUG?
          resetField("sampling");
          resetField("parameters");
          // form.reset();
        }}
        form={form}
        onSubmit={onSubmit}
        baseSamples={baseSamples}
        change={false}
      />
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            className={cn(
              "flex w-full justify-between p-6 flex-row bg-moss_green hover:bg-dark_green",
              isOpen && "rounded-b-none"
            )}
          >
            <span className="text-white font-bold">{sampleName}</span>
            <div className=" flex flex-row">
              {!isOpen && <CaretDownIcon className="h-6 w-6" />}
              {isOpen && <CaretUpIcon className="h-6 w-6" />}
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg ">
          {/* {parameters.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center rounded-none gap-1 p-8 py-12"
            >
              <p>There are no parameter yet:</p>
              <span className={cn("text-sm bg-clip-text text-transparent")}>
                Create one
              </span>
            </Button>
          )} */}
          {/* <p className="px-4 py-1 text-xs">{regulation}</p> */}
          <Separator />
          {parameters.length > 0 && (
            <>
              <ul className="p-4 grid grid-cols-2 gap-2 ">
                {parameters.map((parameter, index) => (
                  <li key={parameter + index} className="text-xs">
                    {parameter}
                  </li>
                ))}
              </ul>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex items-center justify-between">
            {/* <p>Total {parameters.length} Parameters</p> */}
            {regulation}
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  disabled={approval}
                  onClick={() => setOpenModal(true)}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <Pencil2Icon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button disabled={approval} size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will be permanently
                      delete your sample and parameter inside it
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          //   startTranstition(removeCollection);
                          deleteSample();
                        }}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default Sampling;
