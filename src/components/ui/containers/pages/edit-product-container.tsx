import PathComponent from '@/components/ui/containers/path-component';
import ProductForm from '@/components/forms/product-form';

import { getProductById } from '@/actions/products';

import type { Products } from '@/components/columns/columns-products-table';

export default async function EditProductContainer({ id }: { id: string }) {
  const product: Products | null = await getProductById(id);

  return (
    <div>
      <PathComponent />
      <ProductForm product={product} />
    </div>
  );
}
