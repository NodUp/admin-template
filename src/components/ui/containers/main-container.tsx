import React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  children: any;
  className?: string;
};

const MainContainer = ({ children, className }: Props) => {
  return (
    <div className={cn(`flex h-screen min-h-screen items-center`, className)}>
      {children}
    </div>
  );
};

export { MainContainer };
