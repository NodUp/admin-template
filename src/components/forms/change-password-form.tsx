'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/index';
import { Container } from '@/components/ui/containers/content-container';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormHeader } from '@/components/ui/containers/form-header';
import { ErrorMessage } from '@hookform/error-message';
import { changePassword } from '@/actions/users';
import { useToast } from '@/components/ui/use-toast';

import * as z from 'zod';

const schema = z
  .object({
    password: z.string().min(6, { message: 'Senha: campo obrigatório !' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Senha: campo obrigatório !' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não são iguais',
    path: ['confirm'],
  });

type Props = {
  userId: string | undefined;
};

export default function ChangePasswordForm({ userId }: Props) {
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
    await changePassword(userId ? userId : '', data.password);

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
        <GridContainer className='mb-4'>
          <Label className=''>Senha:</Label>

          <Input
            register={register}
            name='password'
            errors={errors}
            placeholder='Senha'
            variant='password'
          />

          <Label className=''>Confirmar Senha:</Label>

          <Input
            register={register}
            name='confirm_password'
            errors={errors}
            placeholder='Senha'
            variant='password'
          />
        </GridContainer>

        <div className='mx-auto mb-4'>
          <ErrorMessage
            errors={errors}
            name='confirm'
            render={({ message }: { message: string }) => (
              <div className='flex justify-center'>
                <p className='text-sm text-red-700'>{message}</p>
              </div>
            )}
          />
        </div>

        <Button
          type='submit'
          variant='secondary'
          className='mb-4'
          isSubmitting={isSubmitting}
        >
          Alterar senha
        </Button>
      </form>
    </Container>
  );
}
