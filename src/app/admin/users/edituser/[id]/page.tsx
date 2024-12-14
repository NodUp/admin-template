import { LoadingPage } from '@/app/loading';
import UserForm from '@/components/forms/user-form';
import PathComponent from '@/components/ui/containers/path-component';
import { Suspense } from 'react';

import { getAllCities } from '@/actions/cities';
import { getAllRoles } from '@/actions/roles';
import { getAllStates } from '@/actions/states';
import { getAllStatus } from '@/actions/status';
import { findById } from '@/actions/users';

import type { Cities } from '@prisma/client';
type Params = Promise<{ id: string }>;

export default async function EditUserPage(props: { params: Params }) {
  const params = await props.params;

  return (
    <div>
      <Suspense
        fallback={
          <div className='h-[70vh]'>
            <LoadingPage />
          </div>
        }
      >
        <EditUserContainer id={params.id} />
      </Suspense>
    </div>
  );
}

async function EditUserContainer({ id }: { id: string }) {
  const [roles, states, status, user] = await Promise.all([
    getAllRoles(),
    getAllStates(),
    getAllStatus(),
    findById(id),
  ]);

  const cities: Cities[] = await getAllCities(user?.person[0].stateId);

  return (
    <div>
      <PathComponent />
      <UserForm
        user={user}
        roles={roles}
        states={states}
        cities={cities}
        status={status}
        context='admin'
      />
    </div>
  );
}
