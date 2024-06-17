import PathComponent from '@/components/ui/containers/path-component';
import AddProductEntryForm from '@/components/forms/product-entry-form';
import { getOnlyProducts } from '@/actions/products';
import { getAllEntriesStatus } from '@/actions/status';

export default async function AddProduct() {
  const products = await getOnlyProducts();
  const status = await getAllEntriesStatus();

  return (
    <div>
      <PathComponent />
      <AddProductEntryForm entry={null} products={products} status={status} />
    </div>
  );
}
