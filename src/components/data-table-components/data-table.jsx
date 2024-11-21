import React, { useState } from "react";
import {
  useTable,
  usePagination,
  useFilters,
  useSortBy,
  useRowSelect,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

export function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, selectedRowIds },
    setPageSize,
    setPageIndex,
    canPreviousPage,
    canNextPage,
    getToggleAllRowsSelectedProps,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  return (
    <div className="space-y-4">
      <DataTableToolbar table={{ setPageSize, setPageIndex }} />
      <div className="overflow-y-auto rounded-md border">
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <TableHead
                    className="px-4 py-2"
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {rows.length ? (
              rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell
                        className="px-4 py-2"
                        key={cell.column.id}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPageIndex={setPageIndex}
        rows={rows}
        selectedRowIds={selectedRowIds}
      />
    </div>
  );
}
