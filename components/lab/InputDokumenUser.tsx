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
  ldData: [LD];
}

const InputDokumenUser: FC<inputDokumenUserProps> = ({
  sample,
  isAdmin,
  sampleId,
  choiceParams,
  ldData,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [invalidFields, setInvalidFields] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues,
    watch,
  } = useLabForm({
    defaultValues: {
      sample: {
        param: sample.parameters.map((param) => ({
          unit: param.unit || "",
          method: param.method || [],
        })),
      },
    },
  });

  const currentValues = watch();

  useEffect(() => {
    console.log("Current form values:", currentValues);
  }, [currentValues]);

  useEffect(() => {
    console.log("Initial sample:", sample);
    console.log("Initial choiceParams:", choiceParams);
  }, [sample, choiceParams]);

  const onSubmit = async (data: any) => {
    try {
      console.log("Form submitted with data:", data);

      // Modified to only check for empty unit fields
      const emptyFieldIndices = data.sample.param.reduce(
        (acc: number[], param: any, index: number) => {
          if (!param.unit) {
            // Only check unit
            acc.push(index);
          }
          return acc;
        },
        []
      );

      if (emptyFieldIndices.length > 0) {
        setInvalidFields(emptyFieldIndices);
        toast({
          title: "Validation Error",
          description: "Please select a unit for all parameters",
        });
        return;
      }

      // Now check for method separately if needed
      const emptyMethods = data.sample.param.some(
        (param: any) => !param.method || param.method.length === 0
      );

      if (emptyMethods) {
        toast({
          title: "Validation Error",
          description: "Please select at least one method for all parameters",
        });
        return;
      }

      setInvalidFields([]); // Clear invalid fields if validation passes
      setFormData(data);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was an error submitting the form",
      });
    }
  };

  const handleConfirmSubmit = async () => {
    if (!formData) {
      console.error("No form data available");
      return;
    }

    try {
      console.log("Preparing to submit with formData:", formData);

      const answer: sampleAnswer = {
        sample_name: sample.sampleName,
        param: sample.parameters.map((param, index) => ({
          param: param.name,
          unit: formData.sample.param[index].unit,
          method: formData.sample.param[index].method,
        })),
      };

      console.log("Submitting answer:", answer);

      const response = await submitLabRev(sampleId, answer);
      console.log("Submit response:", response);

      if (response) {
        toast({
          title: "Success",
          description: "Thank you for submitting!",
        });
        router.push("/lab/dashboard");
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
      });
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
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
                      required: "Unit is required",
                    })}
                    defaultValue={parameter.unit || ""}
                    className={`w-full ${
                      invalidFields.includes(parameterId)
                        ? "border-2 border-red-500 focus:ring-red-500 focus:border-red-500"
                        : ""
                    }`}
                    disabled={isAdmin ? false : true}
                  >
                    <option value="">Select Unit</option>
                    {choiceParams
                      .find((param) => param.param === parameter.name)
                      ?.unit.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                  </select>
                  {errors.sample?.param?.[parameterId]?.unit && (
                    <div className="text-xs text-red-600 pt-3 text-center">
                      {errors.sample.param[parameterId].unit.message}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    {choiceParams
                      .find((param) => param.param === parameter.name)
                      ?.method.map((method) => (
                        <label key={method} className="block">
                          <input
                            type="checkbox"
                            value={method}
                            disabled={isAdmin ? false : true}
                            {...register(`sample.param.${parameterId}.method`)}
                            defaultChecked={parameter.method?.includes(method)}
                            className="mr-2"
                          />
                          {method}
                        </label>
                      ))}
                  </div>
                  {errors.sample?.param?.[parameterId]?.method && (
                    <div className="text-xs text-red-600 pt-3 text-center">
                      {errors.sample.param[parameterId].method.message}
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-center bottom-0 mt-24 text-lg">
          <Button
            className="w-2/3 p-6 bg-light_brown hover:bg-dark_brown mb-16"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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
