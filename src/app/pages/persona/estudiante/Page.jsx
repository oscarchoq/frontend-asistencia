import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import Loading from "@/components/custom/loading";

import { usePersona } from "@/hook/usePersona";
import { columns } from "./columns";

const ListarEstudiantes = () => {
  const { getPersona, changeStatusPerson } = usePersona();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const res = await getPersona(1);
      // console.log("res", res);
      setStudents(res);
      setIsLoading(false);
    };
    get();
  }, []);

  const handleChangeStatus = async (personaID, newStatus) => {
    setIsLoading(true);
    const res = await changeStatusPerson(personaID, newStatus);
    // console.log(res);
    if (res.status === 200) {
      const estudiantes = await getPersona(1);
      setStudents(estudiantes);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <DataTable
        columns={columns({ onStatusChange: handleChangeStatus })}
        data={students}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export { ListarEstudiantes };
