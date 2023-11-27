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
import { FC } from "react";
import { Sampling } from '@/lib/type';

interface TableRegulationProps {
  sample: string;
  regulation: number;
  setRegulation: React.Dispatch<React.SetStateAction<number>>;
}

const TableRegulation: React.FC<TableRegulationProps> = ({ sample, regulation, setRegulation }) => {
  const sampleData = Sampling.samples.find(s => s.name === sample);
  const regulations = sampleData ? sampleData.regulations : [];

  return (
    <div className="w-fit border-2 border-dark_green rounded-xl p-5  items-center justify-center">
      <p className="text-xs mb-3 opacity-70">Click on target regulation to see the detail of parameters</p>
      <Table className="w-full">
        <TableCaption>Lists regulation of sample {sample} </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-dark_green font-bold">Id</TableHead>
            <TableHead className="text-dark_green font-bold">Regulation Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {regulations.map((regulationData) => (
            <TableRow onClick={() => setRegulation(regulationData.id)} className="hover:bg-light_green hover:cursor-pointer" key={regulationData.id}>
              <TableCell className="font-medium rounded-l-lg">{regulationData.id}</TableCell>
              <TableCell className="rounded-r-lg">{regulationData.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        sample !== "" && (
          <div className="hover:bg-dark_green hover:text-white hover:cursor-pointer w-full rounded-lg p-2 mt-1 font-semibold flex justify-center bg-light_green"> + Add Regulation </div>
        )
      }
    </div>
  );
}

export default TableRegulation;