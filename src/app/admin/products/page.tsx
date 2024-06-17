import { DataTable } from '@/components/ui/data-table';
import PathComponent from '@/components/ui/containers/path-component';
import {
  Products as ProductType,
  columns,
} from '@/components/columns/columns-products-table';
import { getProducts } from '@/actions/products';

export default async function Products() {
  const data: ProductType[] = await getProducts();

  return (
    <div>
      <PathComponent />

      <div className='mt-4 flex justify-center'>
        <DataTable
          columns={columns}
          data={data}
          addPath='/admin/products/addProduct'
          title='Produtos'
        />
      </div>
    </div>
  );
}
