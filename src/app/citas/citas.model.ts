
export interface Cita {
  id: string;
  user: string;
  medico: {
    id: string;
    nombreCompleto: string;
  };
  sede?: string;
  title: string;
  start: Date;
  end?: Date;
  allDay: boolean;
}
