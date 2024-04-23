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
import { getChoiceParams, submitLab } from "@/lib/actions/lab.action";
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
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useLabForm();

  useEffect(() => {
    sample.forEach((inputDocument, sampleId) => {
      inputDocument.parameters.forEach((parameter, parameterId) => {
        const defaultValue = String(parameter.result);
        setValue(`sample.${sampleId}.parameter.${parameterId}.result`, defaultValue);
      });
    });
  }, [sample, setValue]);

  function mergeData(
    data: [InputDocumentType],
    unitMethodResult: {
      sample: {
        parameter: { unit: string; method: string; result: string }[];
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
    console.log("mergedData", mergedData);
    
    return mergedData;
  }

  async function onSubmit(data: z.infer<typeof labInputDocumentValidation>) {
    console.log("on submit");
    
    const answer = mergeData(sample, data);
    const response = await submitLab(projectId, answer);

    console.log("answer", answer);
    
    return;
    if (response) {
      toast({
        title: "Submitted",
        description: "Thank you for submitting!",
      });

      router.push("/lab/dashboard");
    }
    if (!response) {
      toast({
        title: "Failed to get the project",
        description: "please resubmit the form",
      });
      return;
    }
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
                      {/* Bachul */}
                      {/* <div 
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.method`
                          // selectedUnit
                        )}>
                        <InputParam 
                          title="Select unit" 
                          result={parameter.unit[0] ?? "Select Unit"}
                          // passing data choiceParams.unit with the same parameter.name and choiceParams.param please note that choiceParams still array of object, so we need to find the object of choiceParams.param that have the same parameter.name and return the unit
                          options={choiceParams.find(
                            (param) => param.param === parameter.name)?.unit ?? []
                          }
                          {...register(
                            `sample.${sampleId}.parameter.${parameterId}.unit`
                            )}
                            />
                        <div className="text-xs text-red-600 pt-3 text-center">
                          {
                            errors.sample?.[sampleId]?.parameter?.[parameterId]
                            ?.unit?.message
                          }
                        </div>
                      </div> */}
                      {/* Bachul */}
                      <select
                        className="w-full"
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.unit`
                        )}
                      >
                        {/* <option className="w-full p-4 rounded bg-gray-100 shadow-none">
                          {parameter.unit[0] ?? "Select Unit"}
                        </option> */}
                        {choiceParams
                          .find((param) => param.param === parameter.name)
                          ?.unit.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        {/* {parameter.unit.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))} */}
                      </select>
                      <div className="text-xs text-red-600 pt-3 text-center">
                        {
                          errors.sample?.[sampleId]?.parameter?.[parameterId]
                            ?.unit?.message
                        }
                      </div>
                    </TableCell>
                    <TableCell>
                      {/* Bachul */}
                      {/* <InputParam 
                          title="Select Method" 
                          result={parameter.method[0] ?? "Select Method"}
                          // passing data choiceParams.unit with the same parameter.name and choiceParams.param please note that choiceParams still array of object, so we need to find the object of choiceParams.param that have the same parameter.name and return the unit
                          options={choiceParams.find(
                            (param) => param.param === parameter.name)?.method ?? []
                          }
                          {...register(
                            `sample.${sampleId}.parameter.${parameterId}.method`
                            )}
                            /> */}
                            {/* Bachul */}
                      <select
                        className="w-full"
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.method`
                        )}
                      >
                        {/* <option className="w-full p-4 rounded bg-gray-100 shadow-none">
                          Pilih Method
                        </option> */}
                        {choiceParams
                          .find((param) => param.param === parameter.name)
                          ?.method.map((method) => (
                            <option key={method} value={method}>
                              {method}
                            </option>
                          ))}
                        {/* {parameter.method.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))} */}
                      </select>
                      <div className="text-xs text-red-600 pt-3 text-center">
                        {
                          errors.sample?.[sampleId]?.parameter?.[parameterId]
                            ?.method?.message
                        }
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                    <Input
                  type="text"
                  className="bg-gray-100"
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex justify-center bottom-0 mt-24 text-lg">
              <Button className="w-2/3 p-6 bg-light_brown hover:bg-dark_brown">
                Submit Survey
              </Button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. 
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </form>
  );
};

export default InputDokumenUser;