"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Star,
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
  const go = useUI((s) => s.go);
  return (
    <>
      {/* editorial split — storytelling image */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-[6px] shadow-premium">
              <img
                src="/brand/story-grind.png"
                alt="Hands grinding spices in a traditional stone mortar and pestle"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-2 hidden rounded-[6px] border border-border bg-card p-5 shadow-premium sm:block lg:-right-8">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-[6px] bg-primary/10">
                  <CookingPot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-[20px] font-semibold leading-none text-foreground">20kg</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">Max batch size</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              align="left"
              eyebrow="Why EasyMom"
              title="Ground the way it keeps its soul"
              description="Industrial masala is pulverised at speed — volatile oils vanish, flavour flattens. We grind in batches under 20kg on slow stones, the way a home kitchen would, just scaled enough to reach yours."
            />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {brandValues.map((v) => {
                const Icon = ICONS[v.icon] ?? Leaf;
                return (
                  <div key={v.title} className="flex gap-3">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[6px] bg-primary/8 text-primary">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-[14.5px] font-semibold text-foreground">{v.title}</h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{v.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ingredients banner */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="overflow-hidden rounded-[6px]">
            <img
              src="/brand/story-ingredients.png"
              alt="Overhead flatlay of premium South Indian spice ingredients"
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-turmeric">
              Nothing to hide
            </p>
            <h2 className="mt-3 text-balance text-[34px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[44px]">
              The label reads like a recipe, because it is one.
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/70">
              No fillers. No added colour. No anti-caking agents. Every ingredient
              is named, sourced and there for a reason. If we wouldn't put it in
              our own kitchen, it doesn't go in the pouch.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { k: "Byadgi", v: "Karnataka" },
                { k: "Tellicherry", v: "Kerala" },
                { k: "Cardamom", v: "Idukki" },
                { k: "Coriander", v: "Tamil Nadu" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-[15px] font-semibold text-white">{s.k}</div>
                  <div className="text-[12px] text-white/55">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Recipes() {
  const go = useUI((s) => s.go);
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeader
        eyebrow="From the kitchen"
        title="Recipes built around the blend"
        description="Three dishes that show what a proper masala can do — each tested, each under 30 minutes."
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {recipes.map((r, i) => (
          <motion.button
            key={r.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => go({ name: "recipes" })}
            className="group flex flex-col overflow-hidden rounded-[6px] border border-border bg-card text-left transition-shadow duration-300 hover:shadow-premium"
          >
            <div className="relative aspect-[5/3] overflow-hidden">
              <SpiceVisual
                hue={r.hue}
                name={r.title}
                seed={r.id}
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[4px] bg-card/90 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                <MapPin className="h-3 w-3 text-primary" /> {r.region}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-[18px] font-semibold leading-snug text-foreground">{r.title}</h3>
              <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">{r.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-[12px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" /> {r.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" /> Serves {r.serves}
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-semibold text-foreground">
                  Read <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-secondary/30">
      <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="Trusted in 42,000 kitchens"
          title="What families actually say"
          description="From Bengaluru to Dubai to London — the reviews that keep us grinding."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-[6px] border border-border bg-card p-6"
            >
              <div className="mb-3 flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={j < t.rating ? "h-4 w-4 fill-turmeric text-turmeric" : "h-4 w-4 text-border"}
                  />
                ))}
              </div>
              <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <div className="text-[14px] font-semibold text-foreground">{t.name}</div>
                <div className="text-[12px] text-muted-foreground">
                  {t.role} · {t.location}
                </div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-wide text-primary">
                  {t.product}
                </div>
              </figcaption>
            </motion.figure>
          ))}
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
