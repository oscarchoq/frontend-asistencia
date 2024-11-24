import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { usePersona } from "@/hook/usePersona";
import { FaPencilAlt } from "react-icons/fa";
import { IoEyeSharp, IoTrashSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

const { changeStatusPerson } = usePersona();

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
      console.log("activo => ", row.original.Activo);
      const [isDialogOpen, setIsDialogOpen] = useState(false); // estado para abrir el AlertDialog
      const [newStatus, setNewStatus] = useState(row.original.Activo); // estado para el nuevo valor de Activo
      const navigate = useNavigate();

      const handleConfirmChange = async () => {
        await changeStatusPerson(row.original.PersonaID, newStatus); // Cambiar el estado
        setIsDialogOpen(false); // Cerrar el AlertDialog
        navigate(0);
      };
      return (
        <div className="flex justify-center items-center gap-x-2">
          <Switch
            checked={newStatus}
            onCheckedChange={() => setIsDialogOpen(true)} // Cambia el estado cuando se cambia el switch
          />
          <Link
            to={`editar/${row.original.PersonaID}`}
            className="bg-green-700 p-1 rounded text-white"
          >
            <FaPencilAlt size={14} />
          </Link>
          <Link
            to={`eliminar/${row.original.id}`}
            className="bg-red-700 p-1 rounded text-white"
          >
            <IoTrashSharp size={14} />
          </Link>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Estás seguro de cambiar el estado?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción cambiará el estado del usuario. ¿Deseas continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmChange}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

// N, codigo, apellidos y nombres, nro doc, plan, prog acad, sed,mod, estado, acciones
