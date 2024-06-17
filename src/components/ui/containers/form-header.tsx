import React from 'react';

import { Label } from '@/components/ui/label';

type Props = {
  title: string;
};

const FormHeader = ({ title }: Props) => {
  return (
    <div className='mb-4 flex border-b-2 p-2'>
      <Label variant='title' className='mx-auto mb-4'>
        {title}
      </Label>
    </div>
  );
};

export { FormHeader };
