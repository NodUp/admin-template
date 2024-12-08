import LoadingPage from '@/app/loading';
import { Suspense } from 'react';
import ListProductsContainer from '@/components/ui/containers/pages/list-product-container';

export default async function ProductsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ListProductsContainer />
    </Suspense>
  );
}
