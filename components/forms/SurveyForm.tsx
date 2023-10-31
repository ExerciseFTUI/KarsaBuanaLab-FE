import React, { FC } from "react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SurveyFormProps {
    isPaid: boolean;
}

const SurveyForm: FC<SurveyFormProps> = ({ isPaid }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={!isPaid} className="flex bg-black_brown justify-center rounded-xl text-xl text-ghost_white py-2 w-full">
            Laporan Hasil Penelitian
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl sm:max-h-[85vh] mx-3">
        <DialogHeader>
          <DialogTitle className="text-3xl">Please Fill the Survey First</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full h-1/2 py-4 -mx-3">
          <div className="px-3">
            <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="name" className="text-right">
              Question 1
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div/>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="username" className="text-right">
              Question 2
            </Label>
            <Input id="username" value="" className="" />
          </div>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="name" className="text-right">
              Question 3
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="username" className="text-right">
              Question 4
            </Label>
            <Input id="username" value="" className="" />
          </div>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="name" className="text-right">
              Question 5
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
           <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="name" className="text-right">
              Question 6
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="name" className="text-right">
              Question 5
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="name" className="text-right">
              Question 5
            </Label>
            <Input id="name" value="" className="col-span-3" />
          </div>
          <div className="flex flex-col items-start gap-4 my-4">
            <Label htmlFor="username" className="text-right">
              Question 10
            </Label>
            <Input id="username" value="" className="" />
          </div>
          </div>
        </ScrollArea>
        
        <DialogFooter >
          <Button type="submit" className="absolute bottom-12 w-1/2 text-lg p-6">Submit Survey</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default SurveyForm;