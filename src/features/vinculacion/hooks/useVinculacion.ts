/** Gestiona el envío y estado del formulario de vinculación. */

import { registrarPropuestaVinculacion } from '@/features/vinculacion/services/vinculacion.service';
import type { EmpresaFormData } from '../types/vinculacion.types';
import { useAsyncSubmit } from '@/lib/hooks';

export function useVinculacion() {
  return useAsyncSubmit<EmpresaFormData>(registrarPropuestaVinculacion, {
    defaultErrorMessage: 'Error al enviar la solicitud',
  });
}
