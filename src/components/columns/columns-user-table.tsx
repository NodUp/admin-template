'use client';

import EditIcon from '@/assets/icons/edit-icon';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/users';

export type Users = {
  id: string;
  name: string;
  email: string;
  status: 'ativo' | 'pendente';
  person: any;
  role: any;
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    enableGlobalFilter: true,
    accessorFn: (row) => {
      return row.person[0].name;
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableGlobalFilter: true,
    accessorFn: (row) => {
      return row.status.toString();
    },
  },
  {
    accessorKey: 'role',
    header: 'Tipo',
    enableGlobalFilter: true,
    accessorFn: (row) => {
      return row.role;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();

      const onDelete = () => {
        const { id }: any = row.original;
        deleteUser(id);
      };

      const onEdit = () => {
        router.push(`/admin/users/edituser/${row.original.id}`);
      };

      return (
        <div className='flex justify-center gap-2'>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0'
            onClick={() => onEdit()}
          >
            <EditIcon />
          </Button>

          <Alert
            title='Deseja excluir esse usuário?'
            text='A operação não poderá ser desfeita'
            type='delete'
            onDelete={onDelete}
          />
        </div>
      );
    },
  },
];
