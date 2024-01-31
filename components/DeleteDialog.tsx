"use client";
import { FC, SetStateAction } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";

interface DeleteDialogProps {
  description?: string;
  deleteFunction: () => void;
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  deleteFunction,
  description,
  isOpen,
  setIsOpen,
}) => {
  return (
    <AlertDialog open={isOpen}>
      {/* <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <TrashIcon />
        </Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          {description ||
            "This action cannot be undone. This will be permanently delete your sample and parameter inside it"}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteFunction();
              setIsOpen(false);
            }}
          >
            Proceed
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
