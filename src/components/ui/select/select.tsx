'use client';

import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  errors?: any;
  control?: any;
  name?: string;
  items?: any;
  func?: any;
  disabled?: any;
};

function SelectInput({
  errors,
  control,
  name,
  items,
  func,
  disabled = false,
}: Props) {
  return (
    <div>
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }: any) => (
          <>
            <Select
              disabled={disabled}
              key={name}
              onValueChange={(e) => {
                field.onChange(e);
                if (typeof func === 'function') {
                  func(e);
                }
              }}
              value={field.value}
              defaultValue={field.value}
            >
              <SelectTrigger
                className={`flex h-10 w-full justify-between rounded-lg border border-gray-400 px-2 py-2 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''} ${disabled ? 'bg-gray-50 text-gray-400' : ''}`}
              >
                <SelectValue placeholder='Selecione ...' />
              </SelectTrigger>
              <SelectContent>
                {items.map((i: any) => (
                  <SelectItem key={i.id.toString()} value={i.id.toString()}>
                    {i.name.toString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
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
}

export { SelectInput };
