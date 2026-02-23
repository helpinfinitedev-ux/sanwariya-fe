import { Check } from "lucide-react";
import type { OrderStatus } from "@/services/orders/index.service";

const statusFlow: OrderStatus[] = ["pending", "shipped", "in-transit", "delivered"];

const statusLabels: Record<OrderStatus, string> = {
  pending: "Order received",
  shipped: "Packed & shipped",
  "in-transit": "In transit",
  delivered: "Delivered",
};

interface OrderProgressProps {
  status: OrderStatus;
}

const OrderProgress = ({ status }: OrderProgressProps) => {
  const activeStep = statusFlow.indexOf(status);

  return (
    <div className="space-y-4">
      <h3 className="text-white font-sans text-xl font-semibold">Order Progress</h3>
      <div className="grid grid-cols-4 gap-3">
        {statusFlow.map((step, index) => {
          const completed = index <= activeStep;

          return (
            <div key={step} className="flex items-center gap-3 w-full">
              <div className={`flex size-8 items-center justify-center rounded-full border ${completed ? "border-green-400 bg-green-500 text-white" : "border-gold/35 bg-maroon text-gold-secondary"}`}>
                {completed ? <Check className="size-4" /> : index + 1}
              </div>
              <span className={`text-xs w-max md:text-sm ${completed ? "text-white" : "text-beige/60"}`}>{statusLabels[step]}</span>
              {index < statusFlow.length - 1 ? <div className="h-[2px] flex-1 bg-gold/25 " /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgress;
