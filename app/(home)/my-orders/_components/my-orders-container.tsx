"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";
import { fetchMyOrders } from "@/store/slices/orders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CurrentOrderCard from "./current-order-card";
import PastOrdersList from "./past-orders-list";

const MyOrdersContainer = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.orders);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, orders.length]);

  const { currentOrder, pastOrders } = useMemo(() => {
    const active = orders.find((order) => order.status !== "delivered") ?? null;
    const past = orders.filter((order) => order.id !== active?.id);
    return { currentOrder: active, pastOrders: past };
  }, [orders]);

  return (
    <main className="min-h-screen">
      <section className="main-container mx-auto py-12">
        <div className="mb-8">
          <p className="text-gold-secondary text-xs tracking-[3px] uppercase">
            Account
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl text-white font-sans font-bold">
            My Orders
          </h1>
          <p className="mt-3 max-w-2xl text-beige/80 libertinus-serif-regular">
            Track your active order status and browse your previous purchases.
          </p>
        </div>

        {loading ? (
          <div className="space-y-5">
            <Card className="border-gold/30 bg-maroon/45 p-6">
              <Skeleton className="h-8 w-48 bg-maroon/70" />
              <Skeleton className="mt-4 h-28 w-full bg-maroon/70" />
              <Skeleton className="mt-4 h-28 w-full bg-maroon/70" />
            </Card>
            <Card className="border-gold/30 bg-maroon/45 p-6">
              <Skeleton className="h-8 w-40 bg-maroon/70" />
              <Skeleton className="mt-4 h-20 w-full bg-maroon/70" />
            </Card>
          </div>
        ) : null}

        {!loading && error ? (
          <Card className="border-gold/30 bg-maroon/45 p-6 text-beige">
            <p>{error}</p>
            <Button
              type="button"
              variant="gold-outline"
              className="mt-4"
              onClick={() => dispatch(fetchMyOrders())}
            >
              Retry
            </Button>
          </Card>
        ) : null}

        {!loading && !error && !orders.length ? (
          <Card className="border-gold/30 bg-maroon/45 p-6 text-beige">
            <p>
              {user
                ? "You haven't placed any orders yet."
                : "Please login to view your orders."}
            </p>
          </Card>
        ) : null}

        {!loading && !error && orders.length ? (
          <div className="space-y-6">
            {currentOrder ? (
              <CurrentOrderCard order={currentOrder} />
            ) : (
              <Card className="border-gold/30 bg-maroon/45 p-6 text-beige">
                <p>No active order right now.</p>
              </Card>
            )}

            {pastOrders.length ? <PastOrdersList orders={pastOrders} /> : null}
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default MyOrdersContainer;
