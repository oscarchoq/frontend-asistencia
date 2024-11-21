"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Status } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [currenStatus, setCurrenStatus] = useState("-1");

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filtrar por nombre..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) => {
            table.getColumn("email")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <Select
            value={currenStatus}
            onValueChange={(value) => {
              if (value === "-1") {
                table.getColumn("status")?.setFilterValue(undefined);
                setCurrenStatus("-1");
                return;
              }
              setCurrenStatus(value);
              table.getColumn("status")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status - All" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="-1">TODOS</SelectItem>
                <SelectItem value="1">ACTIVO</SelectItem>
                <SelectItem value="0">DESACTIVO</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {/* <Select
          value={currenStatus}
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("status")?.setFilterValue(undefined);
              setCurrenStatus("all");
              return;
            }
            setCurrenStatus(value);
            table.getColumn("status")?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status - All" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={Status}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setCurrenStatus("-1");
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
