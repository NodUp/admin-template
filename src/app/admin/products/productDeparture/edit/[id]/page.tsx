import { getDepartureById } from '@/actions/departure';
import { getOnlyProducts } from '@/actions/products';
import { getAllDepartureStatus } from '@/actions/status';
import { LoadingPage } from '@/app/loading';
import AddProductDepartureForm from '@/components/forms/product-departure-form';
import PathComponent from '@/components/ui/containers/path-component';
import { Suspense } from 'react';

export default async function EditEntryPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <EditEntryContainer id={params.id} />
    </Suspense>
  );
}

async function EditEntryContainer({ id }: { id: string }) {
  const [departure, products, status] = await Promise.all([
    getDepartureById(id),
    getOnlyProducts(),
    getAllDepartureStatus(),
  ]);

  return (
    <div>
      <PathComponent />
      <AddProductDepartureForm
        departure={departure}
        products={products}
        status={status}
      />
    </div>
  );
}
