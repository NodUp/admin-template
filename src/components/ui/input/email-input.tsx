'use client';

import * as React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import MailIcon from '@/assets/icons/mail-icon';
import { Props } from './index';

const EmailInput = ({
  className,
  name,
  errors,
  placeholder,
  register,
}: Props) => {
  return (
    <div className='relative w-full'>
      <div className={`pointer-events-none absolute left-[4px] top-[-3px]`}>
        <MailIcon />
      </div>
      <input
        className={cn(
          `h-10 w-full rounded-lg border border-gray-400 py-2 pl-8 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''}`,
          className
        )}
        {...register(`${name}`)}
        id={name}
        name={name}
        placeholder={placeholder}
      />
      <ErrorMessage
        errors={errors}
        name={`${name}`}
        render={({ message }: { message: string }) => (
          <p className='mt-2 text-sm text-red-700'>{message}</p>
        )}
      />
    </div>
  );
};

export { EmailInput };
