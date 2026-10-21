import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';
import { RecordItem } from '../../entities/record/types';
import styles from './RecordForm.module.scss';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  type: z.enum(['ozon', 'google_sheets', 'webhook']),
  status: z.enum(['active', 'error', 'pending']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initial?: RecordItem;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function RecordForm({ initial, onSubmit, onCancel, loading }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initial
      ? { name: initial.name, type: initial.type, status: initial.status }
      : { name: '', type: 'webhook', status: 'pending' },
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>{initial ? 'Редактировать' : 'Создать'} интеграцию</h3>
      <Input label="Название" {...register('name')} error={errors.name?.message} />
      <label className={styles.label}>
        Тип
        <select {...register('type')} className={styles.select}>
          <option value="ozon">Ozon API</option>
          <option value="google_sheets">Google Sheets</option>
          <option value="webhook">Webhook</option>
        </select>
      </label>
      <label className={styles.label}>
        Статус
        <select {...register('status')} className={styles.select}>
          <option value="active">Активна</option>
          <option value="error">Ошибка</option>
          <option value="pending">В ожидании</option>
        </select>
      </label>
      <div className={styles.actions}>
        <Button type="button" variant="ghost" onClick={onCancel}>Отмена</Button>
        <Button type="submit" disabled={loading}>{loading ? 'Сохраняем...' : 'Сохранить'}</Button>
      </div>
    </form>
  );
}