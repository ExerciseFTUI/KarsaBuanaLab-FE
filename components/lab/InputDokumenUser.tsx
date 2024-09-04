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
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { InputDocumentType, labInputChoice, LD } from "@/lib/type";
import {
  useLabForm,
  labInputDocumentValidation,
} from "@/lib/validations/LabValidation";
import { z } from "zod";
import { submitLabRev } from "@/lib/actions/lab.actions";
import { sampleAnswer } from "@/lib/type";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface inputDokumenUserProps {
  sample: InputDocumentType;
  isAdmin: boolean;
  sampleId: string;
  choiceParams: [labInputChoice];
}

const InputDokumenUser: FC<inputDokumenUserProps> = ({
  sample,
  isAdmin,
  sampleId,
  choiceParams,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<{
    sample: {
      // sample_name: string;
      param: {
        // param: string;
        unit?: string;
        method?: string[];
        lembar_data: LD;
      }[];
    };
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useLabForm();

  // Initialize form values
  useEffect(() => {
    if (sample) {
      sample.parameters.forEach((param, index) => {
        setValue(`sample.param.${index}.method`, param.method ?? []);
      });
    }
  }, [sample, setValue]);

  function mergeData(
    data: InputDocumentType,
    unitMethodResult: {
      sample: {
        param: {
          unit?: string;
          method?: string[];
          lembar_data?: LD;
        }[];
      };
    }
  ) {
    const mergedSample: sampleAnswer = {
      sample_name: data.sampleName,
      param: data.parameters.map((param, paramId) => ({
        param: param.name,
        unit: unitMethodResult.sample.param[paramId].unit ?? param.unit,
        method: unitMethodResult.sample.param[paramId].method ?? param.method,
        lembar_data:
          unitMethodResult.sample.param[paramId].lembar_data ??
          param.lembar_data,
      })),
    };

    return mergedSample;
  }

  const onSubmit = (data: z.infer<typeof labInputDocumentValidation>) => {
    setFormData(data);
    setIsDialogOpen(true);
  };

  async function handleConfirmSubmit() {
    if (!formData) return;

    const answer = mergeData(sample, formData);
    const response = await submitLabRev(sampleId, answer);

    if (response) {
      toast({
        title: "Submitted",
        description: "Thank you for submitting!",
      });

      router.push("/lab/dashboard");
    } else {
      toast({
        title: "Failed to get the project",
        description: "Please resubmit the form",
      });
    }
    setIsDialogOpen(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="h-fit">
        <Table className="text-light_brown">
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
              {!isAdmin && (
                <TableHead className="w-1/4 text-center text-light_brown font-semibold">
                  Lembar Data
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sample.parameters.map((parameter, parameterId) => (
              <TableRow key={parameterId}>
                <TableCell className="font-medium">{parameter.name}</TableCell>
                <TableCell>
                  <select
                    {...register(`sample.param.${parameterId}.unit`, {
                      setValueAs: (value) =>
                        value === "Select Unit" ? "" : value,
                    })}
                    defaultValue={parameter.unit}
                    className="w-full"
                    disabled={isAdmin ? false : true}
                  >
                    <option className="w-full p-4 rounded bg-gray-100 shadow-none">
                      {parameter.unit ?? "Select Unit"}
                    </option>
                    {choiceParams
                      .find((param) => param.param === parameter.name)
                      ?.unit.filter(
                        (unit) =>
                          !parameter.unit || !parameter.unit.includes(unit)
                      ) // Use optional chaining operator to handle undefined
                      .map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                  </select>
                  <div className="text-xs text-red-600 pt-3 text-center">
                    {errors.sample?.param?.[parameterId]?.unit?.message}
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
                            disabled={isAdmin ? false : true}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const selectedMethod = e.target.value;
                              const currentMethods =
                                getValues(
                                  `sample.param.${parameterId}.method`
                                ) || [];
                              let updatedMethods;
                              if (isChecked) {
                                updatedMethods = [
                                  ...currentMethods,
                                  selectedMethod,
                                ];
                              } else {
                                updatedMethods = currentMethods.filter(
                                  (m) => m !== selectedMethod
                                );
                              }
                              setValue(
                                `sample.param.${parameterId}.method`,
                                updatedMethods
                              );
                            }}
                            defaultChecked={parameter.method?.includes(method)}
                            className="mr-2"
                          />
                          {method}
                        </label>
                      );
                    })}
                  <div className="text-xs text-red-600 pt-3 text-center">
                    {errors.sample?.param?.[parameterId]?.method?.message}
                  </div>
                </TableCell>
                {!isAdmin && (
                  <TableCell>
                    <select
                      {...register(`sample.param.${parameterId}.lembar_data`, {
                        setValueAs: (value) =>
                          value === "Pilih Lembar Data" ? "" : value,
                      })}
                      defaultValue={parameter.lembar_data.ld_name}
                      className="w-full"
                    >
                      <option>
                        {parameter.lembar_data?.ld_name ?? "Pilih Lembar Data"}
                      </option>

                      {/* { choiceParams
                        .find((param) => param.param === parameter.name)
                        ?.lembar_data.filter((lembar_data) => {
                          // Ensure the current lembar_data is not already selected
                          return (
                            !parameter.lembar_data ||
                            parameter.lembar_data.ld_file_id !==
                              lembar_data.ld_file_id
                          );
                        })
                        .map((lembar_data) => (
                          <option
                            key={lembar_data.ld_file_id}
                            value={lembar_data.ld_file_id}
                          >
                            {lembar_data.ld_name}
                          </option>
                        ))} */}
                    </select>
                    <div className="text-xs text-red-600 pt-3 text-center">
                      {
                        errors.sample?.param?.[parameterId]?.lembar_data
                          ?.message
                      }
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center bottom-0 mt-24 text-lg">
          <Button
            className="w-2/3 p-6 bg-light_brown hover:bg-dark_brown mb-16 "
            type="submit"
          >
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
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
};

export default InputDokumenUser;
