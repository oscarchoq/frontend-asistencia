import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PiPencilSimpleLineBold } from "react-icons/pi";

export const columns = ({ handleCheckboxChange }) => [
  {
    accessorKey: "Codigo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
  },
  {
    accessorKey: "FullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Apellidos y Nombres" />
    ),
  },
  {
    accessorKey: "asistidos",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ASIT" />
    ),
    cell: (row) => {
      const studentId = row.row.original.EstudianteID;
      return (
        <Checkbox
          checked={row.row.original.EstadoAsistencia === 1}
          onCheckedChange={() => handleCheckboxChange(studentId, 1)}
          aria-label="Asistido"
        />
      );
    },
  },
  {
    accessorKey: "tardanzas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TARD" />
    ),
    cell: (row) => {
      const studentId = row.row.original.EstudianteID;
      return (
        <Checkbox
          checked={row.row.original.EstadoAsistencia === 2}
          onCheckedChange={() => handleCheckboxChange(studentId, 2)}
          aria-label="Tarde"
        />
      );
    },
  },
  {
    accessorKey: "faltas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="FALT" />
    ),
    cell: (row) => {
      console.log("probnaod", row);
      const studentId = row.row.original.EstudianteID;
      return (
        <Checkbox
          checked={row.row.original.EstadoAsistencia === 3}
          onCheckedChange={() => handleCheckboxChange(studentId, 3)}
          aria-label="Falta"
        />
      );
    },
  },
  {
    accessorKey: "justificados",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="JUST" />
    ),
    cell: (row) => {
      const studentId = row.row.original.EstudianteID;
      return (
        <Checkbox
          checked={row.row.original.EstadoAsistencia === 4}
          onCheckedChange={() => handleCheckboxChange(studentId, 4)}
          aria-label="Justificado"
        />
      );
    },
  },
  {
    accessorKey: "Observacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Observaciones" />
    ),
    cell: (row) => {
      return <Input placeholder="Opcional" />;
    },
  },
];
