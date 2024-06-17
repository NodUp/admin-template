import UserForm from '@/components/forms/user-form';
import PathComponent from '@/components/ui/containers/path-component';
import { getAllRoles } from '@/actions/roles';
import { getAllStates } from '@/actions/states';
import { getAllStatus } from '@/actions/status';

import type { Roles } from '@/actions/roles';
import type { Status } from '@/actions/status';
import type { States } from '@prisma/client';

export default async function AddUser() {
  const roles: Roles[] = await getAllRoles();
  const states: States[] = await getAllStates();
  const status: Status[] = await getAllStatus();

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
