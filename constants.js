export const CATEGORIES = ['Comida', 'Gasolina', 'Servicios', 'Renta o hipoteca', 'Entretenimiento', 'Otros'];
export const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
export const YEAR = 2026;

export function fmt(n) {
  return (Number(n) || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}
