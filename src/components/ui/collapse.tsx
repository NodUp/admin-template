'use client';

import React, { useState } from 'react';
import ExpandUpIcon from '@/assets/icons/expand-up-icon';
import ExpandDownIcon from '@/assets/icons/expand-down-icon';
import UsersIcon from '@/assets/icons/users-icon';
import Link from 'next/link';
import ItemListIcon from '@/assets/icons/item-list-icon';

type Props = {
  items: any;
  title: string;
  icon?: string;
  index: number;
  indexCollapse: number;
  setIndexCollapse: any;
  hrefTitle: string;
};

function Collapse({
  items,
  title,
  icon,
  index,
  indexCollapse,
  setIndexCollapse,
  hrefTitle,
}: Props) {
  const [open, setOpen] = useState(false);
  const [indexColor, setIndexColor] = useState(0);

  return (
    <div className='mb-4 w-full'>
      <div className='flex w-full flex-row justify-between border-b-2 border-orange-300 shadow-sm'>
        <div className='flex flex-row gap-1 p-1'>
          <div>
            <Link
              onClick={() => {
                setIndexColor(999);
                setIndexCollapse(index);
              }}
              className={`flex flex-row items-center justify-center gap-1 hover:text-sky-800 ${indexColor === 999 && indexCollapse === index ? 'font-semibold text-sky-800' : ''}`}
              href={hrefTitle}
            >
              {icon === 'person' ? (
                <div className='mr-3'>
                  <UsersIcon />
                </div>
              ) : null}
              <span>{title}</span>
            </Link>
          </div>
        </div>
        <div
          onClick={() => {
            setOpen(!open);
            setIndexCollapse(0);
          }}
          className='flex cursor-pointer items-center p-1'
        >
          {open ? <ExpandDownIcon /> : <ExpandUpIcon />}
        </div>
      </div>
      <div className='ml-2 mt-2'>
        {open ? (
          <div>
            {items.map((a: any, i: any) => (
              <Link
                onClick={() => {
                  setIndexColor(i + 1);
                  setIndexCollapse(index);
                }}
                key={i}
                className={`mb-1 mt-1 flex flex-row hover:text-sky-800 ${indexColor === i + 1 && indexCollapse === index ? 'font-semibold text-sky-800' : ''}`}
                href={a.href}
              >
                <div className='flex flex-row items-center justify-center gap-4'>
                  <ItemListIcon />
                  <span>{a.title}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Collapse;
