import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: any;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        `mx-auto flex flex-col rounded-sm border border-gray-300 bg-white p-4`,
        className
      )}
    >
      {children}
    </div>
  );
};

export { Container };
