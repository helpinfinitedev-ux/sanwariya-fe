const ProductDetailsSkeleton = () => {
  return (
    <section className="main-container mx-auto animate-pulse py-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="h-[580px] rounded-2xl bg-maroon/60" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-24 rounded-xl bg-maroon/60" />
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gold/25 bg-maroon/45 p-8">
          <div className="h-4 w-40 rounded bg-maroon/70" />
          <div className="mt-4 h-14 w-full rounded bg-maroon/70" />
          <div className="mt-6 h-8 w-36 rounded bg-maroon/70" />
          <div className="mt-8 h-36 w-full rounded bg-maroon/70" />
          <div className="mt-8 h-10 w-full rounded bg-maroon/70" />
        </div>
      </div>
      <div className="mt-16">
        <div className="h-8 w-64 rounded bg-maroon/60" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-80 rounded-2xl bg-maroon/60" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;
