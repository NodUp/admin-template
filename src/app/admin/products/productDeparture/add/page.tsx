import PathComponent from '@/components/ui/containers/path-component';
import AddProductDepartureForm from '@/components/forms/product-departure-form';
import { getOnlyProducts } from '@/actions/products';
import { getAllDepartureStatus } from '@/actions/status';

export default async function AddDeparture() {
  const products = await getOnlyProducts();
  const status = await getAllDepartureStatus();

  return (
    <div>
      <PathComponent />
      <AddProductDepartureForm
        departure={null}
        products={products}
        status={status}
      />
    </div>
  );
}
