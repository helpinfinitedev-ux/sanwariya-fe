"use client";

import { useState } from "react";
import { Heart, Minus, Package2, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/services/collection/index.service";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { addItemToCart } from "@/store/slices/cart";
import { toast } from "sonner";

interface ProductPurchasePanelProps {
  product: Product;
}

const weights = ["500g", "1kg", "2kg"];

const ProductPurchasePanel = ({ product }: ProductPurchasePanelProps) => {
  const dispatch = useAppDispatch();
  const { addingItem } = useAppSelector((state) => state.cart);
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAddToCart = async () => {
    const unit = selectedWeight.includes("kg") ? "kg" : "g";
    const result = await dispatch(
      addItemToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        unit,
        image: product.image,
        quantity,
      })
    );

    if (addItemToCart.fulfilled.match(result)) {
      toast.success("Item added to cart");
      return;
    }

    toast.error((result.payload as string) || "Unable to add item to cart");
  };

  return (
    <aside className="rounded-2xl border border-gold/35 bg-maroon/45 p-7 backdrop-blur-sm lg:p-8">
      <p className="text-gold-secondary/70 text-xs tracking-[3px] uppercase">
        Verified Heritage Collection
      </p>
      <h1 className="mt-3 text-4xl leading-[1.05] text-white md:text-5xl font-sans font-bold">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center gap-1 text-gold-bright">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="size-4 fill-current" />
          ))}
        </div>
        <p className="text-beige/60 text-xs tracking-[1px]">128 reviews</p>
      </div>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-gold-bright text-4xl font-semibold">₹{product.price}</span>
        <span className="pb-1 text-beige/55 text-sm">/{selectedWeight}</span>
      </div>

      <blockquote className="mt-7 border-l border-gold/30 pl-4 text-beige/75 libertinus-serif-regular-italic">
        A masterpiece of traditional confectionery.
      </blockquote>

      <p className="mt-5 text-beige/80 leading-7 libertinus-serif-regular">
        {product.description} Crafted in small batches with premium ingredients
        and finished with slow-cooked precision for rich, memorable taste.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-gold-secondary/65 text-[11px] tracking-[2px] uppercase">
            Select Weight
          </p>
          <div className="mt-2 flex gap-2">
            {weights.map((weight) => (
              <Button
                key={weight}
                type="button"
                size="sm"
                variant="gold-outline"
                className={selectedWeight === weight ? "bg-gold/20 border-gold" : ""}
                onClick={() => setSelectedWeight(weight)}
              >
                {weight}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gold-secondary/65 text-[11px] tracking-[2px] uppercase">
            Quantity
          </p>
          <div className="mt-2 inline-flex items-center rounded-md border border-gold/30 bg-maroon/40">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-beige hover:bg-maroon/70"
              onClick={decrease}
            >
              <Minus />
            </Button>
            <span className="min-w-10 text-center text-sm text-white">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-beige hover:bg-maroon/70"
              onClick={increase}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="button" className="w-full sm:flex-1" disabled={addingItem} onClick={handleAddToCart}>
          {addingItem ? "Adding..." : "Add to Cart"}
        </Button>
        <Button type="button" variant="gold-outline" className="sm:w-auto">
          <Heart className="size-4" />
          Favorite
        </Button>
      </div>

      <div className="mt-8 grid gap-3 border-t border-gold/20 pt-6 sm:grid-cols-3">
        <div className="flex items-center gap-2 text-beige/70 text-xs tracking-[1px]">
          <Package2 className="size-4 text-gold-secondary" />
          Premium packaging
        </div>
        <div className="flex items-center gap-2 text-beige/70 text-xs tracking-[1px]">
          <Truck className="size-4 text-gold-secondary" />
          Local shipping
        </div>
        <div className="flex items-center gap-2 text-beige/70 text-xs tracking-[1px]">
          <ShieldCheck className="size-4 text-gold-secondary" />
          Safe next-day delivery
        </div>
      </div>
    </aside>
  );
};

export default ProductPurchasePanel;
