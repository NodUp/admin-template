import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { cn } from '@/lib/utils';
import { Props } from './index';
import { CurrencyInput as Input } from 'react-currency-mask';

function CurrencyInput({
  className,
  name,
  errors,
  placeholder,
  control,
  setValue,
}: Props) {
  function currencyFormatter(value: any) {
    if (!Number(value)) return '';

    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);

    return `${amount}`;
  }

  return (
    <div>
      <Controller
        control={control}
        name={`${name}`}
        render={({ field }: any) => (
          <>
            <Input
              //@ts-ignore
              className={cn(
                `flex h-10 w-full rounded-lg border border-gray-400 px-2 py-2 text-zinc-600 outline-none ${errors[`${name}`] ? 'border-red-700' : ''}`,
                className
              )}
              placeholder={placeholder}
              value={field.value}
              onChangeValue={field.onChange}
              onFocus={() => {
                setValue(`${name}`, '');
              }}
            />
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

export default CurrencyInput;
