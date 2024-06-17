'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input/index';
import { Container } from '../ui/containers/content-container';
import { GridContainer } from '../ui/containers/grid-container';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { loginWeb } from '@/actions/session';
import { useToast } from '../ui/use-toast';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'E-mail: campo obrigatório !' })
    .email('E-mail: formato inválido'),
  password: z.string().min(6, { message: 'Senha: campo obrigatório !' }),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    const isErrorLogin = await loginWeb(data);

    if (isErrorLogin) {
      toast({
        title: 'Erro',
        description: isErrorLogin.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <Container className='w-[400px]'>
      <Image
        className='mx-auto'
        src='/logo.jpeg'
        width='200'
        height='100'
        alt='logo'
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer className='mb-8'>
          <Label className=''>Login:</Label>

          <Input
            register={register}
            name='email'
            errors={errors}
            placeholder='Email'
            variant='email'
          />

          <Label className=''>Senha:</Label>

          <Input
            register={register}
            name='password'
            errors={errors}
            placeholder='Senha'
            variant='password'
          />
        </GridContainer>

        <Button
          type='submit'
          isSubmitting={isSubmitting}
          variant='secondary'
          className='mb-4'
        >
          Logar
        </Button>
      </form>
    </Container>
  );
}
