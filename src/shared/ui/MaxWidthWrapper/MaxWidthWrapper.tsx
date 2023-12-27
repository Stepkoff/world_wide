import React from 'react';
import s from './maxWidthWrapper.module.sass'

interface MaxWidthWrapperProps {
  children: React.ReactNode
}

export const MaxWidthWrapper = ({children}: MaxWidthWrapperProps) => {
  return (
    <div className={s.maxWidthWrapper}>
      {children}
    </div>
  );
};