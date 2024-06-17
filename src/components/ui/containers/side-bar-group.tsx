import React, { useState } from 'react';
import Link from 'next/link';
import { MdOutlineExpandLess } from 'react-icons/md';
import { MdOutlineExpandMore } from 'react-icons/md';
import { BsDashLg } from 'react-icons/bs';

type Props = {
  href: string;
  page: string;
  activePage: string;
  setActivePage: any;
  children: any;
  collapse?: boolean;
  items?: any;
};

function SideBarGroup({
  href,
  page,
  activePage,
  setActivePage,
  children,
  collapse,
  items,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!collapse ? (
        <div className='my-1'>
          <Link
            onClick={() => {
              setActivePage(page);
            }}
            className={`flex flex-row items-center gap-2 hover:text-sky-800 ${page === activePage ? 'font-semibold text-sky-800' : ''}`}
            href={href}
          >
            {children}
          </Link>
        </div>
      ) : (
        <>
          <div className='my-1 flex flex-row items-center'>
            <Link
              onClick={() => {
                setActivePage(page);
              }}
              className={`w-full hover:text-sky-800 ${page === activePage ? 'font-semibold text-sky-800' : ''}`}
              href={href}
            >
              <div className='flex flex-row items-center gap-2'>{children}</div>
            </Link>
            <div
              onClick={() => {
                setOpen(!open);
              }}
              className={`${page === activePage ? 'font-semibold text-sky-800' : ''} cursor-pointer`}
            >
              {!open ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
            </div>
          </div>
          {open ? (
            <div>
              {items.map((a: any, i: any) => (
                <Link
                  onClick={() => {
                    setActivePage(a.page);
                  }}
                  key={i}
                  href={a.href}
                  className={`ml-2 flex flex-row items-center gap-2 hover:text-sky-800 ${a.page === activePage ? 'font-semibold text-sky-800' : ''}`}
                >
                  <BsDashLg />
                  {a.title}
                </Link>
              ))}
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default SideBarGroup;
