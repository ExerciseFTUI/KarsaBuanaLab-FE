"use client";

import {
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { userColumns } from "../InventoryColumn";
import { User } from "@/lib/models/user.model";
import InventoryAssignedTable from "./InventoryAssignedTable";
import InventoryUnAssignedTable from "./InventoryUnassignedTable";

interface InventoryPICProps {
  allUsers: User[];
}

const InventoryPIC: FC<InventoryPICProps> = ({ allUsers }) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // useEffect(() => {
  //   const initialState: any = {};

  //   allUsers.map((user) => {
  //     if (user._id !== "") {
  //       initialState[user._id] = true;
  //     }
  //   });

  //   setRowSelection(initialState);
  // }, []);

  const table = useReactTable({
    data: !!allUsers ? allUsers : [],
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getRowId: (allUsers) => allUsers._id,
  });

  return (
    <div className="w-full">
      {/* <h1 className="text-2xl font-bold text-dark_brown capitalize  text-center">
        PIC
      </h1> */}
      <div className="flex flex-col  w-full">
        <div className="w-full xl:w-3/4">
          <InventoryUnAssignedTable table={table} />
        </div>
        <div className="w-full xl:w-3/4">
          <InventoryAssignedTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default InventoryPIC;
