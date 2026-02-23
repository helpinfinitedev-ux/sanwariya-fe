import ContactForm from "./_components/contact-form";
import ContactInfo from "./_components/contact-info";
import ContactHero from "./_components/contact-hero";

export const metadata = {
  title: "Contact Us | Sanwariya",
  description: "Get in touch with Sanwariya for premium Indian sweets and tradition.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-red-gold-gradient">
      <ContactHero />

      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl  text-gold-bright">Visit Our Heritage</h2>
              <p className="text-beige/70 text-lg leading-relaxed">
                Step into a world where every sweet tells a story of centuries-old recipes passed down through generations. Our doors are always open for those who appreciate the finer things in life.
              </p>
            </div>
            <ContactInfo />

            {/* Simple Map Placeholder */}
            <div className="w-full h-[300px] rounded-2xl overflow-hidden glass-card-gold border-gold/20 relative group">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <h4 className="text-gold  text-xl mb-2">Sanwariya Sweets</h4>
                  <p className="text-beige/60 text-sm libertinus-serif-regular">Interactive Map Implementation Coming Soon</p>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                alt="Map Background"
                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale opacity-40"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
