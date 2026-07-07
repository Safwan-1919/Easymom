"use client";

export function Hero() {
  return (
    <section className="w-full bg-white pt-20 pb-4">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <img
          src="/brand/easymom-banner.png"
          alt="EasyMom — Authentic South Indian masala spices"
          className="w-full object-cover"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
