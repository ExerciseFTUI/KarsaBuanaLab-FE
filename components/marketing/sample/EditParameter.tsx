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
import { Sampling } from "@/lib/type";
import { Input } from "@/components/ui/input"

interface TableParameterProps {
  regulation: number;
}

const EditParameter: React.FC<TableParameterProps> = ({ regulation }) => {
  const sampleData = Sampling.samples.find((sample) => sample.regulations.some((reg) => reg.id === regulation));
  const [addParam, setAddParam] = useState(false)

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
                <TableRow className=" " key={param.id}>
                  <TableCell className="font-medium rounded-l-lg">{param.id}</TableCell>
                  <TableCell>
                    <Input placeholder={param.name}/>
                  </TableCell>
                  <TableCell className=" w-fit rounded-r-lg">
                    <Input className=" w-20 " placeholder={param.limit.toString()}/>
                  </TableCell>
                </TableRow>
              ))}
                {/* Add Param Input */}
                { addParam && (
                <TableRow>
                    <TableCell>
                        <Input placeholder="Id"></Input>
                    </TableCell>
                    <TableCell>
                        <Input placeholder="Parameter Name"></Input>
                    </TableCell>
                    <TableCell className=" w-20">
                        <Input placeholder="Limit"></Input>
                    </TableCell>
                </TableRow>
                )}
                {/* End of Add Param Input */}
        </TableBody>
      </Table>
      {
        regulation !== 0 && (
          <div onClick={() => {setAddParam(true)}} className="hover:bg-dark_green hover:text-white hover:cursor-pointer w-full rounded-lg p-2 mt-1 font-semibold flex justify-center bg-light_green"> + Add Regulation </div>
        )
      }
    </div>
  );
};

export default EditParameter;
