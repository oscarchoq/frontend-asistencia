import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { usePersona } from "@/hook/usePersona";

const ListarEstudiantes = () => {
  const { getPersona, changeStatusPerson } = usePersona();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await getPersona(1);
      // console.log("res", res);
      setStudents(res);
    };
    get();
  }, []);

  const handleChangeStatus = async (personaID, newStatus) => {
    const res = await changeStatusPerson(personaID, newStatus);
    console.log(res);
    if (res.status === 200) {
      const estudiantes = await getPersona(1);
      setStudents(estudiantes);
    }
  };

  return (
    <div>
      <DataTable
        columns={columns({ onStatusChange: handleChangeStatus })}
        data={students}
      />
    </div>
  );
};

export { ListarEstudiantes };
