import { Suspense } from 'react';
import ListUserContainer from '@/components/ui/containers/pages/list-user-container';
import LoadingPage from '@/app/loading';

export default async function UsersPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ListUserContainer />
    </Suspense>
  );
}
