import { DataTable } from '@/components/ui/data-table';
import {
  Users as UserType,
  columns,
} from '@/components/columns/columns-user-table';
import { findAllusers } from '@/actions/users';
import PathComponent from '@/components/ui/containers/path-component';

export default async function Users() {
  const data: UserType[] = await findAllusers();

  return (
    <div>
      <PathComponent />

      <div className='mt-4 flex justify-center'>
        <DataTable
          columns={columns}
          data={data}
          addPath='/admin/users/adduser'
          title='Usuários'
        />
      </div>
    </div>
  );
}
