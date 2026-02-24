import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      closeButton
      expand
      duration={4000}
      toastOptions={{
        // applies to all toasts unless overridden per-toast
        classNames: {
          toast: "rounded-xl !border-none !font-semibold !text-gold-bright shadow-lg !bg-red-gold-gradient text-foreground",
          title: "text-sm font-semibold",
          description: "text-sm opacity-90 text-foreground",
          actionButton: "rounded-xl text-foreground",
          cancelButton: "rounded-xl text-foreground !bg-gold-bright",
          closeButton: "rounded-xl text-foreground !bg-gold-bright",
        },
      }}
    />
  );
}
