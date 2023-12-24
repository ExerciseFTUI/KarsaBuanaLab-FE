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
import { Sampling } from "@/lib/type";

interface TableParameterProps {
  regulation: number;
}

const Parameter: React.FC<TableParameterProps> = ({ regulation }) => {
  const sampleData = Sampling.samples.find((sample) => sample.regulations.some((reg) => reg.id === regulation));

  return (
    <div className="w-fit border-2 border-dark_green rounded-xl p-5 items-center justify-center">
      <Table className="">
        <TableCaption>Lists parameters of regulation {regulation} </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-dark_green font-bold">Id</TableHead>
            <TableHead className="text-dark_green font-bold">Parameter Name</TableHead>
            <TableHead className="text-dark_green font-bold">Limit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData &&
            sampleData.regulations
              .find((reg) => reg.id === regulation)
              ?.parameters.map((param) => (
                <TableRow className="hover:bg-light_green hover:cursor-pointer" key={param.id}>
                  <TableCell className="font-medium rounded-l-lg">{param.id}</TableCell>
                  <TableCell>{param.name}</TableCell>
                  <TableCell className="rounded-r-lg">{param.limit}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Parameter;
