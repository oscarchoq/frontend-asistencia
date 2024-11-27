import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";

export const columns = ({ setData }) => [
  {
    accessorKey: "RefAcademica",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Codigo" />
    ),
  },
  {
    accessorKey: "Denominacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asignatura" />
    ),
  },
  {
    id: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      return <ActionsButtons curso={row.original} setData={setData} />;
    },
  },
];

// -- TOTAL POR SEMESTRE
// SELECT CursoID, SemestreID, Denominacion, RefAcademica FROM curso
// WHERE SemestreID = 8
// ;

const ActionsButtons = ({ curso, setData }) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <Button
        type="button"
        size="option"
        className="bg-blue-700"
        onClick={() => {
          console.log(curso);
          setData(curso);
        }}
      >
        <FaExternalLinkAlt />
      </Button>
    </div>
  );
};
