import { Suspense } from 'react';
import AddUserContainer from '@/components/ui/containers/pages/add-user-container';
import LoadingPage from '@/app/loading';

export default function AddUser() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AddUserContainer />
    </Suspense>
  );
}
