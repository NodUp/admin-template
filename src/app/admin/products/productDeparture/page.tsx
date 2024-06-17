import { DataTable } from '@/components/ui/data-table';
import PathComponent from '@/components/ui/containers/path-component';
import { columns } from '@/components/columns/columns-product-departure-table';
import { getDeparturies } from '@/actions/departure';

export default async function ProductDeparturies() {
  const departuries = await getDeparturies();

  return (
    <div>
      <PathComponent />

      <div className='mt-4 flex justify-center'>
        <DataTable
          columns={columns}
          data={departuries}
          addPath='/admin/products/productDeparture/add'
          title='Saídas do Estoque'
        />
      </div>
    </div>
  );
}
