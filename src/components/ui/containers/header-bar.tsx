import React from 'react';

import Avatar from '@/assets/avatar';
import Image from 'next/image';
import { logout } from '@/actions/session';
import { getSession } from '@/actions/session';
import { SessionData } from '@/lib/session';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const HeaderBar = async () => {
  const session: SessionData = await getSession();

  return (
    <div className='flex h-[100px] w-full flex-row items-center justify-between border bg-white shadow-lg'>
      <div className='flex w-[300px] items-center justify-center'>
        <Image
          src={session.logo ? session.logo : ''}
          width={100}
          height={100}
          alt='logo'
        />
      </div>
      <div className='flex w-[300px] items-center justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger className='p-2 outline-none'>
            <span className='h-[80px] w-[30px]'>
              <Avatar />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <span>Minha Conta</span>
              <div className='text-sky-800/80'>{session.name}</div>
              <div className='text-sky-800/80'>{session.email}</div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <Link href='/admin/users/profile'>
              <DropdownMenuItem className='cursor-pointer'>
                Meu Perfil
              </DropdownMenuItem>
            </Link>
            <Link href='/admin/users/changepassword'>
              <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                Alterar senha
              </DropdownMenuItem>
            </Link>
            <form
              action={logout}
              className='mb-1 cursor-pointer rounded-sm p-1 hover:bg-slate-100'
            >
              <button
                className='ml-2 mt-1 flex w-full items-center text-sm'
                type='submit'
              >
                Sair
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeaderBar;
