import { usePersona } from "@/hook/usePersona";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";

const ListarDocentes = () => {
  const { getPersona, changeStatusPerson } = usePersona();
  const [docentes, setDocentes] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await getPersona(2);
      console.log("res", res);
      setDocentes(res);
    };
    get();
  }, []);

  const handleChangeStatus = async (personaID, newStatus) => {
    const res = await changeStatusPerson(personaID, newStatus);
    console.log(res);
    if (res.status === 200) {
      const docentes = await getPersona(2);
      setDocentes(docentes);
    }
  };

  return (
    <div>
      <DataTable
        columns={columns({ onStatusChange: handleChangeStatus })}
        data={docentes}
      />
    </div>
  );
};

export { ListarDocentes };
