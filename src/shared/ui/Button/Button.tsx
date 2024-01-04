import {ButtonHTMLAttributes, ReactNode} from 'react';
import s from './Button.module.sass'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant: string
}

export const Button = ({children, onClick, variant, type, ...rest}: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${s.btn} ${s[variant]}`} type={type} {...rest}>
      {children}
    </button>
  );
};