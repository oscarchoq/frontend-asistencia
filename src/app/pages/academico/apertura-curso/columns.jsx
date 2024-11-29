import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { TbCalendarTime } from "react-icons/tb";
import { MdOutlinePersonSearch } from "react-icons/md";

export const columns = ({ setShowDialog, setData, setShowDocentes }) => [
  {
    accessorKey: "Codigo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Codigo" />
    ),
  },
  {
    accessorKey: "Asignatura",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asignatura" />
    ),
  },
  {
    accessorKey: "T/G",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="T/G" />
    ),
  },
  {
    accessorKey: "Matriculados",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Matriculados" />
    ),
  },
  {
    accessorKey: "Docente",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Docente" />
    ),
  },
  {
    id: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      // console.log("activo => ", row.original.Activo);
      return (
        <ActionsButtons
          apertura={row.original}
          setShowDialog={setShowDialog}
          setData={setData}
          setShowDocentes={setShowDocentes}
        />
      );
    },
  },
];

const ActionsButtons = ({
  apertura,
  setShowDialog,
  setData,
  setShowDocentes,
}) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <Button
        type="button"
        size="option"
        className="bg-sky-700 hover:bg-sky-900"
        onClick={() => {
          // console.log("click elegir docente");
          setShowDocentes(true);
          setData(apertura);
        }}
      >
        <MdOutlinePersonSearch />
      </Button>
      <Button
        type="button"
        size="option"
        className="bg-blue-700 hover:bg-blue-900"
        onClick={() => {
          console.log("click asistencia");
        }}
      >
        <TbCalendarTime />
      </Button>
      <Button
        type="button"
        size="option"
        className="bg-green-700 hover:bg-green-900"
        onClick={() => {
          // console.log("click editar", apertura);
          setShowDialog(true);
          setData(apertura);
        }}
      >
        <PiPencilSimpleLineBold />
      </Button>
    </div>
  );
};

// filtro por periodo electio / sede/ programada academico / plan curricular/ grado educativo
// codigo
// asignatura
// turno (T)/grupo (G)
// Horario
// Capacidad == input
// Docente == nombre
// acciones [seleccionar docente, editar]

// flujo seleccionar docnete : buscar docente en la lista (formato tabla) que muestra
//               N° doc registerDocente apellidos y nombre grado fecha registro acciones (seleccionar ico share)

// flujo actualizar apertura : formulario con... turno, grupo, horario, capacidad

// opciones adicionales como : matriculados, asistencia
