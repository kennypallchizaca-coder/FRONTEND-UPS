/** Define los tipos del dominio de admisiones. */

type EventoOrigen =
  | 'Feria'
  | 'Recorrido UPS'
  | 'Redes sociales'
  | 'Visita a colegio'
  | 'Otro';

type InteresArea =
  | 'Información general'
  | 'Malla curricular'
  | 'Campo laboral'
  | 'Laboratorios'
  | 'Admisión'
  | 'Becas'
  | 'Acreditación';

export interface InteresadoFormData {
  nombre: string;
  telefono: string;
  correo: string;
  institucion?: string;
  evento: EventoOrigen;
  interes: InteresArea;
  observaciones?: string;
}

export interface Interesado extends InteresadoFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}
