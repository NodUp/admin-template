'use client';

import { changePassword } from '@/actions/users';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/containers/content-container';
import { FormHeader } from '@/components/ui/containers/form-header';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { Input } from '@/components/ui/input/index';
import { Label } from '@/components/ui/label';
import { useMyToast } from '@/components/ui/use-toast';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

  const { save } = useSave();

  const onSubmit = async (data: any) => {
    await save(userId, data.password);
    reset();
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

// lógica do componente

export function useSave() {
  const { sucessMessage, errorMessage } = useMyToast();

  const save = async (userId: any, password: string) => {
    const { success } = await changePassword(userId ? userId : '', password);
    success
      ? sucessMessage('Senha atualizada!')
      : errorMessage('Erro ao salvar os dados!');
  };

  return { save };
}
