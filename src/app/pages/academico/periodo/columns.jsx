import { useState } from "react";
import { Link } from "react-router-dom";

import { IoTrashSharp } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";

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

export const columns = ({ onStatusChange, setShowDialog, setData }) => [
  {
    accessorKey: "PeriodoID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N°" />
    ),
  },
  {
    accessorKey: "Denominacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Denominación" />
    ),
  },
  {
    accessorKey: "FechaInicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Inicio" />
    ),
  },
  {
    accessorKey: "FechaFin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha Fin" />
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
          periodo={row.original}
          onStatusChange={onStatusChange}
          setShowDialog={setShowDialog}
          setData={setData}
        />
      );
    },
  },
];

const ActionsButtons = ({
  periodo,
  onStatusChange,
  setShowDialog,
  setData,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState(periodo.Activo);

  const handleConfirmChange = async () => {
    await onStatusChange(periodo.PeriodoID, newStatus); // Llamar la función pasada como prop
    setIsDialogOpen(false);
  };
  return (
    <div className="flex justify-center items-center gap-x-2">
      <Switch
        checked={newStatus}
        onCheckedChange={() => setIsDialogOpen(true)} // Cambia el estado cuando se cambia el switch
      />
      <Button
        type="button"
        size="option"
        className="bg-green-700"
        onClick={() => {
          console.log(periodo);
          setShowDialog(true);
          setData(periodo);
        }}
      >
        <FaPencilAlt />
      </Button>
      <Button type="button" size="option" className="bg-red-700">
        <IoTrashSharp />
      </Button>

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