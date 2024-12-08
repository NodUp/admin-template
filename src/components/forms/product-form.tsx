'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input/index';
import { Container } from '@/components/ui/containers/content-container';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { addProduct } from '@/actions/products';
import { editProduct } from '@/actions/products';
import { useMyToast } from '@/components/ui/use-toast';

import type { Products } from '@/components/columns/columns-products-table';

import * as z from 'zod';

const schema = z.object({
  name: z.string({
    required_error: 'Nome: campo obrigatório !',
    invalid_type_error: 'Nome: campo obrigatório !',
  }),
});

type Props = {
  product: Products | null;
};

export default function ProductForm({ product }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product ? product.name : null,
    },
  });

  const { save } = useSave();

  const onSubmit = async (data: any) => {
    await save(product, data);
    reset();
  };

  return (
    <Container className='mt-16 w-[500px]'>
      <div className='mb-8 flex border-b-2 p-2'>
        <Label variant='title' className='mx-auto mb-4'>
          {product ? 'Atualizar' : 'Cadastrar'} Produto
        </Label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridContainer className='mb-8'>
          <Label className=''>Nome:</Label>

          <Input
            register={register}
            name='name'
            errors={errors}
            placeholder='Nome'
          />
        </GridContainer>

        <Button
          type='submit'
          variant='secondary'
          className='mb-4'
          isSubmitting={isSubmitting}
        >
          {product ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </form>
    </Container>
  );
}

export function useSave() {
  const { sucessMessage, errorMessage } = useMyToast();

  const save = async (obj: any, data: any) => {
    if (!obj) {
      const { success } = await addProduct(data);
      success
        ? sucessMessage('Usuário cadastrado!')
        : errorMessage('Erro ao efetuar o cadastro');
    } else {
      const { success: editSuccess } = await editProduct({
        id: obj.id,
        name: data.name,
      });
      editSuccess
        ? sucessMessage('Usuário editado!')
        : errorMessage('Erro ao efetuar a edição');
    }
  };

  return { save };
}
