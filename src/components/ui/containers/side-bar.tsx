'use client';

import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import SideBarGroup from './side-bar-group';
import { FaUsers } from 'react-icons/fa6';
import { FaCartShopping } from 'react-icons/fa6';

const array = [
  {
    href: '/admin/products/productEntry',
    title: 'Entrada',
    page: 'stockEntry',
  },
  {
    href: '/admin/products/productDeparture',
    title: 'Saída',
    page: 'stockDeparture',
  },
];

const SideBar = () => {
  const [activePage, setActivePage] = useState('admin');

  return (
    <div className='m-4 flex h-[50vh] w-[300px] flex-col rounded-lg border bg-white p-2 shadow-lg'>
      <div className='justify-left mb-2 flex flex-col p-1'>
        <SideBarGroup
          href='/admin'
          page='admin'
          activePage={activePage}
          setActivePage={setActivePage}
        >
          <FaHome />
          Página Inicial
        </SideBarGroup>
        <SideBarGroup
          href='/admin/users'
          page='users'
          activePage={activePage}
          setActivePage={setActivePage}
        >
          <FaUsers />
          Usuários
        </SideBarGroup>
        <SideBarGroup
          href='/admin/products'
          page='products'
          activePage={activePage}
          setActivePage={setActivePage}
          collapse={true}
          items={array}
        >
          <FaCartShopping />
          Produtos
        </SideBarGroup>
      </div>
    </div>
  );
};

export default SideBar;
