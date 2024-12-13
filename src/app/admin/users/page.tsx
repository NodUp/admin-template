import { findAllusers } from '@/actions/users';
import { LoadingPage } from '@/app/loading';
import {
  Users as UserType,
  columns,
} from '@/components/columns/columns-user-table';
import PathComponent from '@/components/ui/containers/path-component';
import { DataTable } from '@/components/ui/data-table';
import { Suspense } from 'react';

export default function UsersPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ListUserContainer />
    </Suspense>
  );
}

async function ListUserContainer() {
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
