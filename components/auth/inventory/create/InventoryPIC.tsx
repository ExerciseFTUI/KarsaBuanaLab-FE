"use client";

import {
  ColumnFiltersState,
  RowSelectionState,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { userColumns } from "../InventoryColumn";
import { User } from "@/lib/models/user.model";
import InventoryAssignedTable from "./InventoryAssignedTable";
import InventoryUnAssignedTable from "./InventoryUnassignedTable";
import { InventoryUser } from "../InventoryType";

interface InventoryPICProps {
  allUsers: InventoryUser[];
  assignedUsers: string[];
  setAssignedUsers: Dispatch<SetStateAction<string[]>>;
}

const InventoryPIC: FC<InventoryPICProps> = ({
  allUsers,
  assignedUsers,
  setAssignedUsers,
}) => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    const initialState: any = {};

    allUsers.map((user) => {
      if (assignedUsers.includes(user._id)) {
        initialState[user._id] = true;
      }
    });

    setRowSelection(initialState);
  }, []);

  const table = useReactTable({
    data: !!allUsers ? allUsers : [],
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getRowId: (allUsers) => allUsers._id,
  });

  useEffect(() => {
    const assigned = table
      .getFilteredSelectedRowModel()
      .rows.map((r) => allUsers[r.index]._id);

    setAssignedUsers(assigned);
  }, [table.getFilteredSelectedRowModel().rows.length]);

  return (
    <div className="w-full">
      {/* <h1 className="text-2xl font-bold text-dark_brown capitalize  text-center">
        PIC
      </h1> */}
      <div className="flex flex-col  w-full">
        <div className="w-full xl:w-4/4">
          <InventoryUnAssignedTable table={table} />
        </div>
        <div className="w-full xl:w-4/4">
          <InventoryAssignedTable table={table} />
        </div>
      </div>
    </div>
  );
};

export default InventoryPIC;
