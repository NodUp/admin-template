import EditUserContainer from '@/components/ui/containers/pages/edit-user-container';
import LoadingPage from '@/app/loading';
import { Suspense } from 'react';

export default async function EditUser({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<LoadingPage />}>
        <EditUserContainer id={params.id} />
      </Suspense>
    </div>
  );
}
