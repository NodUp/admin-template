'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/index';
import { Container } from '@/components/ui/containers/content-container';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormHeader } from '@/components/ui/containers/form-header';
import { forgotPassword } from '@/actions/users';
import { useToast } from '@/components/ui/use-toast';

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

  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    const { email } = data;

    forgotPassword(email);

    reset();

    toast({
      title: 'Sucesso !',
      description: 'Operação realizada!',
      variant: 'constructive',
    });
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
