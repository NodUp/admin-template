import { getProducts } from '@/actions/products';
import { LoadingPage } from '@/app/loading';
import PathComponent from '@/components/ui/containers/path-component';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';

import {
  Products as ProductType,
  columns,
} from '@/components/columns/columns-products-table';

export default async function ProductsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ListProductsContainer />
    </Suspense>
  );
}

async function ListProductsContainer() {
  const data: ProductType[] = await getProducts();

  return (
    <div>
      <PathComponent />

      <div className='mt-4 flex justify-center'>
        <DataTable
          columns={columns}
          data={data}
          addPath='/admin/products/addProduct'
          title='Produtos'
        />
      </div>
    </div>
  );
}
