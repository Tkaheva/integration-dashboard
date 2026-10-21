import { create } from 'zustand';

interface FiltersState {
  page: number;
  search: string;
  status: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  page: 1,
  search: '',
  status: '',
  setPage: (page) => set({ page }),
  setSearch: (search) => set({ search, page: 1 }),
  setStatus: (status) => set({ status, page: 1 }),
}));