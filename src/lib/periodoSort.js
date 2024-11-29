export const periodoSort = (periodos) => {
  // Ordenamos los periodos por año y semestre
  const orderedPeriodos = periodos.sort((a, b) => {
    const [aYear, aPeriod] = a.Denominacion.split("-").map(Number);
    const [bYear, bPeriod] = b.Denominacion.split("-").map(Number);
    if (aYear !== bYear) {
      return bYear - aYear;
    }
    return bPeriod - aPeriod;
  });

  return orderedPeriodos;
};
