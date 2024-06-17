import UserForm from '@/components/forms/user-form';
import PathComponent from '@/components/ui/containers/path-component';

import { getAllRoles } from '@/actions/roles';
import { findById } from '@/actions/users';
import { getAllStates } from '@/actions/states';
import { getAllCities } from '@/actions/cities';
import { getAllStatus } from '@/actions/status';

import type { User } from '@/components/forms/user-form';
import type { Roles } from '@/actions/roles';
import type { Status } from '@/actions/status';
import type { States } from '@prisma/client';
import type { Cities } from '@prisma/client';

export default async function EditUser({ params }: { params: { id: string } }) {
  const user: User = await findById(params.id);
  const roles: Roles[] = await getAllRoles();
  const states: States[] = await getAllStates();
  const cities: Cities[] = await getAllCities(user?.person[0].stateId);
  const status: Status[] = await getAllStatus();

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
