import { ColorIcons } from '@/lib/utils';

function ItemListIcon() {
  return (
    <svg
      width='11px'
      height='11px'
      viewBox='-2 -3.5 24 24'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMinYMin'
      className='jam jam-rectangle-f'
      fill={ColorIcons()}
    >
      <path d='M3 .565h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-10a3 3 0 0 1 3-3z' />
    </svg>
  );
}

export default ItemListIcon;
