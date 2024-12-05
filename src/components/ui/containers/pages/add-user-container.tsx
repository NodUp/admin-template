import UserForm from '@/components/forms/user-form';
import PathComponent from '@/components/ui/containers/path-component';

import { getAllRoles } from '@/actions/roles';
import { getAllStates } from '@/actions/states';
import { getAllStatus } from '@/actions/status';

export default async function AddUserContainer() {
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
