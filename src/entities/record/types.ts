export type RecordStatus = 'active' | 'error' | 'pending';
export type RecordType = 'ozon' | 'google_sheets' | 'webhook';

export interface RecordItem {
  id: string;
  name: string;
  status: RecordStatus;
  type: RecordType;
  updated_at: string;
}

export interface RecordsResponse {
  items: RecordItem[];
  total: number;
  page: number;
  limit: number;
}

export interface RecordsQuery {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}