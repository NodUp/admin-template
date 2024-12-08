import LoadingPage from '@/app/loading';
import { Suspense } from 'react';
import EditProductContainer from '@/components/ui/containers/pages/edit-product-container';

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <EditProductContainer id={params.id} />
    </Suspense>
  );
}
