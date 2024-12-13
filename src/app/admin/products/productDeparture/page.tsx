import { getDeparturies } from '@/actions/departure';
import { LoadingPage } from '@/app/loading';
import { columns } from '@/components/columns/columns-product-departure-table';
import PathComponent from '@/components/ui/containers/path-component';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';

export default function ProductDeparturiesPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ProductDeparturiesContainer />
    </Suspense>
  );
}

async function ProductDeparturiesContainer() {
  const departuries = await getDeparturies();

  return (
    <div>
      <PathComponent />

      <div className='mt-4 flex justify-center'>
        <DataTable
          columns={columns}
          data={departuries}
          addPath='/admin/products/productDeparture/add'
          title='Saídas do Estoque'
        />
      </div>
    </div>
  );
}
