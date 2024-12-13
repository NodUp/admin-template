import PathComponent from '@/components/ui/containers/path-component';
import ProductForm from '@/components/forms/product-form';

export default async function AddProductPage() {
  return (
    <div>
      <PathComponent />
      <ProductForm product={null} />
    </div>
  );
}
