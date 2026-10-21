import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { recordApi } from '../../entities/record/api';
import { RecordItem } from '../../entities/record/types';
import { useFiltersStore } from '../../entities/record/model';
import { FiltersPanel } from '../../widgets/FiltersPanel/FiltersPanel';
import { DataTable } from '../../widgets/DataTable/DataTable';
import { RecordForm } from '../../features/RecordForm/RecordForm';
import { DeleteRecord } from '../../features/DeleteRecord/DeleteRecord';
import { Button } from '../../shared/ui/Button/Button';
import styles from './DashboardPage.module.scss';

const LIMIT = 10;

export function DashboardPage() {
  const { page, search, status, setPage } = useFiltersStore();
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<RecordItem | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['records', page, search, status],
    queryFn: () => recordApi.list({ page, limit: LIMIT, search, status }),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['records'] });

  const createMutation = useMutation({
    mutationFn: recordApi.create,
    onSuccess: () => { invalidate(); setCreating(false); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<RecordItem> }) =>
      recordApi.update(id, data),
    onSuccess: () => { invalidate(); setEditing(null); },
  });

  const deleteMutation = useMutation({
    mutationFn: recordApi.remove,
    onSuccess: () => { invalidate(); setDeleting(null); },
  });

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Integration Dashboard</h1>
        <Button onClick={() => setCreating(true)}>+ Новая интеграция</Button>
      </header>

      <FiltersPanel />

      {isLoading && <div className={styles.state}>Загрузка...</div>}
      {isError && <div className={styles.stateError}>Ошибка: {(error as Error).message}</div>}
      {data && (
        <>
          <DataTable
            items={data.items}
            onEdit={(r) => setEditing(r)}
            onDelete={(r) => setDeleting(r)}
          />
          <div className={styles.pagination}>
            <Button variant="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              ← Назад
            </Button>
            <span>Страница {page} из {totalPages}</span>
            <Button variant="ghost" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
              Вперёд →
            </Button>
          </div>
        </>
      )}

      {creating && (
        <Modal onClose={() => setCreating(false)}>
          <RecordForm
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setCreating(false)}
            loading={createMutation.isPending}
          />
        </Modal>
      )}

      {editing && (
        <Modal onClose={() => setEditing(null)}>
          <RecordForm
            initial={editing}
            onSubmit={(data) => updateMutation.mutate({ id: editing.id, data })}
            onCancel={() => setEditing(null)}
            loading={updateMutation.isPending}
          />
        </Modal>
      )}

      {deleting && (
        <Modal onClose={() => setDeleting(null)}>
          <DeleteRecord
            onConfirm={() => deleteMutation.mutate(deleting.id)}
            onCancel={() => setDeleting(null)}
            loading={deleteMutation.isPending}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}