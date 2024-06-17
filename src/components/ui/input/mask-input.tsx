'use client';

import InputMask from 'react-input-mask';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { Props } from './index';

const MaskInput = ({
  className,
  name,
  errors,
  placeholder,
  register,
  mask,
}: Props) => {
  return (
    <div>
      <InputMask
        className={cn(
          `flex h-10 w-full rounded-lg border border-gray-400 px-2 py-2 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''}`,
          className
        )}
        {...register(`${name}`)}
        mask={mask}
        maskChar=' '
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

export { MaskInput };
