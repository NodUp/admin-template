import DashBoardContainer from '@/components/ui/containers/dashboard-container';

export default async function DashBoard() {
  return (
    <div className=''>
      <div className='flex justify-center border'>
        <span className='text-2xl font-semibold text-sky-800/80'>
          Mês de {new Date().toLocaleString('default', { month: 'long' })}
        </span>
      </div>
      <DashBoardContainer />
    </div>
  );
}
