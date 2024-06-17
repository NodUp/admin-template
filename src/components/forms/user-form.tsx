'use client';

import { useState } from 'react';

import { Container } from '@/components/ui/containers/content-container';
import { Label } from '@/components/ui/label';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { Input } from '@/components/ui/input/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectInput } from '@/components/ui/select/select';
import { addUser } from '@/actions/users';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { editUser } from '@/actions/users';
import { getAllCities } from '@/actions/cities';
import { FormHeader } from '@/components/ui/containers/form-header';

import * as z from 'zod';

import type { Roles } from '@/actions/roles';
import type { Status } from '@/actions/status';
import type { States } from '@prisma/client';
import type { Cities } from '@prisma/client';

const createSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome: campo obrigatório !' }),
    email: z
      .string()
      .min(1, { message: 'E-mail: campo obrigatório !' })
      .email('E-mail: formato inválido'),
    password: z.string().min(6, { message: 'Senha: campo obrigatório !' }),
    confirm_password: z
      .string()
      .min(6, { message: 'Senha: campo obrigatório !' }),
    role: z.string().optional(),
    stateId: z.string().min(1, { message: 'Estado: campo obrigatório !' }),
    cityId: z.string().min(1, { message: 'Cidade: campo obrigatório !' }),
    status: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas devem ser iguais !',
    path: ['confirm_password'],
  });

const updateSchema = z.object({
  name: z.string().min(1, { message: 'Nome: campo obrigatório !' }),
  email: z
    .string()
    .min(1, { message: 'E-mail: campo obrigatório !' })
    .email('E-mail: formato inválido'),
  role: z.string().optional(),
  stateId: z.string().min(1, { message: 'Estado: campo obrigatório !' }),
  cityId: z.string().min(1, { message: 'Cidade: campo obrigatório !' }),
  status: z.string().optional(),
});

type Person = {
  name: string;
  stateId: string;
  cityId: string;
};

export type User = {
  id: string;
  email: string;
  role: string;
  status: string;
  person: Person[];
};

type Props = {
  user: User | null;
  roles: Roles[];
  states: States[];
  cities: Cities[];
  status: Status[];
  context: string;
};

function UserForm({ user, roles, states, cities, status, context }: Props) {
  const [citiesList, setCitieslist] = useState(cities);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(user ? updateSchema : createSchema),
    defaultValues: {
      name: user ? user.person[0].name : '',
      email: user ? user.email : '',
      role: user ? user.role : '',
      stateId: user ? user.person[0].stateId : '',
      cityId: user ? user.person[0].cityId : '',
      status: user ? user.status : '',
    },
  });
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    if (!user) {
      addUser({
        ...data,
        status: context === 'admin' ? 'ATIVO' : 'PENDENTE',
      });
      reset();
    } else {
      await editUser(user.id, data);
    }

    toast({
      title: 'Sucesso !',
      description: 'Operação realizada!',
      variant: 'constructive',
    });
  };

  const loadCities = async (stateId: string) => {
    const cities: any = await getAllCities(stateId);
    setCitieslist(cities);
  };

  return (
    <Container className='w-[500px]'>
      <FormHeader title={`${user ? 'Alteração' : 'Cadastro'} de Usuário`} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label variant='subtitle'>Dados Pessoais</Label>

        <GridContainer className='mb-8 mt-4'>
          <Label className=''>Nome:</Label>

          <Input
            register={register}
            name='name'
            errors={errors}
            placeholder='Nome'
          />

          <Label className=''>Login:</Label>

          <Input
            register={register}
            name='email'
            errors={errors}
            placeholder='Email'
            variant='email'
          />

          {context === 'admin' ? (
            <>
              <Label className=''>Tipo:</Label>

              <SelectInput
                errors={errors}
                control={control}
                name='role'
                items={roles}
              />
            </>
          ) : null}

          <Label className=''>Estado:</Label>

          <SelectInput
            errors={errors}
            control={control}
            name='stateId'
            items={states}
            func={loadCities}
          />

          <Label className=''>Cidade:</Label>

          <SelectInput
            disabled={citiesList && citiesList.length > 1 ? false : true}
            errors={errors}
            control={control}
            name='cityId'
            items={citiesList}
          />

          {user ? (
            <>
              <Label className=''>Status:</Label>

              <SelectInput
                errors={errors}
                control={control}
                name='status'
                items={status}
              />
            </>
          ) : null}

          {!user ? (
            <>
              <Label className=''>Senha:</Label>

              <Input
                register={register}
                name='password'
                errors={errors}
                placeholder='Senha'
                variant='password'
              />

              <Label className=''>Senha:</Label>

              <Input
                register={register}
                name='confirm_password'
                errors={errors}
                placeholder='Senha'
                variant='password'
              />
            </>
          ) : null}
        </GridContainer>

        <Button
          type='submit'
          variant='secondary'
          className='mb-4'
          isSubmitting={isSubmitting}
        >
          {user ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </form>
    </Container>
  );
}

export default UserForm;
