import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image src="/auth/image.png" alt="Sanwariya Sweets" fill className="object-cover" priority />
        <div className="auth-image-overlay absolute inset-0 z-10" />
        <div className="relative z-20 flex flex-col justify-end p-12 pb-20 h-full">
          <div className="mb-2 -ml-5">
            <Image src="/logo2.png" alt="Sanwariya" width={180} height={60} className="object-contain" />
          </div>
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-1 tracking-wider">A LEGACY OF</h2>
          <h2 className="text-4xl xl:text-5xl libertinus-serif-bold-italic text-gold-bright leading-tight mb-6 tracking-wider">EXQUISITE TASTE</h2>
          <p className="text-beige/80 text-base max-w-md leading-relaxed">
            Step into the royal courts of flavor. Every sweet we craft is a tribute to centuries of tradition, made with the finest ingredients and a touch of gold.
          </p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="w-full lg:w-1/2 bg-red-gold-gradient flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[440px]">{children}</div>
      </div>
    </div>
  );
}
