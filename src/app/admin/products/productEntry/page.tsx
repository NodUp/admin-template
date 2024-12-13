'use server';

import { getEntries } from '@/actions/entry';
import { LoadingPage } from '@/app/loading';
import { columns } from '@/components/columns/columns-product-entries-table';
import PathComponent from '@/components/ui/containers/path-component';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';

export default async function ProductEntriesPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ProductEntriesContainer />
    </Suspense>
  );
}

async function ProductEntriesContainer() {
  const entries = await getEntries();

  return (
    <>
      <PathComponent />
      <div className='mt-4 flex justify-center'>
        <DataTable
          columns={columns}
          data={entries}
          addPath='/admin/products/productEntry/add'
          title='Entradas no Estoque'
        />
      </div>
    </>
  );
}
