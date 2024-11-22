import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { usePersona } from "@/hook/usePersona";

const ListarEstudiantes = () => {
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

  return (
    <div>
      <DataTable columns={columns} data={students} />
    </div>
  );
};

export { ListarEstudiantes };
