'use client';

import BackIcon from '@/assets/icons/back';
import { useRouter } from 'next/navigation';
import { Button } from '../button';

function PathComponent() {
  const router = useRouter();

  return (
    <div className='flex flex-row items-center justify-between'>
      <div className='flex flex-row items-center gap-2'></div>
      <div>
        <Button
          variant='secondary'
          className='flex flex-row items-center justify-start'
          onClick={() => router.back()}
        >
          <BackIcon />
          <span className='ml-2'>Voltar</span>
        </Button>
      </div>
    </div>
  );
}

export default PathComponent;
