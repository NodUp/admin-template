import { LoadingPage } from '@/app/loading';

import { Suspense } from 'react';

import UserForm from '@/components/forms/user-form';
import PathComponent from '@/components/ui/containers/path-component';

import { getAllRoles } from '@/actions/roles';
import { getAllStates } from '@/actions/states';
import { getAllStatus } from '@/actions/status';

export default function AddUserPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <AddUserContainer />
    </Suspense>
  );
}

async function AddUserContainer() {
  const [roles, states, status] = await Promise.all([
    getAllRoles(),
    getAllStates(),
    getAllStatus(),
  ]);

  return (
    <div>
      <PathComponent />
      <UserForm
        user={null}
        roles={roles}
        states={states}
        cities={[]}
        status={status}
        context='admin'
      />
    </div>
  );
}
