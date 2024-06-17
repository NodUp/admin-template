import { getProductById } from '@/actions/products';
import { getAllMovimentations } from '@/actions/products';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/columns/columns-product-movimentations-table';
import PathComponent from '@/components/ui/containers/path-component';

export default async function ProductListReport({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  const data: any = await getAllMovimentations(params.id);

  return (
    <div className='m-auto flex h-[100%] w-[100%] flex-col'>
      <PathComponent />
      <span className='mx-auto mb-16 text-2xl font-semibold text-sky-800/80'>
        {product ? product.name : ''}
      </span>
      <div className='flex justify-center'>
        <DataTable
          columns={columns}
          data={data}
          addPath=''
          title='Movimentações'
        />
      </div>
    </div>
  );
}
