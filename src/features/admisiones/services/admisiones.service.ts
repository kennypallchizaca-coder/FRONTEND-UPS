/** Envía y normaliza solicitudes de interesados para Strapi. */

import type { InteresadoFormData, Interesado } from '../types/admisiones.types';
import { apiClient, ENDPOINTS } from '@/lib/api';
import { sanitizeEmail, sanitizePhone, sanitizeText } from '@/lib/security/sanitize';

export async function registrarInteresado(
  data: InteresadoFormData
): Promise<Interesado> {
  const nameParts = data.nombre.trim().split(/\s+/);
  const nombre = nameParts[0] || '';
  const apellido = nameParts.slice(1).join(' ') || '';

  const payload = {
    nombre: nombre,
    apellido: apellido,
    email: sanitizeEmail(data.correo),
    telefono: sanitizePhone(data.telefono),
    programaInteres: data.interes,
    mensaje: sanitizeText(data.observaciones, 1000),
    institucion: sanitizeText(data.institucion || '', 160),
    source: data.evento || 'web'
  };

  const response = await apiClient.post<{
    success: boolean;
    message: string;
    data: {
      leadId: number;
      confirmationEmailSent: boolean;
      admissionsNotificationSent: boolean;
    };
  }>(
    ENDPOINTS.ADMISIONES.CREATE,
    payload
  );

  return {
    id: response.data.leadId,
    nombre: payload.nombre + (payload.apellido ? ' ' + payload.apellido : ''),
    telefono: payload.telefono,
    correo: payload.email,
    institucion: payload.institucion,
    evento: data.evento,
    interes: data.interes,
    observaciones: payload.mensaje,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
