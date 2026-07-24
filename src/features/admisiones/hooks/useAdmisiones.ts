/** Gestiona el envío y estado del formulario de admisiones. */

import { registrarInteresado } from '@/features/admisiones/services/admisiones.service';
import type { InteresadoFormData } from '../types/admisiones.types';
import { useAsyncSubmit } from '@/lib/hooks';

export function useAdmisiones() {
  return useAsyncSubmit<InteresadoFormData>(registrarInteresado, {
    defaultErrorMessage: 'Error al enviar el formulario',
  });
}
