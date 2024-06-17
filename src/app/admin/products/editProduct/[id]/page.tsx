import PathComponent from '@/components/ui/containers/path-component';
import AddProductForm from '@/components/forms/product-form';

import { getProductById } from '@/actions/products';

import type { Products } from '@/components/columns/columns-products-table';

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const product: Products | null = await getProductById(params.id);

  return (
    <div>
      <PathComponent />
      <AddProductForm product={product} />
    </div>
  );
}
