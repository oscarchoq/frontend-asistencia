import { useEffect, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import Loading from "@/components/custom/loading";

import { usePersona } from "@/hook/usePersona";
import { columns } from "./columns";

const ListarDocentes = () => {
  const { getPersona, changeStatusPerson } = usePersona();
  const [docentes, setDocentes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const get = async () => {
      setIsLoading(true);
      const res = await getPersona(2);
      // console.log("res", res);
      setDocentes(res);
      setIsLoading(false);
    };
    get();
  }, []);

  const handleChangeStatus = async (personaID, newStatus) => {
    setIsLoading(true);
    const res = await changeStatusPerson(personaID, newStatus);
    // console.log(res);
    if (res.status === 200) {
      const docentes = await getPersona(2);
      setDocentes(docentes);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <DataTable
        columns={columns({ onStatusChange: handleChangeStatus })}
        data={docentes}
      />
      {isLoading && <Loading />}
    </div>
  );
};

export { ListarDocentes };
