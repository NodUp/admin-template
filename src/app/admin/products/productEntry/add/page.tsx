import { getOnlyProducts } from '@/actions/products';
import { getAllEntriesStatus } from '@/actions/status';
import { LoadingPage } from '@/app/loading';
import AddProductEntryForm from '@/components/forms/product-entry-form';
import PathComponent from '@/components/ui/containers/path-component';
import { Suspense } from 'react';

export default function AddProductPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AddProductContainer />
    </Suspense>
  );
}

async function AddProductContainer() {
  const [products, status] = await Promise.all([
    getOnlyProducts(),
    getAllEntriesStatus(),
  ]);

  return (
    <>
      <PathComponent />
      <AddProductEntryForm entry={null} products={products} status={status} />
    </>
  );
}
