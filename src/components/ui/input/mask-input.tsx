'use client';

import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { Props } from './index';
import MaskedInput from 'react-text-mask';
import { Controller } from 'react-hook-form';

const MaskInput = ({
  className,
  name,
  errors,
  placeholder,
  mask,
  control,
}: Props) => {
  return (
    <div>
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }: any) => (
          <MaskedInput
            className={cn(
              `flex h-10 w-full rounded-lg border border-gray-400 px-2 py-2 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''}`,
              className
            )}
            mask={mask}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            guide={false}
          />
        )}
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
