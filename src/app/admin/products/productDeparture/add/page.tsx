import { getOnlyProducts } from '@/actions/products';
import { getAllDepartureStatus } from '@/actions/status';
import { LoadingPage } from '@/app/loading';
import AddProductDepartureForm from '@/components/forms/product-departure-form';
import PathComponent from '@/components/ui/containers/path-component';
import { Suspense } from 'react';

export default function AddDeparturePage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AddDepartureContainer />
    </Suspense>
  );
}

async function AddDepartureContainer() {
  const [products, status] = await Promise.all([
    getOnlyProducts(),
    getAllDepartureStatus(),
  ]);

  return (
    <div>
      <PathComponent />
      <AddProductDepartureForm
        departure={null}
        products={products}
        status={status}
      />
    </div>
  );
}
