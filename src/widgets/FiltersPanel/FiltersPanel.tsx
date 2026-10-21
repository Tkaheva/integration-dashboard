import { Input } from '../../shared/ui/Input/Input';
import { useFiltersStore } from '../../entities/record/model';
import styles from './FiltersPanel.module.scss';

export function FiltersPanel() {
  const { search, status, setSearch, setStatus } = useFiltersStore();

  return (
    <div className={styles.panel}>
      <Input
        placeholder="Поиск по названию..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className={styles.select}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Все статусы</option>
        <option value="active">Активные</option>
        <option value="error">С ошибкой</option>
        <option value="pending">В ожидании</option>
      </select>
    </div>
  );
}