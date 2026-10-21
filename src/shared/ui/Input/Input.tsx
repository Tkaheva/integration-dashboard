import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className = '', ...rest }, ref) => (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input ref={ref} className={`${styles.input} ${error ? styles.error : ''} ${className}`} {...rest} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  )
);
Input.displayName = 'Input';