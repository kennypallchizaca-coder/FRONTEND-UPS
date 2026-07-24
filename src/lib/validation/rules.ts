/** Define reglas reutilizables para validar formularios. */

export type ValidationRule = (value: string) => string | null;

export const rules = {
  required:
    (message = 'Este campo es obligatorio'): ValidationRule =>
    (value) =>
      value.trim().length > 0 ? null : message,

  minLength:
    (min: number, message?: string): ValidationRule =>
    (value) =>
      value.trim().length >= min
        ? null
        : message ?? `Mínimo ${min} caracteres`,

  email:
    (message = 'Correo electrónico inválido'): ValidationRule =>
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message,

  digits:
    (count: number, message?: string): ValidationRule =>
    (value) =>
      new RegExp(`^[0-9]{${count}}$`).test(value)
        ? null
        : message ?? `Debe tener ${count} dígitos numéricos`,
} as const;

export function validateField(value: string, fieldRules: ValidationRule[]): string | null {
  for (const rule of fieldRules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}
