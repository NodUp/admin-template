'use client';

import * as React from 'react';

import { DefaultInput } from './default-input';
import { PasswordtInput } from './password-input';
import { EmailInput } from './email-input';
import { MaskInput } from './mask-input';
import CurrencyInput from './currency-input';

export type Props = {
  className?: string;
  variant?: string;
  name?: string;
  errors?: any;
  placeholder?: string;
  register?: any;
  mask?: string;
  control?: any;
  setValue?: any;
};

const Input = ({
  className,
  variant,
  name,
  errors,
  placeholder,
  register,
  mask,
  control,
  setValue,
}: Props) => {
  if (variant === 'email') {
    return (
      <EmailInput
        className={className}
        name={name}
        errors={errors}
        placeholder={placeholder}
        register={register}
      />
    );
  } else if (variant === 'password') {
    return (
      <PasswordtInput
        className={className}
        name={name}
        errors={errors}
        placeholder={placeholder}
        register={register}
      />
    );
  } else if (variant === 'mask') {
    return (
      <MaskInput
        className={className}
        name={name}
        errors={errors}
        placeholder={placeholder}
        register={register}
        mask={mask}
      />
    );
  } else if (variant === 'currency') {
    return (
      <CurrencyInput
        className={className}
        name={name}
        errors={errors}
        placeholder={placeholder}
        control={control}
        setValue={setValue}
      />
    );
  } else {
    return (
      <DefaultInput
        className={className}
        name={name}
        errors={errors}
        placeholder={placeholder}
        register={register}
      />
    );
  }
};

export { Input };
