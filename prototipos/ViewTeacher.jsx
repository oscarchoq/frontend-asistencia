import DataTable from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import React from "react";
import { Charts } from "./Charts";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const ViewTeacher = () => {
  const data = [
    {
      dni: "12345678",
      first_name: "Juan",
      last_name: "Pérez",
      second_last_name: "García",
      cellphone: "987654321",
    },
    {
      dni: "87654321",
      first_name: "María",
      last_name: "López",
      second_last_name: "Martínez",
      cellphone: "912345678",
    },
    {
      dni: "11223344",
      first_name: "Carlos",
      last_name: "Gómez",
      second_last_name: "Sánchez",
      cellphone: "923456789",
    },
    {
      dni: "22334455",
      first_name: "Ana",
      last_name: "Fernández",
      second_last_name: "Ramos",
      cellphone: "934567890",
    },
    {
      dni: "33445566",
      first_name: "Luis",
      last_name: "Torres",
      second_last_name: "Morales",
      cellphone: "945678901",
    },
    {
      dni: "44556677",
      first_name: "Sofía",
      last_name: "Méndez",
      second_last_name: "Díaz",
      cellphone: "956789012",
    },
    {
      dni: "55667788",
      first_name: "Pedro",
      last_name: "Vega",
      second_last_name: "Jiménez",
      cellphone: "967890123",
    },
    {
      dni: "66778899",
      first_name: "Lucía",
      last_name: "Castro",
      second_last_name: "Hernández",
      cellphone: "978901234",
    },
  ];

  const columns = [
    {
      header: "Nombre Completo",
      // accessorKey: "first_name",
      // cell: ({ row }) => {
      //   console.log("row", row);
      //   return (
      //     <div className="text-lg font-bold text-blue-600">
      //       {/* {`${row.cell.original.first_name} ${row.last_name} ${row.second_last_name}`} */}
      //       {row.getValue()}
      //     </div>
      //   );
      // },
      // accessorFn: (row) => (
      //   <div className="text-lg font-bold text-blue-600">
      //     {`${row.first_name} ${row.last_name} ${row.second_last_name}`}
      //   </div>
      // ),
      cell: (info) => (
        <div className="text-left mx-1">
          {`${info.row.original.first_name} ${info.row.original.last_name} ${info.row.original.second_last_name}`}
        </div>
      ),
    },
    {
      header: "P",
      cell: (row) => {
        return <Checkbox checked={row.presente} aria-label="Select row" />;
      },
    },
    {
      header: "T",
      cell: (row) => {
        return <Checkbox checked={row.presente} aria-label="Select row" />;
      },
    },
    {
      header: "F",
      cell: (row) => {
        return <Checkbox checked={row.presente} aria-label="Select row" />;
      },
    },

    {
      header: "Observaciones",
      cell: (row) => {
        return <Input placeholder="Observacion"></Input>;
      },
    },
  ];

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">SISTEMA DE INFORMACIÓN GERENCIAL</h1>
        <span className="text-gray-500 font-semibold mt-1">
          OLIVER ISRAEL SANTANA CARBAJAL
        </span>
      </div>

      <div className="py-8 space-y-8">
        <div className="flex flex-col">
          <span>Registro de asistencia </span>
          <span>14 de Octubre de 2024 </span>
        </div>

        <DataTable data={data} columns={columns} />

        <div className="w-full flex items-center justify-center">
          <Button>Guardar asistencia</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewTeacher;
