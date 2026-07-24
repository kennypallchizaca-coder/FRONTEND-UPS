/** Define esquemas de validación para formularios del sistema. */

import { rules } from './rules';
import type { ValidationRule } from './rules';

export const admisionesSchema: Record<string, ValidationRule[]> = {
  nombre: [
    rules.required('El nombre es obligatorio'),
    rules.minLength(3, 'Mínimo 3 caracteres'),
  ],
  telefono: [
    rules.required('El teléfono es obligatorio'),
    rules.digits(10, 'Debe tener 10 dígitos numéricos'),
  ],
  correo: [
    rules.required('El correo es obligatorio'),
    rules.email(),
  ],
  evento: [
    rules.required('Selecciona dónde nos conociste'),
  ],
};

export const vinculacionSchema: Record<string, ValidationRule[]> = {
  empresa: [
    rules.required('El nombre de la empresa es obligatorio'),
  ],
  contacto: [
    rules.required('El nombre del contacto es obligatorio'),
  ],
  correo: [
    rules.required('El correo es obligatorio'),
    rules.email(),
  ],
  telefono: [
    rules.required('El teléfono es obligatorio'),
    rules.digits(10, 'Debe tener 10 dígitos numéricos'),
  ],
  tipo_colaboracion: [
    rules.required('El tipo de colaboración es obligatorio'),
  ],
  mensaje: [
    rules.required('El mensaje es obligatorio'),
    rules.minLength(10, 'Mínimo 10 caracteres'),
  ],
};
