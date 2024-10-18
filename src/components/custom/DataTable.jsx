import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
} from "react-icons/bi";

const DataTable = ({
  hover = true,
  data,
  columns,
  pageSizeOptions = [10, 20, 30, 40, 50],
}) => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: pageSizeOptions[0],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div
        className="overflow-auto"
        style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.17)" }}
      >
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="divide-x divide-gray-200 text-center"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="tracking-wide p-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center h-48 font-bold text-gray-500"
                >
                  Sin resultados disponibles
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={`divide-x divide-gray-200 ${
                  hover ? "hover:bg-gray-100" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="whitespace-nowrap p-2 text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length !== 0 && (
        <div
          className="bg-white rounded-md mt-5 p-1 px-2 flex justify-between items-center gap-y-3 overflow-auto whitespace-nowrap"
          style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.17)" }}
        >
          <div>
            <label htmlFor="">Mostrar</label>
            <select
              className="bg-white border border-gray-300 rounded-md p-1 px-2 mx-2"
              // value={table.getState().pagination.pageSize}
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {pageSizeOptions.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <Pagination table={table} />
        </div>
      )}
    </>
  );
};

const Pagination = ({ table }) => {
  return (
    <div className="flex items-center font-semibold gap-x-2">
      <div className="border-r border-gray-300 pr-2 flex">
        <button
          className="text-sidebar-900 disabled:text-sidebar-500"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <BiChevronsLeft size={25} />
        </button>
      </div>
      <div className="border-r border-gray-300 pr-2 flex">
        <button
          className="text-sidebar-900 disabled:text-sidebar-500"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <BiChevronLeft size={25} />
        </button>
      </div>
      <div className="border-r border-gray-300 pr-2 flex">
        <span>
          {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
      </div>
      <div className="border-r border-gray-300 pr-2 flex">
        <button
          className="text-sidebar-900 disabled:text-sidebar-500"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <BiChevronRight size={25} />
        </button>
      </div>
      <div className="flex">
        <button
          className="text-sidebar-900 disabled:text-sidebar-500"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <BiChevronsRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default DataTable;
