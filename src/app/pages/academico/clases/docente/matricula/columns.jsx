import { useState } from "react";

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
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const columns = ({ onStatusChange }) => [
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
    accessorKey: "EstadoInscripcion",
    header: "Estado",
    cell: (row) => {
      const statusValue = row.getValue("Estado");
      const variant = {
        ACEPTADO: "activo",
        "EN ESPERA": "intermedio",
        RECHAZADO: "desactivo",
      }[statusValue];
      return <Badge variant={variant}>{statusValue}</Badge>;
    },
  },
  {
    id: "Acciones",
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => {
      return (
        <ActionsButtons
          inscrito={row.original}
          onStatusChange={onStatusChange}
        />
      );
    },
  },
];

const ActionsButtons = ({ inscrito, onStatusChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(inscrito.EstadoInscripcion);

  const handleConfirmChange = async () => {
    // console.log("Se cambiara a ", newStatus);
    if (inscrito.EstadoInscripcion === newStatus) {
      // console.log("Sin cambios");
      setIsDialogOpen(false);
      return;
    }
    await onStatusChange(inscrito.InscripcionID, newStatus); // Llamar la función pasada como prop
    setIsDialogOpen(false);
  };

  return (
    <div className="flex justify-center items-center gap-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setNewStatus("ACEPTADO");
              setIsDialogOpen(true);
            }}
          >
            Aceptar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setNewStatus("RECHAZADO");
              setIsDialogOpen(true);
            }}
          >
            Rechazar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Estás seguro de cambiar el estado?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cambiará el estado de inscripción del estudiante.
              ¿Deseas continuar?
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
