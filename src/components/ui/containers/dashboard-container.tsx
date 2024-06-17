'use client';

import { Chart } from 'react-google-charts';

export default function DashBoardContainer() {
  const data = [
    ['Element', 'Valor', { role: 'style' }],
    ['Administradores', 15, '#b52133'],
    ['Comuns', 84, 'silver'],
  ];

  return (
    <div className='flex justify-center'>
      <div className='w-[50%]'>
        <Chart
          chartType='ColumnChart'
          width='100%'
          height='400px'
          data={data}
        />
      </div>
    </div>
  );
}
