import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { editBaseSample } from "@/lib/actions/marketing.actions"
import { BaseSample, Regulation } from "@/lib/models/baseSample.model"
import { useRouter } from "next/navigation"
import React, { useState, useEffect } from "react"

interface createProps {
  message: string
  isCreateOpen: boolean
  setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>
  from: string
  baseSample: BaseSample | undefined
  specificRegulation?: Regulation | undefined
}

const CreateRegulationParam: React.FC<createProps> = ({
  message,
  isCreateOpen,
  from,
  setIsCreateOpen,
  baseSample,
  specificRegulation,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [editedValue, setEditedValue] = useState("")
  const regulations = baseSample?.regulation || []

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value)
  }

  const handleCancel = () => {
    setIsCreateOpen(false)
  }

  // TODO : LAST DIT INI BUAT CREATE NEW REGULATION, PARAM DAN DEFAULT PARAM
  const handleConfirm = async () => {
    try {
      if (from === "regulation") {
        handleAddRegulation() //DONE
      } else if (from === "param") {
        handleAddParam() //
      } else if (from === "defaultparam") {
        handleAddDefaultParam() //
      }

      setIsCreateOpen(false) // Close the modal after successful confirmation
    } catch (error) {
      console.error("Error creating new regulation:", error)
      // Handle error, display error message, etc.
    }
  }

  // LIKE THIS ONE
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".modal-content")) {
        setIsCreateOpen(false)
      }
    }

    if (isCreateOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isCreateOpen, setIsCreateOpen])

  const handleAddRegulation = async () => {
    //Map all the regulation in specific sample
    const newRegulation = regulations.map((regulation) => {
      return {
        regulation_name: regulation.regulation_name,
        default_param: regulation.default_param,
      }
    })

    //Add the new regulation
    newRegulation.push({
      regulation_name: editedValue,
      default_param: [],
    })

    const body = {
      regulation: newRegulation,
    }

    if (baseSample?._id === undefined) {
      alert("Sample ID not found")
      return
    }

    const result = await editBaseSample(body, baseSample._id)

    if (result) {
      router.refresh()
      toast({
        title: "Add Regulation Success",
        description: "Regulation has been added",
      })
    } else {
      toast({
        title: "Add Regulation Failed",
        variant: "destructive",
        description: "Regulation failed to add",
      })
    }
  }

  const handleAddParam = async () => {
    const newParam = baseSample?.param || []
    newParam.push(editedValue as any)

    const body = {
      param: newParam,
    }

    if (baseSample?._id === undefined) {
      alert("Sample ID not found")
      return
    }

    const result = await editBaseSample(body, baseSample?._id)

    if (result) {
      router.refresh()
      toast({
        title: "Add Param Success",
        description: "Param has been added",
      })
    } else {
      toast({
        title: "Add Param Failed",
        variant: "destructive",
        description: "Param failed to add",
      })
    }
  }

  const handleAddDefaultParam = async () => {
    if (!specificRegulation) {
      alert("Regulation not found")
      return
    }

    //Add the new Default Param
    const newDefaultParam = specificRegulation.default_param
    newDefaultParam.push(editedValue)

    //Create newRegulation
    const newRegulation = regulations.map((regulation) => {
      //For update regulation just add check if the regulation id is the same with the edited id
      if (regulation._id === specificRegulation._id) {
        return {
          regulation_name: regulation.regulation_name,
          default_param: newDefaultParam,
        }
      }
      return {
        regulation_name: regulation.regulation_name,
        default_param: regulation.default_param,
      }
    })

    const body = {
      regulation: newRegulation,
    }

    if (baseSample?._id === undefined) {
      alert("Sample ID not found")
      return
    }

    const result = await editBaseSample(body, baseSample._id)

    if (result) {
      router.refresh()
      toast({
        title: "Add Default Param Success",
        description: "Default Param has been added",
      })
    } else {
      toast({
        title: "Add Default Param Failed",
        variant: "destructive",
        description: "Default Param failed to add",
      })
    }
  }

  return (
    <>
      {isCreateOpen && (
        <div className="modal-overlay fixed top-0 left-0 w-full h-full  flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="modal-content bg-white rounded-lg border-2 h-60 p-8 relative">
            <p className="text-center text-xl font-bold mb-4 max-w-xl">
              {message}
            </p>
            <Input
              type="text"
              onChange={handleInputChange}
              placeholder={`New ${
                from === "regulation" ? "regulation" : "parameter"
              } name`}
              className="border-b border-gray-300 placeholder:text-slate-500 text-slate-700 mt-12 font-medium focus:outline-none"
            />
            <div className="flex justify-center absolute my-8 left-0 right-0 space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-moss_green text-white px-4 py-2 rounded-md hover:bg-dark_green"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateRegulationParam
