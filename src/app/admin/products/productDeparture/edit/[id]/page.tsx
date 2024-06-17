import PathComponent from '@/components/ui/containers/path-component';
import AddProductDepartureForm from '@/components/forms/product-departure-form';
import { getDepartureById } from '@/actions/departure';
import { getOnlyProducts } from '@/actions/products';
import { getAllDepartureStatus } from '@/actions/status';

export default async function EditEntry({
  params,
}: {
  params: { id: string };
}) {
  const departure: any = await getDepartureById(params.id);
  const products = await getOnlyProducts();
  const status = await getAllDepartureStatus();

  return (
    <div>
      <PathComponent />
      <AddProductDepartureForm
        departure={departure}
        products={products}
        status={status}
      />
    </div>
  );
}
