'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Props = {
  control?: any;
  errors?: any;
  name?: string;
};

export function DatePicker({ control, errors, name }: Props) {
  return (
    <div>
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }: any) => (
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    `flex h-10 w-full justify-between rounded-lg border border-gray-400 px-2 py-2 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''}`
                  )}
                >
                  {field.value ? (
                    format(field.value, 'dd/MM/yyyy')
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                  <CalendarIcon className='mr-2 h-4 w-4' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  locale={ptBR}
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
