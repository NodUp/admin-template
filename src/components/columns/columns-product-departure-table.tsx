'use client';

import EditIcon from '@/assets/icons/edit-icon';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Alert } from '@/components/ui/alert';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { deleteDeparture } from '@/actions/departure';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => {
      return (
        <>
          <div>
            <span>{row.original.product.name}</span>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'departureDate',
    header: 'Saída',
    cell: ({ row }) => {
      const formatoBrasileiro = 'dd/MM/yyyy';
      const dataFormatada = format(
        row.original.departureDate,
        formatoBrasileiro,
        { locale: ptBR }
      );

      return (
        <>
          <div>
            <span>{dataFormatada.toString()}</span>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'client',
    header: 'Cliente',
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: ({ row }) => {
      return (
        <>
          <div>
            <span>R$ {row.original.value}</span>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: 'qtd',
    header: 'Quantidade',
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      return (
        <>
          <div>
            <span>R$ {row.original.total}</span>
          </div>
        </>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

      const onDelete = () => {
        const { id }: any = row.original;
        deleteDeparture(id);
      };

      const onEdit = () => {
        router.push(`/admin/products/productDeparture/edit/${row.original.id}`);
      };

      return (
        <>
          <div className='flex justify-center gap-2'>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
              onClick={() => onEdit()}
            >
              <EditIcon />
            </Button>

            <Alert
              title='Deseja excluir essa entrada?'
              text='A operação não poderá ser desfeita'
              type='delete'
              onDelete={onDelete}
            />
          </div>
        </>
      );
    },
  },
];
