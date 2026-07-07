"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Users,
  MapPin,
  ShieldCheck,
  Leaf,
  Flame,
  CookingPot,
  ChevronRight,
} from "lucide-react";
import { categories, products, recipes, testimonials, brandValues } from "@/lib/data";
import { useUI } from "@/lib/ui-store";
import { ProductCard } from "./product-card";
import { SpiceVisual } from "./spice-visual";
import { inr } from "@/lib/format";

const ICONS: Record<string, typeof Leaf> = {
  mortar: CookingPot,
  leaf: Leaf,
  shield: ShieldCheck,
  flame: Flame,
};

export function BrandStrip() {
  const items = [
    "Stone-ground in small batches",
    "No preservatives, ever",
    "Sourced from origin",
    "Roasted, never raw",
    "Built for the 15-minute cook",
    "From Mangalore & Kerala",
    "42,000+ households",
  ];
  return (
    <div className="border-y border-border bg-secondary/50 py-3.5">
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-[13px] font-medium text-foreground/70">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Categories() {
  const go = useUI((s) => s.go);
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeader
        align="left"
        eyebrow="The collection"
        title="Six kitchens, one pantry"
      />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => go({ name: "shop", categoryId: c.id })}
            className="group relative flex flex-col overflow-hidden rounded-[6px] border border-border bg-card p-6 text-left transition-shadow duration-300 hover:shadow-premium"
          >
            <div className="mb-5 flex items-center justify-between">
              <div
                className="grid h-12 w-12 place-items-center rounded-[6px]"
                style={{ background: `oklch(0.95 0.03 ${c.hue})` }}
              >
                <div
                  className="h-6 w-6 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, oklch(0.65 0.15 ${c.hue}), oklch(0.45 0.17 ${c.hue}))`,
                  }}
                />
              </div>
              <span className="text-[12px] font-medium text-muted-foreground">{c.count} blends</span>
            </div>
            <h3 className="text-[19px] font-semibold tracking-tight text-foreground">{c.name}</h3>
            <p className="mt-1 text-[13px] font-medium text-primary">{c.tagline}</p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted-foreground">{c.description}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-foreground">
              Browse {c.name.toLowerCase()}
              <ChevronRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </span>
            <div
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
              style={{ background: `oklch(0.7 0.15 ${c.hue})` }}
            />
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const go = useUI((s) => s.go);
  const featured = products.filter((p) => p.bestSeller).slice(0, 4);
  return (
    <section className="bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            align="left"
            eyebrow="Most loved"
            title="The blends people reorder"
            description="The four that earned their place in 42,000 kitchens — and keep earning it."
          />
          <button
            onClick={() => go({ name: "shop" })}
            className="group inline-flex items-center gap-1.5 rounded-[4px] border border-border bg-card px-4 py-2.5 text-[13px] font-semibold text-foreground transition hover:border-foreground/30"
          >
            View all {products.length} blends
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandStory() {
  const [count, setCount] = React.useState(0);
  const [countDone, setCountDone] = React.useState(false);
  const statRef = React.useRef<HTMLDivElement>(null);
  const revealRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!revealRef.current) return;
    const els = revealRef.current.querySelectorAll("[data-reveal]");
    const o = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-revealed", "");
            o.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);

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
          if (cur >= 20) {
            clearInterval(id);
            setCountDone(true);
          }
        }, 80);
      },
      { threshold: 0.5 }
    );
    o.observe(statRef.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={revealRef} className="relative overflow-hidden bg-white">
      {/* ── Marquee ── */}
      <div className="relative border-b border-zinc-100 py-5 sm:py-7">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[42px] font-bold leading-none tracking-[-0.03em] text-zinc-[0.06] select-none sm:text-[64px] lg:text-[80px]"
              >
                GROUND IN BATCHES UNDER 20KG&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* image */}
          <div
            data-reveal
            className="relative overflow-hidden rounded-sm lg:col-span-7"
            style={{ transition: "opacity 0.7s ease, transform 0.7s ease", opacity: 0, transform: "translateY(24px)" }}
          >
            <div className="grain">
              <img
                src="/brand/story-grind.png"
                alt="Hands grinding spices in a traditional stone mortar and pestle"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          {/* text */}
          <div className="flex flex-col gap-8 lg:col-span-5 lg:pt-4">
            {/* stat */}
            <div
              ref={statRef}
              data-reveal
              className="flex items-center gap-4"
              style={{ transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s", opacity: 0, transform: "translateY(20px)" }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full border-[1.5px] border-primary/20" />
                <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/[0.07]">
                  <span className="text-[28px] font-bold tracking-tight text-primary tabular-nums">
                    {countDone ? "20+" : `${count}+`}
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                Max batch<br />size
              </span>
            </div>

            <div
              data-reveal
              style={{ transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s", opacity: 0, transform: "translateY(20px)" }}
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
                Why EasyMom
              </p>
              <h2 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] text-zinc-900 sm:text-[38px] lg:text-[42px]">
                Ground the way it keeps its soul
              </h2>
            </div>

            <p
              data-reveal
              className="hidden text-[15px] leading-[1.7] text-zinc-500 sm:block"
              style={{ transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s", opacity: 0, transform: "translateY(20px)" }}
            >
              Industrial masala is pulverised at speed — volatile oils vanish, flavour flattens. We grind in batches under 20kg on slow stones, the way a home kitchen would, just scaled enough to reach yours.
            </p>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <div className="mx-auto max-w-[1200px] px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16 lg:pb-28">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brandValues.map((v, i) => {
            const Icon = ICONS[v.icon] ?? Leaf;
            const span = i < 2 ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-1";
            const tall = i === 1;
            const rotations = ["-0.4deg", "0.3deg", "-0.2deg"];
            return (
              <div
                key={v.title}
                data-reveal
                className={`group relative flex flex-col justify-between rounded-sm border border-zinc-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-200/60 ${span} ${tall ? "sm:row-span-2" : ""}`}
                style={{
                  transition: `opacity 0.6s ease ${0.05 * i}s, transform 0.6s ease ${0.05 * i}s`,
                  opacity: 0,
                  transform: `translateY(20px) rotate(${rotations[i % 3]})`,
                  ...(typeof window !== "undefined" && revealRef.current?.querySelector("[data-revealed]")
                    ? {}
                    : {}),
                }}
              >
                <div>
                  <div className="mb-5 grid h-10 w-10 place-items-center rounded-sm bg-primary/[0.07]">
                    <Icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.75} />
                  </div>
                  <h4 className="text-[16px] font-semibold leading-snug text-zinc-900">{v.title}</h4>
                  <p className="mt-2.5 text-[14px] leading-[1.65] text-zinc-500">{v.body}</p>
                </div>
                <div className="mt-6 h-px w-8 bg-zinc-200 transition-all duration-300 group-hover:w-14 group-hover:bg-primary/30" />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Marquee ── */}
      <div className="border-t border-zinc-100 py-4 sm:py-5">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6 sm:gap-10 sm:pr-10" style={{ animationDirection: "reverse", animationDuration: "28s" }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.2em] text-zinc-300 select-none"
              >
                Small-batch · Stone-ground · Sourced from origin · Nothing to hide · Built for the modern stove&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Recipes() {
  const go = useUI((s) => s.go);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
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
    ref.current.querySelectorAll("[data-reveal]").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);

  const [featured, ...rest] = recipes;

  return (
    <section ref={ref} className="bg-zinc-50/60">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
        {/* header */}
        <div
          data-reveal
          style={{ transition: "opacity 0.6s ease, transform 0.6s ease", opacity: 0, transform: "translateY(20px)" }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
            From the kitchen
          </p>
          <h2 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] text-zinc-900 sm:text-[38px] lg:text-[42px]">
            Recipes built around the blend
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.7] text-zinc-500">
            Three dishes that show what a proper masala can do — each tested, each under 30 minutes.
          </p>
        </div>

        {/* grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:grid-rows-2">
          {/* featured — spans 2 rows on desktop */}
          <button
            data-reveal
            onClick={() => go({ name: "recipes" })}
            className="group relative flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-200/60 lg:col-span-3 lg:row-span-2"
            style={{ transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s", opacity: 0, transform: "translateX(-28px)" }}
          >
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <SpiceVisual
                  hue={featured.hue}
                  name={featured.title}
                  seed={featured.id}
                  className="h-full w-full"
                />
              </div>
              <div className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-700 backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-primary" /> {featured.region}
              </div>
              <div className="absolute right-5 top-5 text-[80px] font-bold leading-none text-white/10 select-none sm:text-[100px] lg:text-[120px]">
                01
              </div>
            </div>
            <div className="flex flex-col gap-3 p-6 sm:p-8">
              <h3 className="text-[24px] font-semibold leading-snug text-zinc-900 sm:text-[28px]">
                {featured.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-zinc-500">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-5 border-t border-zinc-100 pt-4 text-[13px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {featured.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Serves {featured.serves}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-zinc-900">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </button>

          {/* smaller cards — stacked on right */}
          {rest.map((r, i) => (
            <button
              key={r.id}
              data-reveal
              onClick={() => go({ name: "recipes" })}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-200/60 lg:col-span-2"
              style={{ transition: `opacity 0.7s ease ${0.15 + i * 0.1}s, transform 0.7s ease ${0.15 + i * 0.1}s`, opacity: 0, transform: "translateX(28px)" }}
            >
              <div className="relative aspect-[5/3] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  <SpiceVisual
                    hue={r.hue}
                    name={r.title}
                    seed={r.id}
                    className="h-full w-full"
                  />
                </div>
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-sm bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-700 backdrop-blur-sm">
                  <MapPin className="h-3 w-3 text-primary" /> {r.region}
                </div>
                <div className="absolute right-4 top-3 text-[48px] font-bold leading-none text-white/10 select-none sm:text-[56px]">
                  0{i + 2}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                <h3 className="text-[19px] font-semibold leading-snug text-zinc-900">
                  {r.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-zinc-500">
                  {r.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-4 border-t border-zinc-100 pt-4 text-[12px] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {r.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> Serves {r.serves}
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 font-semibold text-zinc-900">
                    Read
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
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
    ref.current.querySelectorAll("[data-reveal]").forEach((el) => o.observe(el));
    return () => o.disconnect();
  }, []);

  const [featured, ...rest] = testimonials;

  return (
    <section ref={ref} className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
        {/* header */}
        <div
          data-reveal
          style={{ transition: "opacity 0.6s ease, transform 0.6s ease", opacity: 0, transform: "translateY(20px)" }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">
            Trusted in 42,000 kitchens
          </p>
          <h2 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.02em] text-zinc-900 sm:text-[38px] lg:text-[42px]">
            What families actually say
          </h2>
          <p className="mt-3 max-w-lg text-[15px] leading-[1.7] text-zinc-500">
            From Bengaluru to Dubai to London — the reviews that keep us grinding.
          </p>
        </div>

        {/* masonry wall */}
        <div
          data-reveal
          className="mt-14 [column-fill:_balance] columns-1 gap-5 sm:columns-2 lg:columns-3"
          style={{ transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s", opacity: 0, transform: "translateY(24px)" }}
        >
          {testimonials.map((t, i) => {
            const isFeatured = i === 0;
            const hue = [0, 27, 145, 80, 45, 145][i % 6];
            const bgTint = `oklch(0.975 0.012 ${hue})`;

            return (
              <figure
                key={t.id}
                className={`mb-5 inline-block w-full break-inside-avoid flex flex-col rounded-sm border border-zinc-200 ${
                  isFeatured ? "p-7 sm:p-8" : "p-5 sm:p-6"
                }`}
                style={{ background: bgTint }}
              >
                {isFeatured && (
                  <div className="mb-4 text-[60px] font-bold leading-none text-primary/15 select-none">
                    &ldquo;
                  </div>
                )}

                <blockquote
                  className={`flex-1 leading-[1.7] text-zinc-700 ${
                    isFeatured
                      ? "text-[19px] sm:text-[21px]"
                      : "text-[15px]"
                  }`}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <figcaption className={`border-t border-zinc-200/60 ${isFeatured ? "mt-6 pt-5" : "mt-4 pt-4"}`}>
                  <div className="text-[14px] font-semibold text-zinc-900">{t.name}</div>
                  <div className="mt-0.5 text-[12px] text-zinc-400">
                    {t.role} · {t.location}
                  </div>
                  <div className={`inline-block rounded-sm bg-white/70 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-primary ${
                    isFeatured ? "mt-3" : "mt-2"
                  }`}>
                    {t.product}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[6px] bg-foreground px-6 py-14 text-center sm:px-12 lg:py-20">
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "oklch(0.6 0.17 27)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-25 blur-3xl"
          style={{ background: "oklch(0.74 0.14 80)" }}
        />
        <div className="relative mx-auto max-w-xl">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-turmeric">
            The EasyMom letter
          </p>
          <h2 className="mt-3 text-balance text-[30px] font-semibold leading-tight tracking-tight text-white sm:text-[38px]">
            Recipes, restocks and 10% off your first order.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/65">
            One letter a fortnight. Real recipes, new-blend early access, and a
            heads-up when the gunpowder is back in stock. No spam, ever.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const email = String(fd.get("email") || "");
              const { toast } = await import("sonner");
              if (!email) return;
              try {
                const res = await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                if (res.ok) {
                  toast.success("You're on the list", {
                    description: "Check your inbox for the 10% code.",
                  });
                  (e.currentTarget as HTMLFormElement).reset();
                } else {
                  throw new Error();
                }
              } catch {
                toast.error("Something went wrong", { description: "Please try again." });
              }
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-[4px] border border-white/15 bg-white/5 px-4 text-[14px] text-white placeholder:text-white/40 focus:border-turmeric focus:outline-none focus:ring-1 focus:ring-turmeric"
            />
            <button
              type="submit"
              className="h-12 rounded-[4px] bg-white px-6 text-[14px] font-semibold text-foreground transition hover:bg-white/90"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-[11px] text-white/40">
            By subscribing you agree to our privacy policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

const OUR_PRODUCTS = [
  { slug: "red-curry", name: "Red Curry", img: "/brand/category/product-1.png" },
  { slug: "fish-curry-masala", name: "Fish Curry", img: "/brand/category/product-2.png" },
  { slug: "green-curry", name: "Green Curry", img: "/brand/category/product-3.png" },
  { slug: "palli-curry", name: "Palli Curry", img: "/brand/category/product-4.png" },
];

export function OurProducts() {
  const go = useUI((s) => s.go);
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeader
          align="left"
          eyebrow="Shop by category"
          title="Our Products"
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {OUR_PRODUCTS.map((p, i) => {
            const shadows = [
              "8px 8px 50px 20px rgba(137,24,22,0.35)",
              "-6px 10px 25px 6px rgba(137,24,22,0.15)",
              "0 8px 40px 14px rgba(137,24,22,0.25)",
              "-10px -4px 60px 25px rgba(137,24,22,0.40)",
            ];
            return (
              <motion.button
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => go({ name: "product", slug: p.slug })}
                className="group relative flex flex-col overflow-hidden rounded-[6px] bg-card text-left"
                style={{ boxShadow: shadows[i] }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[5px]">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-[17px] font-semibold text-white">{p.name}</h3>
                    <p className="mt-0.5 text-[12px] text-white/70">
                      Shop now <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="mt-3 text-balance text-[30px] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-[40px] lg:text-[44px]"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className={align === "center" ? "mx-auto mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-muted-foreground" : "mt-4 max-w-xl text-pretty text-[16px] leading-relaxed text-muted-foreground"}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
