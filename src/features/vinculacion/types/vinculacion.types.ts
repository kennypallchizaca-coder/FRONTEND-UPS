/** Define los tipos del dominio de vinculación. */

export interface EmpresaFormData {
  empresa: string;
  contacto: string;
  correo: string;
  telefono: string;
  mensaje: string;
  tipo_colaboracion: string;
}

export interface VinculacionRequest extends EmpresaFormData {
  id: number;
  createdAt: string;
}
