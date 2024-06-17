/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Container } from '@/components/ui/containers/content-container';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { GridContainer } from '@/components/ui/containers/grid-container';
import { Input } from '@/components/ui/input/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SelectInput } from '@/components/ui/select/select';
import { DatePicker } from '@/components/ui/data-picker';
import { addDeparture } from '@/actions/departure';
import { useToast } from '@/components/ui/use-toast';
import { updateDeparture } from '@/actions/departure';

import * as z from 'zod';

const schema = z.object({
  productId: z
    .string({
      required_error: 'Produto: campo obrigatório !',
    })
    .min(1, { message: 'Produto: campo obrigatório !' }),
  departureDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date'
          ? 'Data de Saída: campo obrigatório !'
          : defaultError,
    }),
  }),
  client: z.string().min(1, { message: 'Cliente: campo obrigatório !' }),
  invoice: z.string().optional(),
  product_value: z
    .string({
      required_error: 'Valor: campo obrigatório !',
    })
    .min(1, { message: 'Valor: campo obrigatório !' }),
  qtd: z.string().min(1, { message: 'Qtd: campo obrigatório !' }),
  status: z
    .string({
      required_error: 'Status: campo obrigatório !',
    })
    .min(1, { message: 'Status: campo obrigatório !' }),
});

type Props = {
  departure: any;
  products: any;
  status: any;
};

function AddProductDepartureForm({ departure, products, status }: Props) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      status: departure ? departure.status : '',
      qtd: departure ? departure.qtd : '',
      invoice: departure ? departure.invoice : '',
      client: departure ? departure.client : '',
      product_value: departure ? (departure.value * 100).toString() : '',
      productId: departure ? departure.product.id : '',
      departureDate: departure ? departure.departureDate : '',
    },
  });

  const clear = () => {
    reset();
    setValue('qtd', '');
    setValue('productId', '');
    setValue('status', '');
  };

  const onSubmit = async (data: any) => {
    if (!(data.product_value && data.product_value.includes('R'))) {
      data.product_value = (data.product_value / 1000).toString();
    }

    const productValue =
      parseFloat(data.product_value.replace(/R\$\s/g, '').replace(',', '.')) *
      10;

    const qtdProduct = parseFloat(data.qtd.trim());

    const total = productValue * qtdProduct;
    let result = null;

    if (departure) {
      result = await updateDeparture(
        {
          ...data,
          product_value: productValue,
          qtd: qtdProduct,
          total: total,
        },
        departure.id
      );
    } else {
      result = await addDeparture({
        ...data,
        product_value: productValue,
        qtd: qtdProduct,
        total: total,
      });
      clear();
    }

    if (!result) {
      toast({
        title: 'Sucesso !',
        description: 'Dados cadastrados.',
        variant: 'constructive',
      });
    } else {
      toast({
        title: 'Erro !',
        description: 'Qtd Inválida.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Container className='mt-16 w-[500px]'>
      <div className='mb-4 flex border-b-2 p-2'>
        <Label variant='title' className='mx-auto mb-4'>
          Saída de Produtos do Estoque
        </Label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Label variant='subtitle'>Dados Gerais</Label>

        <GridContainer className='mb-8 mt-4'>
          <Label className=''>Produto:</Label>

          <SelectInput
            errors={errors}
            control={control}
            name='productId'
            items={products}
          />

          <Label className=''>Data de Saída:</Label>

          <DatePicker errors={errors} control={control} name='departureDate' />

          <Label className=''>Cliente:</Label>

          <Input
            register={register}
            name='client'
            errors={errors}
            placeholder='Nome'
          />

          <Label className=''>Nota Fiscal:</Label>

          <Input
            register={register}
            name='invoice'
            errors={errors}
            placeholder='Nota Fiscal'
          />

          <Label className=''>Valor:</Label>

          <Input
            control={control}
            register={register}
            name='product_value'
            errors={errors}
            placeholder='Valor unitário'
            variant='currency'
            setValue={setValue}
          />

          <Label className=''>Qtd:</Label>

          <Input
            register={register}
            control={control}
            name='qtd'
            errors={errors}
            placeholder='Quantidade'
            variant='mask'
            mask='99999999'
          />

          <Label className=''>Status:</Label>

          <SelectInput
            errors={errors}
            control={control}
            name='status'
            items={status}
          />
        </GridContainer>

        <Button
          type='submit'
          variant='secondary'
          className='mb-4'
          isSubmitting={isSubmitting}
        >
          {departure ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </form>
    </Container>
  );
}

export default AddProductDepartureForm;
