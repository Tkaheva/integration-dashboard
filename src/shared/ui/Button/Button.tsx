import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
}

export function Button({ variant = 'primary', className = '', ...rest }: Props) {
  return <button className={`${styles.button} ${styles[variant]} ${className}`} {...rest} />;
}