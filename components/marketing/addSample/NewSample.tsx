import React, { useState } from "react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export const NewSample = ({
  setNewSample,
}: {
  setNewSample: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { toast } = useToast()

  const [sampleName, setSampleName] = useState("")

  const onSubmit = () => {
    // console.log("Sample new name: ", sampleName);

    // Check if the sample name already avail or not

    // Toast to notify already avail

    // Call API

    // Check response, if false give toast

    //Display Toast
    toast({
      title: "Good Job!",
      description: "Successfully adding new base sample",
    })

    setNewSample(false)
  }

  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-sm z-50">
      <div className="modal-content bg-white rounded-lg border-2 p-8">
        <p className="text-center text-xl font-bold mb-4">
          Input New Name Sample Here :
        </p>
        <Input
          className=""
          placeholder=""
          id="sampleName"
          name="sampleName"
          value={sampleName}
          onChange={(e) => setSampleName(e.target.value)}
        />
        <div className="flex justify-center space-x-4 mt-10">
          <button
            onClick={() => {
              setNewSample(false)
            }}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSubmit()
            }}
            className=" bg-dark_green hover:bg-moss_green text-white px-4 py-2 rounded-md "
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
