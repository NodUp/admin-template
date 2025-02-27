import { getEntryById } from '@/actions/entry';
import { getOnlyProducts } from '@/actions/products';
import { getAllEntriesStatus } from '@/actions/status';
import { LoadingPage } from '@/app/loading';
import AddProductEntryForm from '@/components/forms/product-entry-form';
import PathComponent from '@/components/ui/containers/path-component';
import { Suspense } from 'react';

type Params = Promise<{ id: string }>;

export default async function EditEntryPage(props: { params: Params }) {
  const params = await props.params;
  return (
    <Suspense fallback={<LoadingPage />}>
      <EditEntryContainer id={params.id} />
    </Suspense>
  );
}

async function EditEntryContainer({ id }: { id: string }) {
  const [entry, products, status] = await Promise.all([
    getEntryById(id),
    getOnlyProducts(),
    getAllEntriesStatus(),
  ]);

  return (
    <div>
      <PathComponent />
      <AddProductEntryForm entry={entry} products={products} status={status} />
    </div>
  );
}
