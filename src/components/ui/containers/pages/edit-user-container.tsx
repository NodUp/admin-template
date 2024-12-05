import UserForm from '@/components/forms/user-form';
import PathComponent from '@/components/ui/containers/path-component';

import { getAllRoles } from '@/actions/roles';
import { findById } from '@/actions/users';
import { getAllStates } from '@/actions/states';
import { getAllCities } from '@/actions/cities';
import { getAllStatus } from '@/actions/status';

import type { Cities } from '@prisma/client';

export default async function EditUserContainer({ id }: { id: string }) {
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
