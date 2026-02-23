import type { Product } from "@/services/collection/index.service";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const SkeletonCard = () => (
  <div className="bg-maroon/40 backdrop-blur-sm border border-gold/20 rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="w-full h-56 bg-maroon/60" />
    <div className="p-5 flex flex-col gap-3">
      <div className="h-5 bg-maroon/60 rounded w-3/4" />
      <div className="h-3 bg-maroon/60 rounded w-1/2" />
      <div className="h-4 bg-maroon/60 rounded w-full" />
      <div className="flex justify-between mt-3 pt-3 border-t border-white/5">
        <div className="h-6 bg-maroon/60 rounded w-20" />
        <div className="h-7 bg-maroon/60 rounded w-20" />
      </div>
    </div>
  </div>
);

const ProductGrid = ({ products, loading }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-beige/50 text-lg">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
