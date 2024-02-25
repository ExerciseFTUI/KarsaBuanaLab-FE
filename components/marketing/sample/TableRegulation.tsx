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
import { BaseSample } from "@/lib/models/baseSample.model";
import { Input } from "@/components/ui/input";
import { MdDelete } from "react-icons/md";
import CancelPopup from "@/components/cancelPopup";

interface TableRegulationProps {
  sample: string;
  setRegulation: React.Dispatch<React.SetStateAction<number>>;
  baseSample: BaseSample[];
  setListRegulation: React.Dispatch<React.SetStateAction<never[]>>;
}

const TableRegulation: React.FC<TableRegulationProps> = ({ sample, setRegulation, setListRegulation, baseSample }) => {
  const [editingId, setEditingId] = useState(-1); // Track which item is being edited (-1 means no item is being edited)
  const [editedValue, setEditedValue] = useState(""); // Track edited value
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  // const [regulationId, setRegulationId] = useState(-1);
  const [regulationName, setRegulationName] = useState("");

  const sampleData = baseSample.find(s => s.sample_name.toLowerCase() === sample.replace(/ /g, "_"));
  const regulations = sampleData ? sampleData.regulation : [];

  const handleEditClick = (id: number, regulation_name: string) => {
    setEditingId(id);
    setEditedValue(regulation_name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  // TODO : INI BUAT EDIT NAME REGULATION DIT
  const handleEditSubmit = (id: number) => {
    // Log the edited value
    console.log("ID : ", id);
    console.log("New regulation name:", editedValue);

    // Make an API call to update regulation name with editedValue
    // After successful update, reset editing state
    setEditingId(-1);
    // Make API call to update the value on the server
  };

  // TODO : INI BUAT HAPUS REGULATION DIT
  const handleCancelledProject = async () => {
    console.log("yang bakal dihapus : ", regulationName);

    // CALL API
  }

  return (
    <>
    {showDeleteConfirmation && (
      <CancelPopup
        isCancelled={true}
        setIsCancelled={setShowDeleteConfirmation}
        message={`Are you sure you want to delete regulation of ${regulationName.replace(/_/g, " ")}?`} // Concatenate sampleName in the message
        handleCancelledProject={handleCancelledProject}
      />
    )}
    
    <div className="w-fit border-2 border-dark_green rounded-xl p-5 items-center justify-center">
      <p className="text-xs mb-3 opacity-70">Click on target regulation to see the detail of parameters</p>
      <div className="max-h-80 custom-scrollbar overflow-y-scroll">
      <Table className="w-full">
        <TableCaption>Lists regulation of sample {sample} </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-dark_green font-bold">Regulation Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regulations.map((regulationData, index) => (
            <TableRow
              onClick={() => {setRegulation(regulationData._id); }}
              className="hover:bg-light_green hover:cursor-pointer"
              key={regulationData._id}
            >
              <TableCell className="rounded-lg">
                <div className=" flex flex-row items-center">
                {editingId === regulationData._id ? (
                  <Input
                    type="text"
                    value={editedValue}
                    onChange={handleInputChange}
                    placeholder={regulationData.regulation_name}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEditSubmit(regulationData._id);
                      }
                    }}
                    className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700 font-medium focus:outline-none"
                  />
                ) : (
                  <Input
                  type="text"
                    value={regulationData.regulation_name}
                    onChange={handleInputChange}
                    onClick={() => handleEditClick(regulationData._id, regulationData.regulation_name)}
                    className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700  font-medium focus:outline-none"
                  />
                )}
                <MdDelete
                className="h-7 w-7 mx-2 text-red-500 hover:text-white hover:cursor-pointer  hover:bg-red-500 hover:rounded-md"
                onClick={() => {
                  setRegulationName(regulationData.regulation_name);
                  setShowDeleteConfirmation(true);}
                }
                />
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      </div>
      {sample !== "" && (
        <div className="hover:bg-dark_green hover:text-white hover:cursor-pointer w-full rounded-lg p-2 mt-1 font-semibold flex justify-center bg-light_green"> + Add Regulation </div>
      )}
    </div>
    </>
  );
}

export default TableRegulation;
