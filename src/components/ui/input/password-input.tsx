'use client';

import React, { useState } from 'react';

import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { Props } from './index';
import UnVisibleIcon from '@/assets/icons/unvisible-icon';
import VisibleIcon from '@/assets/icons/visible-icon';

const PasswordtInput = ({
  className,
  name,
  errors,
  placeholder,
  register,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative w-full'>
      <input
        className={cn(
          `flex h-10 w-full rounded-lg border border-gray-400 px-2 py-2 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''}`,
          className
        )}
        {...register(`${name}`)}
        id={name}
        name={name}
        placeholder={placeholder}
        type={showPassword ? 'text' : 'password'}
      />
      <div
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-2 top-[10px]'
      >
        {!showPassword ? <VisibleIcon /> : <UnVisibleIcon />}
      </div>
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

export { PasswordtInput };
