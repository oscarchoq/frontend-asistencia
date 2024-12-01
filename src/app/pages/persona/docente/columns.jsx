import { useState } from "react";
import { Link } from "react-router-dom";

import { IoTrashSharp } from "react-icons/io5";
import { PiPencilSimpleLineBold } from "react-icons/pi";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";

export const columns = ({ onStatusChange }) => [
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
      // console.log("activo => ", row.original.Activo);
      return (
        <ActionsButtons
          persona={row.original}
          onStatusChange={onStatusChange}
        />
      );
    },
  },
];

const ActionsButtons = ({ persona, onStatusChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(persona.Activo);

  const handleConfirmChange = async () => {
    await onStatusChange(persona.PersonaID, newStatus); // Llamar la función pasada como prop
    setIsDialogOpen(false);
  };
  return (
    <div className="flex justify-center items-center gap-x-2">
      <Switch
        checked={newStatus}
        onCheckedChange={() => setIsDialogOpen(true)} // Cambia el estado cuando se cambia el switch
      />
      <Link to={`editar/${persona.PersonaID}`}>
        <Button
          type="button"
          size="option"
          className="bg-green-700 hover:bg-green-900"
        >
          <PiPencilSimpleLineBold />
        </Button>
      </Link>
      {/* <Link
        to={`eliminar/${persona.PersonaID}`}
        className="bg-red-700 p-1 rounded text-white"
      >
        <IoTrashSharp size={14} />
      </Link> */}

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
};
