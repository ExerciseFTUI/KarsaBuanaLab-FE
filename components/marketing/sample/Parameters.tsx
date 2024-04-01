"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC, useState } from "react"
import { BaseSample, Regulation } from "@/lib/models/baseSample.model"
import CancelPopup from "@/components/cancelPopup"
import { Input } from "@/components/ui/input"
import { MdDelete } from "react-icons/md"
import CreateRegulationParam from "./CreateRegulationParam"
import { editBaseSample } from "@/lib/actions/marketing.actions"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface TableParameterProps {
  regulation: number
  sample: string
  baseSample: BaseSample[]
  bySample: boolean
}

const Parameter: React.FC<TableParameterProps> = ({
  regulation,
  sample,
  bySample,
  baseSample,
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [editingParam, setEditingParam] = useState("")
  const [editedValue, setEditedValue] = useState("") // Set initial value to an empty string
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const allReg = baseSample.find(
    (s) => s.sample_name.toLowerCase() === sample.replace(/ /g, "_")
  )
  // Check if allReg exists before accessing its properties
  const fixReg: Regulation | undefined = allReg
    ? allReg.regulation.find((reg) => reg._id === regulation)
    : undefined

  const sampleOrReg = bySample ? allReg : fixReg
  const titleName = bySample ? allReg?.sample_name : fixReg?.regulation_name
  const paramMap = bySample ? allReg?.param : fixReg?.default_param
  bySample
    ? console.log("paramMap Sample : ", paramMap)
    : console.log("paramMap Reg : ", paramMap)

  let currentSample: BaseSample | undefined = allReg
  let currentRegulation: Regulation | undefined = fixReg

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value)
  }

  const handleEditClick = (name: string) => {
    setEditingParam(name)
    setEditedValue(name)
  }

  // TODO : INI BUAT HAPUS PARAM DIT
  const handleCancelledProject = async () => {
    // console.log("yang bakal dihapus : ", editingParam);

    if (bySample && currentSample?.param) {
      let newParam = currentSample.param.filter(
        (param) => param.param !== editingParam
      )
      // console.log(newParam);

      const body = {
        param: newParam,
      }

      const result = await editBaseSample(body, currentSample._id)

      if (result) {
        router.refresh()
        toast({
          title: "Delete Param Success",
          description: "Param has been deleted",
        })
      } else {
        toast({
          title: "Delete Param Failed",
          variant: "destructive",
          description: "Param failed to delete",
        })
      }

      return
    } else {
      let newDefaultParam = currentRegulation?.default_param.filter(
        (param) => param !== editingParam
      )

      const newRegulation = currentSample?.regulation.map((regulation) => {
        //For update regulation just add check if the regulation id is the same with the edited id
        if (regulation._id === currentRegulation?._id) {
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

      if (currentSample?._id === undefined) {
        alert("Sample ID not found")
        return
      }

      const result = await editBaseSample(body, currentSample._id)

      if (result) {
        router.refresh()
        toast({
          title: "Delete Param by specific regulation Success",
          description: "Param has been deleted",
        })
      } else {
        toast({
          title: "Delete Param by specific regulation Failed",
          variant: "destructive",
          description: "Param failed to delete",
        })
      }
    }
  }

  // TODO : INI BUAT EDIT NAME PARAM DIT
  const handleEditSubmit = async (name: string) => {
    // Log the edited value
    console.log("name : ", name)
    console.log("New param name:", editedValue)

    setEditingParam("")

    //Update the param
    if (bySample && currentSample?.param) {
      console.log("Sample : ", currentSample)

      let newParam = currentSample.param.filter((param) => param.param !== name)
      newParam.push({
        param: editedValue,
        method: [],
        unit: "",
        operator: "",
        baku_mutu: 0,
        _id: "",
      })

      const body = {
        param: newParam,
      }

      const result = await editBaseSample(body, currentSample._id)

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

      return
      //Update the default param
    } else {
      console.log("Regulation : ", currentRegulation)

      let newDefaultParam = currentRegulation?.default_param.filter(
        (param) => param !== name
      )
      newDefaultParam?.push(editedValue)

      const newRegulation = currentSample?.regulation.map((regulation) => {
        //For update regulation just add check if the regulation id is the same with the edited id
        if (regulation._id === currentRegulation?._id) {
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

      if (currentSample?._id === undefined) {
        alert("Sample ID not found")
        return
      }

      const result = await editBaseSample(body, currentSample._id)

      if (result) {
        router.refresh()
        toast({
          title: "Delete Regulation Success",
          description: "Regulation has been deleted",
        })
      } else {
        toast({
          title: "Delete Regulation Failed",
          variant: "destructive",
          description: "Regulation failed to delete",
        })
      }
    }
  }

  return (
    <>
      {showDeleteConfirmation && (
        <CancelPopup
          isCancelled={true}
          setIsCancelled={setShowDeleteConfirmation}
          message={`Are you sure you want to delete parameter of ${editingParam.replace(
            /_/g,
            " "
          )}?`} // Concatenate sampleName in the message
          handleCancelledProject={handleCancelledProject}
        />
      )}

      {bySample ? (
        <CreateRegulationParam
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
          from="param"
          message={`Please give your new base sample name for ${titleName} `}
          baseSample={allReg}
        />
      ) : (
        <CreateRegulationParam
          isCreateOpen={isCreateOpen}
          setIsCreateOpen={setIsCreateOpen}
          from="defaultparam"
          message={`Please give your new base sample name for ${titleName}  `}
          baseSample={allReg}
          specificRegulation={fixReg}
        />
      )}

      <div className="w-fit border-2 border-dark_green rounded-xl p-5 items-center justify-center">
        <p className="text-xs mb-3 opacity-70">
          Lists parameters of {bySample ? "sample" : "regulation"} {titleName}{" "}
        </p>
        <div
          className={`${
            bySample ? " max-h-[42rem]" : "max-h-80"
          } custom-scrollbar overflow-y-scroll`}
        >
          <Table className=" w-full ">
            <TableHeader>
              <TableRow>
                <TableHead className="text-dark_green font-bold">
                  Parameter Name
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleOrReg &&
                paramMap?.map((param, index) => (
                  <TableRow
                    // onClick={() => {setRegulation(regulationData._id); }}
                    className="hover:bg-light_green hover:cursor-pointer"
                    key={typeof param === "object" ? param.param : param}
                  >
                    <TableCell className="rounded-lg">
                      <div className=" flex flex-row items-center">
                        {editingParam === param ? (
                          <Input
                            type="text"
                            value={editedValue} // Use value prop if the input field should be mutable
                            onChange={handleInputChange} // Add onChange handler to handle changes
                            placeholder={param}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleEditSubmit(param)
                              }
                            }}
                            className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700  font-medium focus:outline-none"
                          />
                        ) : (
                          <Input
                            type="text"
                            value={
                              typeof param === "object" ? param.param : param
                            } // Ensure that the value prop is always controlled by editedValue
                            onChange={handleInputChange} // Add onChange handler to handle changes
                            onClick={() =>
                              handleEditClick(
                                typeof param === "object" ? param.param : param
                              )
                            }
                            className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700  font-medium focus:outline-none"
                          />
                        )}
                        <MdDelete
                          className="h-7 w-7 mx-2 text-red-500 hover:text-white hover:cursor-pointer  hover:bg-red-500 hover:rounded-md"
                          onClick={() => {
                            setEditingParam(
                              typeof param === "object" ? param.param : param
                            )
                            setShowDeleteConfirmation(true)
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {/* Button to create new one param */}
        {titleName !== ("" || undefined) && (
          <div
            className="hover:bg-dark_green text-base  hover:text-white hover:cursor-pointer rounded-lg p-1 mt-1 font-semibold flex text-center justify-center bg-light_green"
            onClick={() => {
              setIsCreateOpen(true)
            }}
          >
            Add Parameter for
            <br /> {titleName.toLowerCase()}
            <br /> {bySample ? "base sample" : "regulation"}
          </div>
        )}
        {/* End Button to create new one param */}
      </div>
    </>
  )
}

export default Parameter
