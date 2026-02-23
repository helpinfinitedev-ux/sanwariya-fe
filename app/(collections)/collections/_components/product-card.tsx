import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Product } from "@/services/collection/index.service";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-maroon/40 backdrop-blur-sm border border-gold/20 rounded-2xl overflow-hidden shadow-lg group transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/collections/${product.id}`} className="block">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.badge && (
            <span
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide ${product.badgeClass}`}
            >
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col gap-2">
        <h3 className="text-white font-bold text-lg tracking-wide">
          <Link href={`/collections/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-gold-secondary/50 text-[10px] uppercase tracking-[2px] font-medium">
          {product.tags}
        </p>
        <p className="text-beige/50 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
          <div className="flex items-baseline gap-1">
            <span className="text-gold-bright font-bold text-xl">
              ₹{product.price}
            </span>
            <span className="text-beige/40 text-xs">/{product.unit}</span>
          </div>
          <Button asChild variant="gold-outline" size="sm" className="text-xs tracking-wide">
            <Link href={`/collections/${product.id}`}>Buy Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
