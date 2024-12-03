import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export const columns = ({ setShowDialog, setData }) => [
  {
    accessorKey: "TipoClase",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    accessorKey: "DiaSemana",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dia" />
    ),
  },
  {
    accessorKey: "FechaSesion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
  },
  {
    accessorKey: "HoraInicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora Inicio" />
    ),
  },
  {
    accessorKey: "HoraFin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora Fin" />
    ),
  },
  {
    accessorKey: "estudiantes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N° EST" />
    ),
  },
  {
    accessorKey: "asistidos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ASIT" />
    ),
  },
  {
    accessorKey: "tardanzas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TARD" />
    ),
  },
  {
    accessorKey: "faltas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FALT" />
    ),
  },
  {
    accessorKey: "justificados",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUST" />
    ),
  },
  {
    id: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      // console.log("activo => ", row.original.Activo);
      return (
        <ActionsButtons
          asistencia={row.original}
          setShowDialog={setShowDialog}
          setData={setData}
        />
      );
    },
  },
];

const ActionsButtons = ({ asistencia, setShowDialog, setData }) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <Button
        type="button"
        size="option"
        className="bg-green-700 hover:bg-green-900"
        onClick={() => {
          // console.log(asistencia);
          setShowDialog(true);
          setData(asistencia);
        }}
      >
        <PiPencilSimpleLineBold />
      </Button>
      <Link
        to={`/clase/${asistencia.ClaseID}/asistencia/${asistencia.SesionID}`}
      >
        <Button
          type="button"
          size="option"
          className="bg-blue-700 hover:bg-blue-900"
          onClick={() => {
            console.log("asistencia manual");
            console.log(asistencia);
          }}
        >
          <PiPencilSimpleLineBold />
        </Button>
      </Link>
    </div>
  );
};
