import { usePersona } from "@/hook/usePersona";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

const ListarDocentes = () => {
  const { getPersona } = usePersona();
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await getPersona(2);
      console.log("res", res);
      setDocentes(res);
    };
    get();
  }, []);
  return (
    <div>
      <DataTable columns={columns} data={docentes} />
    </div>
  );
};

export { ListarDocentes };
