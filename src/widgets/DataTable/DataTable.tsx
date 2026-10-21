import { RecordItem } from '../../entities/record/types';
import { Button } from '../../shared/ui/Button/Button';
import { formatDate } from '../../shared/lib/format';
import styles from './DataTable.module.scss';

interface Props {
  items: RecordItem[];
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
}

const STATUS_LABELS: Record<string, string> = {
  active: 'Активна',
  error: 'Ошибка',
  pending: 'В ожидании',
};

export function DataTable({ items, onEdit, onDelete }: Props) {
  if (items.length === 0) {
    return <div className={styles.empty}>Нет записей. Создайте первую!</div>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Название</th>
            <th>Тип</th>
            <th>Статус</th>
            <th>Обновлено</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>
                <span className={`${styles.status} ${styles[item.status]}`}>
                  {STATUS_LABELS[item.status]}
                </span>
              </td>
              <td>{formatDate(item.updated_at)}</td>
              <td className={styles.actions}>
                <Button variant="ghost" onClick={() => onEdit(item)}>Изменить</Button>
                <Button variant="danger" onClick={() => onDelete(item)}>Удалить</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}