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
} from "@/components/ui/table";
import { FC, useState } from "react";
import { BaseSample, Regulation } from "@/lib/models/baseSample.model";
import CancelPopup from "@/components/cancelPopup";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";

interface TableParameterProps {
  regulation: number;
  sample: string;
  baseSample: BaseSample[];
}

const Parameter: React.FC<TableParameterProps> = ({ regulation, sample, baseSample }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editingParam, setEditingParam] = useState("");
  const [editedValue, setEditedValue] = useState(""); // Set initial value to an empty string
  const allReg = baseSample.find(s => s.sample_name.toLowerCase() === sample.replace(/ /g, "_"));
  // Check if allReg exists before accessing its properties
  const fixReg: Regulation | undefined = allReg ? allReg.regulation.find(reg => reg._id === regulation) : undefined;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleEditClick = (name: string) => {
    setEditingParam(name);
    setEditedValue(name);
  };

  // TODO : INI BUAT HAPUS PARAM DIT
  const handleCancelledProject = async () => {
    console.log("yang bakal dihapus : ", fixReg?.regulation_name);

    // CALL API
  }

  // TODO : INI BUAT EDIT NAME PARAM DIT
  const handleEditSubmit = (name: string) => {
    // Log the edited value
    console.log("name : ", name);
    console.log("New param name:", editedValue);

    // Make an API call to update regulation name with editedValue
    // After successful update, reset editing state
    setEditingParam("");
    // Make API call to update the value on the server
  };

  return (
    <>
    {showDeleteConfirmation && (
      <CancelPopup
        isCancelled={true}
        setIsCancelled={setShowDeleteConfirmation}
        message={`Are you sure you want to delete parameter of ${editingParam.replace(/_/g, " ")}?`} // Concatenate sampleName in the message
        handleCancelledProject={handleCancelledProject}
      />
    )}

    <div className="w-fit border-2 border-dark_green rounded-xl p-5 items-center justify-center">
      <p className="text-xs mb-3 opacity-70">Lists parameters of regulation {fixReg?.regulation_name} </p>
        <Table className=" w-full">
          {/* <TableCaption></TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-dark_green font-bold">Parameter Name</TableHead>
            </TableRow>
          </TableHeader>
          {/* <div className="max-h-80 custom-scrollbar overflow-y-scroll"> */}
          <TableBody className="max-h-80 custom-scrollbar overflow-y-scroll">
            {fixReg && fixReg.default_param.map((param, index) => (
              <TableRow
                // onClick={() => {setRegulation(regulationData._id); }}
                className="hover:bg-light_green hover:cursor-pointer"
                key={param}
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
                        if (e.key === 'Enter') {
                          handleEditSubmit(param);
                        }
                      }}
                      className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700  font-medium focus:outline-none"
                    />
                  ) : (
                    <Input
                    type="text"
                    value={param} // Ensure that the value prop is always controlled by editedValue
                    onChange={handleInputChange} // Add onChange handler to handle changes
                      onClick={() => handleEditClick(param)}
                      className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700  font-medium focus:outline-none"
                    />
                  )}
                  <MdDelete
                  className="h-7 w-7 mx-2 text-red-500 hover:text-white hover:cursor-pointer  hover:bg-red-500 hover:rounded-md"
                  onClick={() => {
                    setEditingParam(param);
                    setShowDeleteConfirmation(true);
                  }
                  }
                  />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        {/* </div> */}
        {fixReg?.regulation_name !== undefined && (
          <TableFooter className=" bg-transparent">
            <TableRow>
              <TableCell>
                <div className="hover:bg-dark_green text-base  hover:text-white hover:cursor-pointer rounded-lg p-1 mt-1 font-normal flex text-center justify-center bg-light_green"> 
                Add Parameter for <br/> {fixReg?.regulation_name.toLowerCase()} 
                <br /> regulation</div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
    </>
  );
};

export default Parameter;
