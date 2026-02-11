import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-red-gold-gradient min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
