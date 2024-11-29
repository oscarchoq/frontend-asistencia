import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { MdControlPoint } from "react-icons/md";

export const columns = ({ setData }) => [
  {
    accessorKey: "DocenteID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N°" />
    ),
  },
  {
    accessorKey: "NumeroDocumento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Doc. Registro" />
    ),
  },
  {
    accessorKey: "FullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellidos y Nombres" />
    ),
  },
  {
    id: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      return <ActionsButtons docente={row.original} setData={setData} />;
    },
  },
];

const ActionsButtons = ({ docente, setData }) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <Button
        type="button"
        size="option"
        className="bg-sky-700"
        onClick={() => {
          // console.log("desde columns => ", docente);
          setData(docente);
        }}
      >
        <MdControlPoint />
      </Button>
    </div>
  );
};
