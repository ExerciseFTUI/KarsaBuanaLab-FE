import React, { FC } from "react";
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
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { createProjectValidation } from "@/lib/validations/CreateProjectValidation";
import { z } from "zod";

interface Props {
  updateRevision?(
    values: z.infer<typeof createProjectValidation>
  ): Promise<void>;
}

const VerifRevision: FC<Props> = ({ updateRevision }) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className=" flex">
            <FaArrowUp className=" hover:cursor-pointer text-2xl mx-2 self-center bg-light_green p-1 rounded-lg " />
            <FaArrowDown className="text-2xl mr-2 self-center bg-light_green p-1 rounded-lg" />
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>

            <AlertDialogDescription>
              Please kindly check the deadline and the users again.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {}}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default VerifRevision;
