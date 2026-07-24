/** Define tipos compartidos para respuestas y estados de API. */

export interface ApiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface AsyncState<T> {
  data: T | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}
