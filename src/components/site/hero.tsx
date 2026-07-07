"use client";

import React from "react";

export function Hero() {
  const [count, setCount] = React.useState(0);
  const [countDone, setCountDone] = React.useState(false);
  const statRef = React.useRef<HTMLDivElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!statRef.current) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        o.disconnect();
        let cur = 0;
        const id = setInterval(() => {
          cur++;
          setCount(cur);
          if (cur >= 42) {
            clearInterval(id);
            setCountDone(true);
          }
        }, 35);
      },
      { threshold: 0.5 }
    );
    o.observe(statRef.current);
    return () => o.disconnect();
  }, []);

  React.useEffect(() => {
    if (!heroRef.current) return;
    const o = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            o.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    heroRef.current.querySelectorAll("[data-reveal]").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="relative mt-8 h-[calc(100vh-112px)] min-h-[500px] overflow-hidden bg-zinc-950">
      {/* ── Full-bleed image ── */}
      <div className="absolute inset-0">
        <div className="grain h-full w-full">
          <img
            src="/brand/easymom-banner.png"
            alt="EasyMom — Authentic South Indian masala spices"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* ── Main content ── */}
      <div className="absolute bottom-0 left-0 z-10 w-full px-6 pb-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            {/* stat + scroll hint */}
            <div
              data-reveal
              className="flex flex-col items-start gap-4 lg:items-end lg:ml-auto"
              style={{ transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s", opacity: 0, transform: "translateY(20px)" }}
            >
              <div ref={statRef} className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[38px] font-bold leading-none text-white tabular-nums sm:text-[46px]">
                    {countDone ? "42,000+" : `${count.toLocaleString()}+`}
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                    Kitchens trust&nbsp;us
                  </div>
                </div>
              </div>
              <div className="hidden items-center gap-2 text-[11px] text-white/30 sm:flex">
                <div className="h-8 w-px bg-white/15" />
                Scroll to explore
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
