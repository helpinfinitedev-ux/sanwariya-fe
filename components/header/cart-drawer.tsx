"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { fetchCartDetails, updateCartItemQuantity } from "@/store/slices/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import CartCheckoutDialog from "./cart-checkout-dialog";

const CartDrawer = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, updatingItem } = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen && !items.length && !loading) {
      dispatch(fetchCartDetails());
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild className="w-[48px] hover:bg-transparent hover:text-gold-bright cursor-pointer">
        <Button type="button" variant="ghost" size="icon" className="relative text-[#fdd17b] w-[48px] hover:bg-transparent" aria-label="Open cart">
          <Icon icon="streamline:bag-remix" width="22" height="32" className="!w-[18px] !h-[18px] !font-bold" />
          {totalItems > 0 ? <Badge className="absolute -right-1 -top-1 min-w-3   rounded-full bg-gold text-navy px-1.5">{totalItems}</Badge> : null}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-xl border-l border-gold/30 bg-maroon text-beige sm:max-w-xl">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-2xl font-sans text-white">Your Cart</SheetTitle>
          <SheetDescription className="text-beige/70">Review your selected products and update quantities.</SheetDescription>
        </SheetHeader>

        <Separator className="bg-gold/20" />

        <ScrollArea className="h-[calc(100vh-250px)] px-6">
          <div className="space-y-4 py-4">
            {loading ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-24 rounded-xl bg-maroon/70 border border-gold/20" />
                ))}
              </>
            ) : null}

            {!loading && error ? (
              <div className="rounded-xl border border-gold/25 bg-maroon/70 p-4">
                <p className="text-sm">{error}</p>
                <Button type="button" variant="gold-outline" className="mt-3" onClick={() => dispatch(fetchCartDetails())}>
                  Retry
                </Button>
              </div>
            ) : null}

            {!loading && !error && !items.length ? (
              <div className="rounded-xl border border-gold/25 bg-maroon/70 p-4">
                <p className="text-sm text-beige/80">Your cart is empty.</p>
              </div>
            ) : null}

            {!loading && !error
              ? items.map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-xl border border-gold/20 bg-maroon/65 p-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate font-sans text-base text-white">{item.name}</p>
                      <p className="text-xs text-beige/65">/{item.unit}</p>
                      <p className="mt-2 text-gold-bright font-semibold">₹{item.price}</p>

                      <div className="mt-2 inline-flex w-fit items-center rounded-md border border-gold/25 bg-maroon/60">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-beige hover:bg-maroon/80"
                          disabled={updatingItem}
                          onClick={() => dispatch(updateCartItemQuantity({ itemId: item.id, delta: -1 }))}
                        >
                          <Minus className="size-4" />
                        </Button>
                        <span className="min-w-8 text-center text-sm text-white">{item.quantity}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-beige hover:bg-maroon/80"
                          disabled={updatingItem}
                          onClick={() => dispatch(updateCartItemQuantity({ itemId: item.id, delta: 1 }))}
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </ScrollArea>

        <Separator className="bg-gold/20" />

        <div className="mt-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <p className="text-beige/75">Total</p>
            <p className="text-2xl font-semibold text-gold-bright">₹{total}</p>
          </div>
          <CartCheckoutDialog total={total} disabled={!items.length || loading || updatingItem} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
