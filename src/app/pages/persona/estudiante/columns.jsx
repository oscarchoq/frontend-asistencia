import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TrashIcon } from "@radix-ui/react-icons";
import { Trash } from "lucide-react";
import { FaPencilAlt } from "react-icons/fa";
import { IoEyeSharp, IoTrashSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const columns = [
  {
    accessorKey: "PersonaID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N°" />
    ),
  },
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
    accessorKey: "NumeroDocumento",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nro. Doc." />
    ),
  },
  {
    accessorKey: "FechaRegistro",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Reg." />
    ),
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    cell: (row) => {
      // console.log(row.getValue("Activo"));
      const statusValue = row.getValue("Estado");
      // console.log(activoValue);
      const variant = {
        ACTIVO: "activo",
        DESACTIVO: "desactivo",
      }[statusValue];
      return <Badge variant={variant}>{statusValue}</Badge>;
    },
  },
  {
    id: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-x-2">
          <Switch className="" id="airplane-mode" />
          <Label htmlFor="airplane-mode"> </Label>
          <Link
            to={`ver/${row.original.id}`}
            className="bg-green-700 p-1 rounded text-white"
          >
            <FaPencilAlt size={14} />
          </Link>
          <Link
            to={`editar/${row.original.id}`}
            className="bg-red-700 p-1 rounded text-white"
          >
            <IoTrashSharp size={14} />
          </Link>
        </div>
      );
    },
  },
];

// N, codigo, apellidos y nombres, nro doc, plan, prog acad, sed,mod, estado, acciones
