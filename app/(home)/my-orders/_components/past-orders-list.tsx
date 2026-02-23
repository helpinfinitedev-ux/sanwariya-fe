import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/services/orders/index.service";

interface PastOrdersListProps {
  orders: Order[];
}

const getOrderTotal = (order: Order) =>
  order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PastOrdersList = ({ orders }: PastOrdersListProps) => {
  return (
    <Card className="border-gold/30 bg-maroon/45 py-0 text-beige backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="font-sans text-2xl text-white">Past Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-6 pb-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gold/20 bg-maroon/60 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-sans text-white">#{order.id}</p>
                <p className="text-xs text-beige/65">
                  Placed on {formatDate(order.placedAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600 text-white capitalize">
                  {order.status}
                </Badge>
                <p className="text-gold-bright font-semibold">
                  ₹{getOrderTotal(order)}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-beige/70">
              {order.items.length} item{order.items.length > 1 ? "s" : ""} • Expected by{" "}
              {formatDate(order.expectedBy)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PastOrdersList;

