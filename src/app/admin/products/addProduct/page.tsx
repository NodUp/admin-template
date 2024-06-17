import PathComponent from '@/components/ui/containers/path-component';
import AddProductForm from '@/components/forms/product-form';

export default async function AddProduct() {
  return (
    <div>
      <PathComponent />
      <AddProductForm product={null} />
    </div>
  );
}
