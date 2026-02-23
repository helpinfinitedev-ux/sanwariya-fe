export default function ContactHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-maroon/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold logo-gold-pressed mb-6">Contact Us</h1>
        <p className="text-xl md:text-2xl text-beige/80 max-w-2xl mx-auto niconne-regular leading-relaxed">
          The secret ingredient is always love and tradition. Reach out to us for any queries, special orders, or just to say hello.
        </p>
      </div>
    </section>
  );
}
