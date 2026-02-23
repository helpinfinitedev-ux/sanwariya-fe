import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductStateProps {
  title: string;
  message: string;
  retry?: () => void;
}

const ProductState = ({ title, message, retry }: ProductStateProps) => {
  return (
    <section className="main-container mx-auto py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-maroon/45 p-8 text-center backdrop-blur-sm">
        <h1 className="cinzel-decorative-bold text-3xl text-white">{title}</h1>
        <p className="mt-4 text-beige/75 libertinus-serif-regular">{message}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {retry ? (
            <Button
              type="button"
              variant="gold-outline"
              onClick={retry}
              className="tracking-[1px]"
            >
              Try Again
            </Button>
          ) : null}
          <Button asChild variant="gold-outline" className="tracking-[1px]">
            <Link href="/collections">Back to Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductState;

