"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { cartActions, placeOrder } from "@/store/slices/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartCheckoutDialogProps {
  total: number;
  disabled: boolean;
}

const confettiPieces = [
  { left: "8%", delay: 0, duration: 1.8, color: "#d4ab32" },
  { left: "16%", delay: 0.2, duration: 2.2, color: "#bf953f" },
  { left: "24%", delay: 0.1, duration: 2, color: "#f5daa7" },
  { left: "32%", delay: 0.35, duration: 1.9, color: "#fbf5b7" },
  { left: "40%", delay: 0.25, duration: 2.3, color: "#d4ab32" },
  { left: "48%", delay: 0.15, duration: 1.7, color: "#bf953f" },
  { left: "56%", delay: 0.3, duration: 2.1, color: "#f5daa7" },
  { left: "64%", delay: 0.45, duration: 1.8, color: "#fbf5b7" },
  { left: "72%", delay: 0.05, duration: 2.4, color: "#d4ab32" },
  { left: "80%", delay: 0.4, duration: 2.15, color: "#bf953f" },
  { left: "88%", delay: 0.12, duration: 1.95, color: "#f5daa7" },
];

const CartCheckoutDialog = ({ total, disabled }: CartCheckoutDialogProps) => {
  const dispatch = useAppDispatch();
  const { placingOrder, placeOrderError, lastOrderId } = useAppSelector(
    (state) => state.cart
  );
  const user = useAppSelector((state) => state.user.user);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleCheckoutOpen = (open: boolean) => {
    setCheckoutOpen(open);
    if (open) {
      dispatch(cartActions.clearOrderFeedback());
      setFormError(null);
      setPhone(user?.phoneNumber || "");
      setAddress(user?.address || "");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (trimmedAddress.length < 10) {
      setFormError("Please enter a complete delivery address.");
      return;
    }

    setFormError(null);

    try {
      await dispatch(
        placeOrder({
          phoneNumber: trimmedPhone,
          address: trimmedAddress,
        })
      ).unwrap();
      setCheckoutOpen(false);
      setSuccessOpen(true);
      setPhone("");
      setAddress("");
    } catch {
      return;
    }
  };

  return (
    <>
      <Button type="button" className="mt-4 w-full" disabled={disabled} onClick={() => handleCheckoutOpen(true)}>
        Checkout
      </Button>

      <Dialog open={checkoutOpen} onOpenChange={handleCheckoutOpen}>
        <DialogContent className="border-gold/30 bg-maroon text-beige">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white font-sans">Checkout Details</DialogTitle>
            <DialogDescription className="text-beige/70">
              Enter your phone and delivery address to place this order.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs uppercase tracking-[2px] text-gold-secondary/80">
                Phone Number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit phone number"
                className="border-gold/25 text-white placeholder:text-beige/40"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs uppercase tracking-[2px] text-gold-secondary/80">
                Address
              </label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House no, street, landmark, city, pincode"
                className="min-h-24 border-gold/25 text-white placeholder:text-beige/40"
              />
            </div>

            <div className="rounded-md border border-gold/20 bg-maroon/70 p-3 text-sm">
              <p className="flex items-center justify-between">
                <span className="text-beige/70">Order total</span>
                <span className="text-gold-bright font-semibold">₹{total}</span>
              </p>
            </div>

            {formError ? <p className="text-sm text-red-300">{formError}</p> : null}
            {placeOrderError ? (
              <p className="text-sm text-red-300">{placeOrderError}</p>
            ) : null}

            <DialogFooter>
              <Button type="submit" disabled={placingOrder}>
                {placingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={successOpen}
        onOpenChange={(open) => {
          setSuccessOpen(open);
          if (!open) {
            dispatch(cartActions.clearOrderFeedback());
          }
        }}
      >
        <DialogContent className="overflow-hidden border-gold/30 bg-maroon text-beige">
          <div className="pointer-events-none absolute inset-0">
            {confettiPieces.map((piece, index) => (
              <motion.div
                key={`${piece.left}-${index}`}
                className="absolute top-[-10%] h-3 w-2 rounded-xs"
                style={{ left: piece.left, backgroundColor: piece.color }}
                initial={{ y: -20, rotate: 0, opacity: 0 }}
                animate={{ y: 320, rotate: 260, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: piece.duration,
                  delay: piece.delay,
                  repeat: Infinity,
                  repeatDelay: 0.4,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <DialogHeader className="items-center text-center sm:text-center">
            <CheckCircle2 className="size-12 text-gold-bright" />
            <DialogTitle className="text-2xl text-white font-sans">
              Order Successful
            </DialogTitle>
            <DialogDescription className="text-beige/75">
              Thank you for your order. Your sweet box is now being prepared.
            </DialogDescription>
          </DialogHeader>

          <div className="relative rounded-md border border-gold/20 bg-maroon/70 p-3 text-center">
            <p className="text-xs uppercase tracking-[2px] text-gold-secondary/70">
              Order ID
            </p>
            <p className="mt-1 text-lg font-semibold text-gold-bright">
              {lastOrderId ?? "SW-000000"}
            </p>
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setSuccessOpen(false)}>
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartCheckoutDialog;
