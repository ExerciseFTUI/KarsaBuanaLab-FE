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
    Name: "PH",
    Limit: 12
},
  {
    Id: 2,
    Name: "Kelembapan",
    Limit: 12
},
  {
    Id: 3,
    Name: "Lux",
    Limit: 12
},
  {
    Id: 4,
    Name: "Panas",
    Limit: 12
},
]

interface tableParameterProps {
    regulation : number;
}

const TableRegulation : React.FC<tableParameterProps> = ({regulation}) => {
  return (
    <div className="w-fit border-2 border-dark_green rounded-xl p-5  items-center justify-center">
        <Table className="">
            <TableCaption>Lists paramter of regulation {regulation} </TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px] text-dark_green font-bold">Id</TableHead>
                <TableHead className="text-dark_green font-bold">Parameter Name</TableHead>
                <TableHead className="text-dark_green font-bold">Limit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {regulation !== 0 && (
                datas.map((data) => (
                <TableRow className="hover:bg-light_green hover:cursor-pointer" key={data.Id}>
                    <TableCell className="font-medium rounded-l-lg">{data.Id}</TableCell>
                    <TableCell className="">{data.Name}</TableCell>
                    <TableCell className="rounded-r-lg">{data.Limit}</TableCell>
                </TableRow>
                ))
            )}
            </TableBody>
        </Table>
    </div>
  )
}

export default TableRegulation;