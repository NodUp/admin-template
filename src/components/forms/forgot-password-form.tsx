'use client';

import { forgotPassword } from '@/actions/users';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/containers/content-container';
import { FormHeader } from '@/components/ui/containers/form-header';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label';
import { useMyToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import * as z from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail: campo obrigatório !' })
    .email('E-mail: formato inválido'),
});

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { save } = useSave();
  const onSubmit = async (data: any) => {
    await save(data);
    reset();
  };

  return (
    <Container className='w-[400px]'>
      <FormHeader title='Esqueceu a senha?' />

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer className='mb-8'>
          <Label className=''>Email:</Label>

          <Input
            register={register}
            name='email'
            errors={errors}
            placeholder='Email'
            variant='email'
          />
        </GridContainer>

        <Button
          type='submit'
          variant='secondary'
          className='mb-4'
          isSubmitting={isSubmitting}
        >
          Recuperar senha
        </Button>
      </form>
    </Container>
  );
}

export function useSave() {
  const { sucessMessage, errorMessage } = useMyToast();

  const save = async (data: any) => {
    const { email } = data;

    const { success } = await forgotPassword(email);

    success
      ? sucessMessage('Email com nova senha enviado!')
      : errorMessage('Erro ao salvar os dados!');
  };

  return { save };
}
