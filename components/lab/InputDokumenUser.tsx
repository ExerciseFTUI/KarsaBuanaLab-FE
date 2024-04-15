"use client";
import { FC } from "react";
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
import { InputDocumentType, sampleAnswer } from "@/lib/type";
import {
  useLabForm,
  labInputDocumentValidation,
} from "@/lib/validations/LabValidation";
import { z } from "zod";
import { submitLab } from "@/lib/actions/lab.action";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface inputDokumenUserProps {
  sample: [InputDocumentType];
  userId: string;
  projectId: string;
}

const InputDokumenUser: FC<inputDokumenUserProps> = ({
  sample,
  userId,
  projectId,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLabForm();

  function mergeData(
    data: [InputDocumentType],
    unitMethodResult: {
      sample: {
        parameter: { unit: string; method: string; result: number }[];
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
    const answer = mergeData(sample, data);
    const response = await submitLab(projectId, answer);
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
                      <select
                        className="w-full"
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.unit`
                        )}
                      >
                        <option className="w-full p-4 rounded bg-gray-100 shadow-none">
                          Pilih Unit
                        </option>
                        {parameter.unit.map((unit) => (
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
                      <select
                        className="w-full"
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.method`
                        )}
                      >
                        <option className="w-full p-4 rounded bg-gray-100 shadow-none">
                          Pilih Method
                        </option>
                        {parameter.method.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
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
                        {...register(
                          `sample.${sampleId}.parameter.${parameterId}.result`
                        )}
                      />
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
