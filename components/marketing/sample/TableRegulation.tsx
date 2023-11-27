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
import { FC } from "react";

const datas = [
  {
    Id: 1,
    Name: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    Id: 2,
    Name: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  },
  {
    Id: 3,
    Name: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores, voluptatem." ,
  },
  {
    Id: 4,
    Name: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    Id: 5,
    Name: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
  },
  {
    Id: 6,
    Name: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
  },
  {
    Id: 7,
    Name: "Unpaid",
  },
]

interface tableRegulationProps {
    value : string;
    regulation: number;
    setRegulation: React.Dispatch<React.SetStateAction<number>>;
}

const TableRegulation : React.FC<tableRegulationProps> = ({value, regulation, setRegulation}) => {
  return (
    <div className="w-fit border-2 border-dark_green rounded-xl p-5  items-center justify-center">
        <p className=" text-xs mb-3 opacity-70 ">Click on target regulation to see the detail of parameters</p>
        <Table className=" w-full">
            <TableCaption>Lists regulation of sample {value} </TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px] text-dark_green font-bold">Id</TableHead>
                <TableHead className="text-dark_green font-bold">Regulation Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {value !== "" && (
                datas.map((data) => (
                <TableRow onClick={() => setRegulation(data.Id)} className="hover:bg-light_green hover:cursor-pointer" key={data.Id}>
                    <TableCell className="font-medium rounded-l-lg">{data.Id}</TableCell>
                    <TableCell className="rounded-r-lg">{data.Name}</TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
            <div className="hover:bg-dark_green hover:text-white hover:cursor-pointer w-full rounded-lg p-3 font-semibold flex justify-center bg-light_green"> + Add Regulation </div>
    </div>
  )
}

export default TableRegulation;