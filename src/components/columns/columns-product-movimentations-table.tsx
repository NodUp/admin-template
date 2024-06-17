'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Products = {
  tipo?: string;
  updateAt?: string;
  qtd: string;
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'updateAt',
    header: 'Data',
    enableGlobalFilter: true,
    accessorFn: (row) => {
      return new Date(row.updateAt ? row.updateAt : '')
        .toLocaleString('default')
        .toString();
    },
  },
  {
    accessorKey: 'qtd',
    header: 'Quantidade',
    enableGlobalFilter: true,
  },
];
