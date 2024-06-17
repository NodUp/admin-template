import { getSession } from '@/actions/session';
import HeaderBar from '@/components/ui/containers/header-bar';
import SideBar from '@/components/ui/containers/side-bar';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggoedIn) {
    redirect('/');
  }

  return (
    <div className='h-screen w-full border'>
      <HeaderBar />
      <div className='flex w-full flex-row'>
        <SideBar />
        <div className='m-4 min-h-[80vh] w-full rounded-lg border bg-white px-4 pb-8 pt-4 shadow-lg'>
          {children}
        </div>
      </div>
    </div>
  );
}
