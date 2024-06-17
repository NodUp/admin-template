import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: any;
  className?: string;
};

const ComponentContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(`mx-auto flex flex-col rounded-xl bg-white p-4`, className)}
    >
      {children}
    </div>
  );
};

export { ComponentContainer };
