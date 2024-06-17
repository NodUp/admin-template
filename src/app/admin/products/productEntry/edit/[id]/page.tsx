import PathComponent from '@/components/ui/containers/path-component';
import AddProductEntryForm from '@/components/forms/product-entry-form';
import { getEntryById } from '@/actions/entry';
import { getOnlyProducts } from '@/actions/products';
import { getAllEntriesStatus } from '@/actions/status';

export default async function EditEntry({
  params,
}: {
  params: { id: string };
}) {
  const entry: any = await getEntryById(params.id);
  const products = await getOnlyProducts();
  const status = await getAllEntriesStatus();

  return (
    <div>
      <PathComponent />
      <AddProductEntryForm entry={entry} products={products} status={status} />
    </div>
  );
}
