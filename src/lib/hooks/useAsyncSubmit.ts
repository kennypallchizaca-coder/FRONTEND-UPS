/** Gestiona el estado estándar de envíos asíncronos. */

import { useCallback, useState } from 'react';
import type { AsyncState } from '@/lib/types/api.types';

interface UseAsyncSubmitOptions {
  defaultErrorMessage: string;
}

const INITIAL_STATE: AsyncState<true> = {
  data: null,
  status: 'idle',
  error: null,
};

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function useAsyncSubmit<T>(
  submitter: (data: T) => Promise<unknown>,
  { defaultErrorMessage }: UseAsyncSubmitOptions
) {
  const [state, setState] = useState<AsyncState<true>>(INITIAL_STATE);

  const submitForm = useCallback(async (data: T) => {
    setState({ data: null, status: 'loading', error: null });

    try {
      await submitter(data);
      setState({ data: true, status: 'success', error: null });
    } catch (error) {
      setState({
        data: null,
        status: 'error',
        error: getErrorMessage(error, defaultErrorMessage),
      });
    }
  }, [defaultErrorMessage, submitter]);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { state, submitForm, reset };
}
