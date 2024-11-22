"use client";

import { TrashIcon } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [currenStatus, setCurrenStatus] = useState("ALL");

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={table.getColumn("FullName")?.getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("FullName")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("Estado") && (
          <Select
            value={currenStatus}
            onValueChange={(value) => {
              console.log("select", value);
              // console.log("transf => ", table);
              table.getColumn("Estado")?.setFilterValue(value);
              setCurrenStatus(value);
              if (value === "ALL") {
                table.getColumn("Estado")?.setFilterValue(undefined);
                setCurrenStatus("ALL");
                return;
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status - All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"ALL"}>TODOS</SelectItem>
                <SelectItem value={"ACTIVO"}>ACTIVO</SelectItem>
                <SelectItem value={"DESACTIVO"}>DESACTIVO</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setCurrenStatus(3);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reiniciar
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Eliminar ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
