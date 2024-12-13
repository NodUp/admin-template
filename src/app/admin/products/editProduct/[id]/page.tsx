import { LoadingPage } from '@/app/loading';
import ProductForm from '@/components/forms/product-form';
import PathComponent from '@/components/ui/containers/path-component';
import { Suspense } from 'react';

import { getProductById } from '@/actions/products';

import type { Products } from '@/components/columns/columns-products-table';

type Params = Promise<{ id: string }>;

export default async function EditProductPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <Suspense fallback={<LoadingPage />}>
      <EditProductContainer id={params.id} />
    </Suspense>
  );
}

async function EditProductContainer({ id }: { id: string }) {
  const product: Products | null = await getProductById(id);

  return (
    <div>
      <PathComponent />
      <ProductForm product={product} />
    </div>
  );
}
