import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns = [
  {
    accessorKey: "AperturaCursoID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N°" />
    ),
  },
  {
    accessorKey: "AperturaCursoID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="N°" />
    ),
  },
];

// filtro por periodo electio / sede/ programada academico / plan curricular/ grado educativo
// codigo
// asignatura
// turno (T)/grupo (G)
// Horario
// Capacidad == input
// Docente == nombre
// acciones [seleccionar docente, editar]

// flujo seleccionar docnete : buscar docente en la lista (formato tabla) que muestra
//               N° doc registerDocente apellidos y nombre grado fecha registro acciones (seleccionar ico share)

// flujo actualizar apertura : formulario con... turno, grupo, horario, capacidad

// opciones adicionales como : matriculados, asistencia
