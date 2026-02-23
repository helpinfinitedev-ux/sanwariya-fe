import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/services/collection/index.service";

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (!products.length) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-gold/40 py-12">
      <div className="main-container mx-auto">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl text-white font-sans font-bold">
              You May Also Like
            </h2>
            <p className="mt-2 text-beige/70 libertinus-serif-regular">
              Explore more from our royal collection
            </p>
          </div>
          <Button asChild variant="gold-outline" size="sm">
            <Link href="/collections">View All</Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${product.id}`}
              className="group block rounded-2xl border border-gold/20 bg-maroon/40 p-3 transition-colors hover:border-gold/50"
            >
              <div className="relative h-60 overflow-hidden rounded-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-xl text-white font-sans font-bold">
                {product.name}
              </h3>
              <p className="mt-1 text-gold-bright text-lg">₹{product.price}</p>
              <p className="text-beige/60 text-xs">/{product.unit}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
