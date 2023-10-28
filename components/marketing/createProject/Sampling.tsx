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

interface SamplingProps {}

const parameters = [
  {
    name: "Parameter 1",
  },
  {
    name: "Parameter 2",
  },
  {
    name: "Parameter 3",
  },
  {
    name: "Parameter 4",
  },
];

const Sampling: FC<SamplingProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, startTranstition] = useTransition();

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            className={cn(
              "flex w-full justify-between p-6 bg-moss_green hover:bg-dark_green",
              isOpen && "rounded-b-none"
            )}
          >
            <span className="text-white font-bold">Sample 1</span>
            {!isOpen && <CaretDownIcon className="h-6 w-6" />}
            {isOpen && <CaretUpIcon className="h-6 w-6" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg ">
          {parameters.length === 0 && (
            <Button
              variant={"ghost"}
              className="flex items-center justify-center rounded-none gap-1 p-8 py-12"
            >
              <p>There are no parameter yet:</p>
              <span className={cn("text-sm bg-clip-text text-transparent")}>
                Create one
              </span>
            </Button>
          )}
          {parameters.length > 0 && (
            <>
              <ul className="p-4 grid grid-cols-2 gap-2 ">
                {parameters.map((parameter) => (
                  <li className="text-xs">{parameter.name}</li>
                ))}
              </ul>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex items-center justify-between">
            <p>Total 4 Parameters</p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  onClick={() => alert("Adding new parameter")}
                  size={"icon"}
                  variant={"ghost"}
                >
                  <Pencil2Icon />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                      <TrashIcon />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will be permanently
                      delete your collection and parameter inside it
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          //   startTranstition(removeCollection);
                          alert("Deleting Sample");
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
