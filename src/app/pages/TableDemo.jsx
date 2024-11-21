import React, { useState, useEffect } from "react";
import { payments } from "@/data/paymets.data"; // Asegúrate de que la ruta esté correcta
import { DataTable } from "./data-table";
import { columns } from "./columns";

const TableDemo = () => {
  const [data, setData] = useState([]); // Estado para almacenar los datos

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await payments;
      setData(fetchedData); // Establecemos los datos en el estado
    };

    fetchData(); // Llamamos a la función para obtener los datos
  }, []); // Solo se ejecuta una vez al montar el componente

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1>Payments</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>{" "} */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TableDemo;
