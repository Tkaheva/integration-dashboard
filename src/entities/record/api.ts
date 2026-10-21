import { api } from '../../shared/api/client';
import { RecordItem, RecordsQuery, RecordsResponse } from './types';

export const recordApi = {
  list: (q: RecordsQuery) => {
    const params = new URLSearchParams({
      page: String(q.page),
      limit: String(q.limit),
      ...(q.search ? { search: q.search } : {}),
      ...(q.status ? { status: q.status } : {}),
    });
    return api.get<RecordsResponse>(`/records?${params}`);
  },
  create: (data: Partial<RecordItem>) => api.post<RecordItem>('/records', data),
  update: (id: string, data: Partial<RecordItem>) => api.put<RecordItem>(`/records/${id}`, data),
  remove: (id: string) => api.delete(`/records/${id}`),
};