import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: any;
  className?: string;
};

const GridContainer = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        `mb-4 grid w-full grid-cols-[5rem,100fr] items-center gap-y-4`,
        className
      )}
    >
      {children}
    </div>
  );
};

export { GridContainer };
