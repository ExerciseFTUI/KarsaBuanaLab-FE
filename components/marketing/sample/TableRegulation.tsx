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

interface TableRegulationProps {
  sample: string;
  setRegulation: React.Dispatch<React.SetStateAction<number>>;
  baseSample: BaseSample[];
}

const TableRegulation: React.FC<TableRegulationProps> = ({ sample, setRegulation, baseSample }) => {
  const [editingId, setEditingId] = useState(-1); // Track which item is being edited (-1 means no item is being edited)
  const [editedValue, setEditedValue] = useState(""); // Track edited value

  const sampleData = baseSample.find(s => s.sample_name.toLowerCase() === sample.replace(/ /g, "_"));
  const regulations = sampleData ? sampleData.regulation : [];

  const handleEditClick = (id: number, regulation_name: string) => {
    setEditingId(id);
    setEditedValue(regulation_name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  const handleEditSubmit = (id: number) => {
    // Log the edited value
    console.log("ID : ", id);
    console.log("New regulation name:", editedValue);

    // Make an API call to update regulation name with editedValue
    // After successful update, reset editing state
    setEditingId(-1);
    // Make API call to update the value on the server
  };

  return (
    <div className="w-fit border-2 border-dark_green rounded-xl p-5 items-center justify-center">
      <p className="text-xs mb-3 opacity-70">Click on target regulation to see the detail of parameters</p>
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
              onClick={() => setRegulation(regulationData._id)}
              className="hover:bg-light_green hover:cursor-pointer"
              key={regulationData._id}
            >
              <TableCell className="rounded-lg">
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
                    className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700 hover:text-white font-medium focus:outline-none"
                  />
                ) : (
                  <Input
                    type="text"
                    defaultValue={regulationData.regulation_name}
                    onClick={() => handleEditClick(regulationData._id, regulationData.regulation_name)}
                    className="border-b border-gray-300 placeholder:text-slate-700 text-slate-700 hover:text-white font-medium focus:outline-none"
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {sample !== "" && (
        <div className="hover:bg-dark_green hover:text-white hover:cursor-pointer w-full rounded-lg p-2 mt-1 font-semibold flex justify-center bg-light_green"> + Add Regulation </div>
      )}
    </div>
  );
}

export default TableRegulation;
