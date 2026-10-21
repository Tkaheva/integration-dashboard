import { Button } from '../../shared/ui/Button/Button';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteRecord({ onConfirm, onCancel, loading }: Props) {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>Удалить запись? Действие необратимо.</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={onCancel}>Отмена</Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Удаляем...' : 'Удалить'}
        </Button>
      </div>
    </div>
  );
}