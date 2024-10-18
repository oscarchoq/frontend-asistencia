import DataTable from "@/components/custom/DataTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { IoEyeSharp } from "react-icons/io5";
import { FaPencilAlt } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { usePersona } from "@/hook/usePersona";
import { useEffect, useState } from "react";

const EstudiantePage = () => {
  const { getPersona } = usePersona();
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const get = async () => {
      const res = await getPersona();
      // console.log("res", res);
      setStudents(res);
    };
    get();
  }, []);
  // const data = [
  //   {
  //     id: 1,
  //     nro_documento: "12345678",
  //     nombres: "Juan",
  //     apellido_paterno: "Perez",
  //     apellido_materno: "Gomez",
  //     sexo: "M",
  //   },
  //   {
  //     id: 2,
  //     nro_documento: "87654321",
  //     nombres: "Maria",
  //     apellido_paterno: "Rodriguez",
  //     apellido_materno: "Lopez",
  //     sexo: "F",
  //   },
  //   {
  //     id: 3,
  //     nro_documento: "11223344",
  //     nombres: "Carlos",
  //     apellido_paterno: "Fernandez",
  //     apellido_materno: "Martinez",
  //     sexo: "M",
  //   },
  //   {
  //     id: 4,
  //     nro_documento: "22334455",
  //     nombres: "Ana",
  //     apellido_paterno: "Gonzalez",
  //     apellido_materno: "Torres",
  //     sexo: "F",
  //   },
  //   {
  //     id: 5,
  //     nro_documento: "33445566",
  //     nombres: "Luis",
  //     apellido_paterno: "Ramirez",
  //     apellido_materno: "Sanchez",
  //     sexo: "M",
  //   },
  //   {
  //     id: 6,
  //     nro_documento: "44556677",
  //     nombres: "Laura",
  //     apellido_paterno: "Diaz",
  //     apellido_materno: "Hernandez",
  //     sexo: "F",
  //   },
  //   {
  //     id: 7,
  //     nro_documento: "55667788",
  //     nombres: "Jose",
  //     apellido_paterno: "Castillo",
  //     apellido_materno: "Vega",
  //     sexo: "M",
  //   },
  //   {
  //     id: 8,
  //     nro_documento: "66778899",
  //     nombres: "Claudia",
  //     apellido_paterno: "Vargas",
  //     apellido_materno: "Ramos",
  //     sexo: "F",
  //   },
  //   {
  //     id: 9,
  //     nro_documento: "77889900",
  //     nombres: "Miguel",
  //     apellido_paterno: "Ortiz",
  //     apellido_materno: "Paredes",
  //     sexo: "M",
  //   },
  //   {
  //     id: 10,
  //     nro_documento: "88990011",
  //     nombres: "Sofia",
  //     apellido_paterno: "Mendoza",
  //     apellido_materno: "Cruz",
  //     sexo: "F",
  //   },
  //   {
  //     id: 11,
  //     nro_documento: "99001122",
  //     nombres: "Fernando",
  //     apellido_paterno: "Cabrera",
  //     apellido_materno: "Morales",
  //     sexo: "M",
  //   },
  //   {
  //     id: 12,
  //     nro_documento: "10011223",
  //     nombres: "Valeria",
  //     apellido_paterno: "Reyes",
  //     apellido_materno: "Guerrero",
  //     sexo: "F",
  //   },
  //   {
  //     id: 13,
  //     nro_documento: "10122334",
  //     nombres: "Pedro",
  //     apellido_paterno: "Flores",
  //     apellido_materno: "Acosta",
  //     sexo: "M",
  //   },
  //   {
  //     id: 14,
  //     nro_documento: "10233445",
  //     nombres: "Carolina",
  //     apellido_paterno: "Medina",
  //     apellido_materno: "Soto",
  //     sexo: "F",
  //   },
  //   {
  //     id: 15,
  //     nro_documento: "10344556",
  //     nombres: "Diego",
  //     apellido_paterno: "Ruiz",
  //     apellido_materno: "Nuñez",
  //     sexo: "M",
  //   },
  // ];

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "DNI", accessorKey: "nro_documento" },
    {
      header: "Estudiante",
      cell: ({ row }) => {
        // console.log(row);
        return (
          <div className="text-left pl-6">
            {row.original.nombres} {row.original.apellido_paterno}{" "}
            {row.original.apellido_materno}
          </div>
        );
      },
    },
    {
      header: "Sexo",
      accessorKey: "sexo",
      cell: (row) => {
        // console.log(row.getValue("sexo"));
        const sexoValue = row.getValue("sexo");
        const variant = {
          M: "male",
          F: "female",
        }[sexoValue];
        return (
          <Badge variant={variant}>
            {sexoValue === "M" ? "Masculino" : "Femenino"}
          </Badge>
        );
      },
    },
    {
      header: "Opción",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center gap-x-2">
            <Link
              to={`ver/${row.original.id}`}
              className="bg-green-700 p-1 rounded text-white"
            >
              <IoEyeSharp size={15} />
            </Link>
            <Link
              to={`editar/${row.original.id}`}
              className="bg-blue-700 p-1 rounded text-white"
            >
              <FaPencilAlt size={15} />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <div className="flex flex-col pb-8 ">
        <h1 className="font-bold text-xl">Estudiantes</h1>
        <span className="text-gray-500 font-semibold -mt-1">
          Realice operaciones CRUD para los estudiantes
        </span>
      </div>

      <div className="pb-8 space-y-6">
        <Button>
          <Link to={"registrar"}>Nuevo</Link>
        </Button>

        <DataTable data={students} columns={columns} />
      </div>
    </div>
  );
};

export default EstudiantePage;
