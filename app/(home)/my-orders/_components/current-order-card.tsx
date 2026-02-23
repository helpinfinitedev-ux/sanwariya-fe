import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Order } from "@/services/orders/index.service";
import OrderProgress from "./order-progress";

interface CurrentOrderCardProps {
  order: Order;
}

const getOrderTotal = (order: Order) =>
  order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const CurrentOrderCard = ({ order }: CurrentOrderCardProps) => {
  return (
    <Card className="border-gold/30 bg-maroon/45 py-0 text-beige backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="font-sans text-2xl text-white">
            Current Order
          </CardTitle>
          <Badge className="bg-gold text-navy">#{order.id}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 px-6 pb-6">
        <OrderProgress status={order.status} />

        <Separator className="bg-gold/20" />

        <div className="space-y-3">
          <h4 className="font-sans text-lg text-white">Order Details</h4>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-gold/20 bg-maroon/60 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-md">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-sans text-sm text-white">{item.name}</p>
                    <p className="text-xs text-beige/65">
                      {item.quantity} x ₹{item.price} / {item.unit}
                    </p>
                  </div>
                </div>
                <p className="text-gold-bright font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 rounded-lg border border-gold/20 bg-maroon/60 p-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gold-secondary/70">
              Delivery Address
            </p>
            <p className="mt-1 text-sm text-beige/85">{order.deliveryAddress}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs uppercase tracking-[2px] text-gold-secondary/70">
              Total
            </p>
            <p className="mt-1 text-2xl font-semibold text-gold-bright">
              ₹{getOrderTotal(order)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentOrderCard;

