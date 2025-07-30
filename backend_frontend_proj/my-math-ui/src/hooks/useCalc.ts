// src/hooks/useCalc.ts
import { useState } from 'react';
import api from '../api/client';
import type { CalcRequest, CalcResponse } from '../models/types';

/**
 * Hook generic pentru apel POST la endpoint-ul de calcul.
 * @param path Ruta (ex: '/pow' sau `/fibonacci/${n}`)
 */
export function useCalc(path: string) {
  const [data, setData] = useState<CalcResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function callCalc(params: CalcRequest) {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<CalcResponse>(path, params);
      setData(res.data);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }
// Add this inside your useCalc function, before the return statement:
function reset() {
  setData(null);
  setError(null);
}

// And update the return:
return { data, error, loading, callCalc, reset };
}
