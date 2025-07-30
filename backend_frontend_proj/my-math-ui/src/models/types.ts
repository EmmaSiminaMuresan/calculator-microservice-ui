// src/models/types.ts

/**
 * Request-ul pentru orice operație de calcul.
 */
export interface CalcRequest {
  /** Principalul număr (baza pentru pow, n pentru fib/fact) */
  x: number;
  /** Exponentul pentru pow (opțional) */
  y?: number;
}

/**
 * Răspunsul de la API.
 */
export interface CalcResponse {
  /** Operația executată */
  operation: 'pow' | 'fibonacci' | 'factorial';
  /** Valoarea x trimisă */
  x: number;
  /** Valoarea y (numai pentru pow) */
  y?: number;
  /** Rezultatul calculului */
  result: number;
}
