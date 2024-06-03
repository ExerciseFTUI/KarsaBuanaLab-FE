"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { InputDocumentType, labInputChoice, sampleAnswer } from "@/lib/type";
import {
  useLabForm,
  labInputDocumentValidation,
} from "@/lib/validations/LabValidation";
import { z } from "zod";
import { submitLab } from "@/lib/actions/lab.actions";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import InputParam from "./InputParam";

interface inputDokumenUserProps {
  sample: [InputDocumentType];
  userId: string;
  projectId: string;
  choiceParams: [labInputChoice];
}

const InputDokumenUser: FC<inputDokumenUserProps> = ({
  sample,
  userId,
  projectId,
  choiceParams,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  // State declaration
  const [lastSelectedUnits, setLastSelectedUnits] = useState<Record<string, string>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof labInputDocumentValidation>>();

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useLabForm();

  // For default values result
useEffect(() => {
  sample.forEach((inputDocument, sampleId) => {
    inputDocument.parameters.forEach((parameter, parameterId) => {
      const defaultValue = String(parameter.result);
      if (defaultValue === "undefined" || defaultValue === "null") {
        return;
      }
      setValue(`sample.${sampleId}.parameter.${parameterId}.result`, defaultValue);
    });
  });
}, [sample, setValue]);

// For default values unit and method
useEffect(() => {
  const updatedLastSelectedUnits: Record<string, string> = {};

  // Loop through each parameter in the sample
  sample.forEach((inputDocument) => {
    inputDocument.parameters.forEach((parameter) => {
      const { name, unit, method } = parameter;
      const lastUnit = lastSelectedUnits[name]; // Get last selected unit
      //set value for method
      setValue(`sample.${sample.indexOf(inputDocument)}.parameter.${inputDocument.parameters.indexOf(parameter)}.method`, method);

      // Check if unit and method are defined
      if (unit && method) {
        // Check if last selected unit is valid and still available in options
        if (lastUnit === unit) {
          updatedLastSelectedUnits[name] = lastUnit; // Use last selected unit as default
        } else {
          updatedLastSelectedUnits[name] = unit; // Use unit as default
        }
      }
    });
  });

  // Update state with the new last selected units
  setLastSelectedUnits(updatedLastSelectedUnits);
}, [sample]); // Only re-run the effect when sample changes


  function mergeData(
    data: [InputDocumentType],
    unitMethodResult: {
      sample: {
        parameter: { unit: string; method: string[]; result: string }[];
      }[];
    }
  ) {
    const mergedData: sampleAnswer[] = [];

    data.map((sample, sampleId) => {
      const mergedSample = {
        sample_name: sample.sampleName,
        param: sample.parameters.map((param, paramId) => ({
          param: param.name,
          result: unitMethodResult.sample[sampleId].parameter[paramId].result,
          unit: unitMethodResult.sample[sampleId].parameter[paramId].unit,
          method: unitMethodResult.sample[sampleId].parameter[paramId].method,
        })),
      };
      mergedData.push(mergedSample);
    });

    return mergedData;
  }

  async function onSubmit(data: z.infer<typeof labInputDocumentValidation>) {
    setFormData(data);
    setIsDialogOpen(true);
  }

  async function handleConfirmSubmit() {
    if (!formData) return;
  
    const answer = mergeData(sample, formData);
    const response = await submitLab(projectId, answer);

    if (response) {
      toast({
        title: "Submitted",
        description: "Thank you for submitting!",
      });
  
      router.push("/lab/dashboard");
    } else {
      toast({
        title: "Failed to get the project",
        description: "please resubmit the form",
      });
    }
    setIsDialogOpen(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="h-fit">
        <h1 className="text-black_brown text-2xl font-semibold pb-8">
          Input Dokumen
        </h1>
        <div>
          {sample.map((sample, sampleId) => (
            <Table key={sampleId} className="text-light_brown">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4 text-light_brown font-semibold">
                    {sample.sampleName}
                  </TableHead>
                  <TableHead className="w-1/4 text-center text-light_brown font-semibold">
                    Unit
                  </TableHead>
                  <TableHead className="w-1/4 text-center text-light_brown font-semibold">
                    Method
                  </TableHead>
                  <TableHead className="w-1/4 text-center text-light_brown font-semibold">
                    Result
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sample.parameters.map((parameter, parameterId) => (
                  <TableRow key={parameterId}>
                    <TableCell className="font-medium">
                      {parameter.name}
                    </TableCell>
                    <TableCell>
                    <select
                      className="w-full"
                      {...register(
                        `sample.${sampleId}.parameter.${parameterId}.unit`,
                        {
                          setValueAs: (value) => (value === "Select Unit" ? "" : value),
                        }
                      )}
                    >
                      <option className="w-full p-4 rounded bg-gray-100 shadow-none">
                      { parameter.unit ?? "Select Unit"}
                      </option>
                      {choiceParams
                        .find((param) => param.param === parameter.name)
                        ?.unit.filter((unit) => !parameter.unit || !parameter.unit.includes(unit)) // Use optional chaining operator to handle undefined
                        .map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                    </select>
                      <div className="text-xs text-red-600 pt-3 text-center">
                        {
                          errors.sample?.[sampleId]?.parameter?.[parameterId]
                            ?.unit?.message
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      {choiceParams
                        .find((param) => param.param === parameter.name)
                        ?.method.map((method) => {
                          return (
                            <label key={method} className="block">
                              <input
                                type="checkbox"
                                value={method}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const selectedMethod = e.target.value;
                                  const currentMethods = getValues(`sample.${sampleId}.parameter.${parameterId}.method`) || [];
                                  let updatedMethods;
                                  if (isChecked) {
                                    updatedMethods = [...currentMethods, selectedMethod];
                                  } else {
                                    updatedMethods = currentMethods.filter((m) => m !== selectedMethod);
                                  }
                                  setValue(`sample.${sampleId}.parameter.${parameterId}.method`, updatedMethods);
                                }}
                                
                                defaultChecked={parameter.method?.includes(method)}
                                className="mr-2"
                              />
                              {method}
                            </label>
                          );
                        })}
                      <div className="text-xs text-red-600 pt-3 text-center">
                        {errors.sample?.[sampleId]?.parameter?.[parameterId]?.method?.message}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                    <Input
                      type="text"
                      className="bg-white"
                      {...register(`sample.${sampleId}.parameter.${parameterId}.result`)}
                    />
                      {/* <Input
                        type="text"
                        className="bg-gray-100"
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.result`
                        )}
                        value={parameter.result}
                      /> */}
                      <div className="text-xs text-red-600 pt-3 text-center">
                        {
                          errors.sample?.[sampleId]?.parameter?.[parameterId]
                            ?.result?.message
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ))}
        </div>
        <div className="flex justify-center bottom-0 mt-24 text-lg">
          <Button className="w-2/3 p-6 bg-light_brown hover:bg-dark_brown" type="button" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </div>
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSubmit}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
};

export default InputDokumenUser;