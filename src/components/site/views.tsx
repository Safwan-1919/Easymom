"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  Star,
  Plus,
  Minus,
  Heart,
  ShoppingBag,
  Clock,
  Users,
  MapPin,
  ShieldCheck,
  Check,
  ChevronRight,
  Flame,
  Truck,
  RotateCcw,
  Quote,
} from "lucide-react";
import { useState } from "react";
import { useUI } from "@/lib/ui-store";
import { useCart } from "@/lib/store";
import {
  products,
  categories,
  recipes,
  testimonials,
  getProductBySlug,
  getCategoryById,
  brandStats,
  type SpiceLevel,
} from "@/lib/data";
import { ProductCard } from "./product-card";
import { SpiceVisual } from "./spice-visual";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LEVELS: SpiceLevel[] = ["Medium", "Hot"];

export function ShopView() {
  const { view, go, activeLevels, toggleLevel, clearLevels, maxPrice, setMaxPrice, sortBy, setSortBy } = useUI();
  const categoryId = view.name === "shop" ? view.categoryId : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (categoryId) list = list.filter((p) => p.categoryId === categoryId);
    if (activeLevels.length) list = list.filter((p) => activeLevels.includes(p.spiceLevel));
    list = list.filter((p) => p.price <= maxPrice);
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    }
    return list;
  }, [categoryId, activeLevels, maxPrice, sortBy]);

  const Filters = (
    <div className="space-y-6">
      <div>
        <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground">Categories</p>
        <div className="space-y-1">
          <button
            onClick={() => go({ name: "shop" })}
            className={cn(
              "flex w-full items-center justify-between rounded-[4px] px-3 py-2 text-[13.5px] transition",
              !categoryId ? "bg-secondary font-semibold text-foreground" : "text-muted-foreground hover:bg-secondary/60"
            )}
          >
            All blends <span className="text-[11px]">{products.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => go({ name: "shop", categoryId: c.id })}
              className={cn(
                "flex w-full items-center justify-between rounded-[4px] px-3 py-2 text-[13.5px] transition",
                categoryId === c.id ? "bg-secondary font-semibold text-foreground" : "text-muted-foreground hover:bg-secondary/60"
              )}
            >
              {c.name} <span className="text-[11px]">{c.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground">Spice level</p>
        <div className="flex flex-wrap gap-1.5">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => toggleLevel(l)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[12px] font-medium transition",
                activeLevels.includes(l)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/70 hover:border-foreground/30"
              )}
            >
              {l}
            </button>
          ))}
          {activeLevels.length > 0 && (
            <button onClick={clearLevels} className="text-[12px] text-muted-foreground underline-offset-2 hover:underline">
              Clear
            </button>
          )}
        </div>
      </div>
      <div>
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground">Max price</p>
          <span className="text-[12px] font-medium text-foreground">{inr(maxPrice)}</span>
        </div>
        <input
          type="range"
          min={100}
          max={200}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      {/* breadcrumb + header */}
      <div className="mb-6">
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <button onClick={() => go({ name: "home" })} className="hover:text-foreground">Home</button>
          <ChevronRight className="h-3 w-3" />
          <button onClick={() => go({ name: "shop" })} className="hover:text-foreground">Shop</button>
          {category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground">{category.name}</span>
            </>
          )}
        </nav>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[34px] font-semibold leading-tight tracking-tight text-foreground sm:text-[44px]">
              {category ? category.name : "The full collection"}
            </h1>
            <p className="mt-2 max-w-xl text-[15px] text-muted-foreground">
              {category ? category.description : "Every blend, every region. Ground fresh, dispatched in 24 hours."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 rounded-[4px] border border-border bg-card px-3.5 py-2.5 text-[13px] font-medium text-foreground lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="h-10 rounded-[4px] border border-border bg-card px-3 text-[13px] font-medium text-foreground focus:border-primary focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Highest rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* desktop filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">{Filters}</div>
        </aside>

        {/* grid */}
        <div>
          <p className="mb-4 text-[13px] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "blend" : "blends"}
          </p>
          {filtered.length === 0 ? (
            <div className="rounded-[6px] border border-dashed border-border py-20 text-center">
              <p className="text-[15px] font-medium text-foreground">No blends match these filters</p>
              <button
                onClick={() => {
                  clearLevels();
                  setMaxPrice(200);
                  go({ name: "shop" });
                }}
                className="mt-3 text-[13px] font-semibold text-primary underline-offset-2 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter sheet */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
          >
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[10px] bg-card p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="grid h-9 w-9 place-items-center rounded-[4px] hover:bg-foreground/5">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {Filters}
              <button
                onClick={() => setShowFilters(false)}
                className="mt-6 w-full rounded-[4px] bg-foreground py-3.5 text-[14px] font-semibold text-card"
              >
                Show {filtered.length} blends
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductView() {
  const { view, go, openCart, setQuickView } = useUI();
  const { add, wishlist, toggleWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const slug = view.name === "product" ? view.slug : "";
  const p = getProductBySlug(slug);

  if (!p) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center">
        <p className="text-[18px] font-semibold">Blend not found</p>
        <button onClick={() => go({ name: "shop" })} className="mt-4 text-primary underline">Back to shop</button>
      </div>
    );
  }

  const category = getCategoryById(p.categoryId);
  const related = products.filter((x) => x.categoryId === p.categoryId && x.id !== p.id).slice(0, 4);
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <button onClick={() => go({ name: "home" })} className="hover:text-foreground">Home</button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={() => go({ name: "shop" })} className="hover:text-foreground">Shop</button>
        <ChevronRight className="h-3 w-3" />
        <button onClick={() => go({ name: "shop", categoryId: p.categoryId })} className="hover:text-foreground">
          {category?.name}
        </button>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* visual */}
        <div>
          <div className="relative overflow-hidden rounded-[6px] border border-border">
            <img
              src={p.images ? p.images[selectedImg] : p.img}
              alt={p.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {p.images && p.images.length > 1 ? (
            <div className="mt-3 flex gap-2">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`h-16 w-16 overflow-hidden rounded-[4px] border-2 transition ${
                    selectedImg === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img src={img} alt={`${p.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {["Whole spices", "Stone-ground", "Small batch", "Sealed fresh"].map((t, i) => (
                <div key={t} className="rounded-[6px] border border-border bg-card p-3 text-center">
                  <div
                    className="mx-auto mb-2 h-8 w-8 rounded-full"
                    style={{ background: `radial-gradient(circle at 35% 30%, oklch(0.65 0.15 ${p.hue + i * 10}), oklch(0.45 0.17 ${p.hue + i * 10}))` }}
                  />
                  <p className="text-[11px] font-medium text-muted-foreground">{t}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* details */}
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">{category?.name}</p>
          <h1 className="mt-1.5 text-[32px] font-semibold leading-tight tracking-tight text-foreground sm:text-[40px]">
            {p.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[13px]">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-turmeric text-turmeric" />
              <strong className="font-semibold">{p.rating}</strong>
              <span className="text-muted-foreground">({p.reviewCount} reviews)</span>
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {p.origin}</span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1 text-muted-foreground"><Flame className="h-3.5 w-3.5 text-primary" /> {p.spiceLevel}</span>
          </div>

          <p className="mt-5 text-[16px] leading-relaxed text-foreground/80">{p.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={Clock} label="Cook time" value={p.cookingTime} />
            <Stat icon={Users} label="Serves" value={p.servings} />
            <Stat icon={ShieldCheck} label="Shelf life" value={p.shelfLife} />
            <Stat icon={RotateCcw} label="Weight" value={p.weight} />
          </div>

          <div className="mt-6">
            <p className="mb-2 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
              Inside the blend
            </p>
            <div className="flex flex-wrap gap-1.5">
              {p.ingredients.map((ing) => (
                <span key={ing} className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-[12.5px] text-foreground/80">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* price + add */}
          <div className="mt-7 rounded-[6px] border border-border bg-card p-5">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[32px] font-semibold tracking-tight text-foreground">{inr(p.price)}</span>
                  {p.mrp > p.price && (
                    <>
                      <span className="text-[16px] text-muted-foreground line-through">{inr(p.mrp)}</span>
                      <span className="rounded-[4px] bg-primary/10 px-2 py-0.5 text-[12px] font-semibold text-primary">
                        {discount}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground">{p.weight} · incl. all taxes</p>
              </div>
              <button
                onClick={() => {
                  toggleWishlist(p.id);
                  toast(wishlist.includes(p.id) ? "Removed from wishlist" : "Saved to wishlist");
                }}
                className="grid h-12 w-12 place-items-center rounded-[4px] border border-border transition hover:border-primary/40"
                aria-label="Wishlist"
              >
                <Heart className={cn("h-5 w-5", wishlist.includes(p.id) && "fill-primary text-primary")} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center rounded-[4px] border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center text-foreground/70 transition hover:text-foreground" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-[16px] font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center text-foreground/70 transition hover:text-foreground" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(p, qty);
                  toast.success("Added to cart", { description: `${qty} × ${p.name}` });
                  openCart();
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3.5 text-[14px] font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <ShoppingBag className="h-4 w-4" /> Add to cart · {inr(p.price * qty)}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-muted-foreground">
              <span className="flex items-center justify-center gap-1"><Truck className="h-3.5 w-3.5 text-leaf" /> Free over ₹499</span>
              <span className="flex items-center justify-center gap-1"><Check className="h-3.5 w-3.5 text-leaf" /> Dispatched 24h</span>
              <span className="flex items-center justify-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-leaf" /> Secure pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-[24px] font-semibold tracking-tight">You may also like</h2>
            <button onClick={() => go({ name: "shop", categoryId: p.categoryId })} className="text-[13px] font-semibold text-primary hover:underline">
              View all in {category?.name}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {related.map((r, i) => (
              <ProductCard key={r.id} product={r} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-[6px] border border-border bg-secondary/30 p-3">
      <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
      <div className="mt-1.5 text-[13px] font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}

export function RecipesView() {
  const go = useUI((s) => s.go);
  const [open, setOpen] = useState<string | null>(recipes[0]?.id ?? null);
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <button onClick={() => go({ name: "home" })} className="hover:text-foreground">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Recipes</span>
      </nav>
      <div className="max-w-2xl">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">From the EasyMom kitchen</p>
        <h1 className="mt-3 text-[40px] font-semibold leading-[1.08] tracking-tight sm:text-[52px]">
          Recipes that earn the blend.
        </h1>
        <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
          Each recipe is built around one of our masalas and tested until it works on a Tuesday night.
          Real timings, real temperatures, no 40-ingredient lists.
        </p>
      </div>

      <div className="mt-12 space-y-6">
        {recipes.map((r, i) => {
          const isOpen = open === r.id;
          return (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="overflow-hidden rounded-[6px] border border-border bg-card"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr]">
                <div className="relative aspect-[5/3] lg:aspect-auto">
                  <img src={products.find((p) => p.slug === r.productSlug)?.img || ""} alt={r.title} className="h-full w-full object-cover" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[4px] bg-card/90 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                    <MapPin className="h-3 w-3 text-primary" /> {r.region}
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.time}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Serves {r.serves}</span>
                    <span className="rounded-[4px] bg-secondary px-2 py-0.5 font-medium">{r.difficulty}</span>
                  </div>
                  <h2 className="mt-3 text-[24px] font-semibold leading-tight tracking-tight">{r.title}</h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{r.excerpt}</p>

                  <button
                    onClick={() => setOpen(isOpen ? null : r.id)}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-[4px] bg-foreground px-4 py-2.5 text-[13px] font-semibold text-card transition hover:bg-primary hover:text-primary-foreground"
                  >
                    {isOpen ? "Hide recipe" : "Show the recipe"}
                    <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ol className="mt-5 space-y-3 border-t border-border pt-5">
                          {r.steps.map((s, idx) => (
                            <li key={idx} className="flex gap-3 text-[14px] leading-relaxed text-foreground/85">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-[12px] font-semibold text-primary-foreground">
                                {idx + 1}
                              </span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ol>
                        <button
                          onClick={() => go({ name: "product", slug: r.productSlug })}
                          className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline"
                        >
                          Get the masala for this recipe <ChevronRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

export function AboutView() {
  const go = useUI((s) => s.go);
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <button onClick={() => go({ name: "home" })} className="hover:text-foreground">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Our story</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Our story</p>
          <h1 className="mt-3 text-[40px] font-semibold leading-[1.06] tracking-tight sm:text-[56px]">
            A South Indian kitchen, made effortless.
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-foreground/80">
            EasyMom began in a Mangalore kitchen in 2019, when a working mother
            ground her mother's chicken masala blend into a pouch so her sister
            in Dubai could taste home on a Wednesday. The pouch kept getting
            passed around — to colleagues, neighbours, friends abroad — until it
            became clear this was bigger than one family.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-foreground/80">
            Today we work with small spice co-ops across Karnataka, Kerala and
            Tamil Nadu, grinding in batches under 20kg on slow stones. Every
            blend is a real recipe from a real kitchen — built so a 15-minute
            cook still tastes like a 90-minute one.
          </p>
        </div>
        <div className="overflow-hidden rounded-[6px] shadow-premium">
          <img src="/brand/story-grind.png" alt="Grinding spices in a stone mortar" className="aspect-[4/5] w-full object-cover" />
        </div>
      </div>

      {/* stats */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-border lg:grid-cols-4">
        {brandStats.map((s) => (
          <div key={s.label} className="bg-card p-6 text-center">
            <div className="text-[32px] font-semibold tracking-tight text-foreground">{s.value}</div>
            <div className="mt-1 text-[12px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* testimonials */}
      <div className="mt-20">
        <h2 className="text-center text-[28px] font-semibold tracking-tight">Trusted in 42,000 kitchens</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-[6px] border border-border bg-card p-6">
              <Quote className="h-6 w-6 text-primary/30" />
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
              <figcaption className="mt-4 border-t border-border pt-4">
                <div className="text-[14px] font-semibold">{t.name}</div>
                <div className="text-[12px] text-muted-foreground">{t.role} · {t.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FaqView() {
  const go = useUI((s) => s.go);
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Orders are dispatched within 24 hours from our Mangalore facility. Metro cities receive in 2–3 days, the rest of India in 4–6 days. International orders to the UAE, UK, Singapore, USA, Canada and Australia take 7–12 days, shipped DDP.",
    },
    {
      q: "Are your masalas preservative-free?",
      a: "Entirely. No preservatives, no added colour, no anti-caking agents. The shelf life comes from low-moisture roasting and airtight packaging, not chemistry. Read the back of any pouch — it reads like a recipe.",
    },
    {
      q: "What's the shelf life?",
      a: "8–12 months unopened, depending on the blend. Once opened, use within 3 months and keep the pouch sealed in a cool, dry place away from direct sunlight.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes — we currently ship to the UAE, UK, Singapore, USA, Canada and Australia. Duties are prepaid at checkout (DDP) so there are no surprise charges on delivery.",
    },
    {
      q: "What's your return policy?",
      a: "If a blend arrives damaged or isn't what you expected, write to hello@easymom.in within 7 days and we'll replace or refund — no questions, no fuss. Spoilage in transit is on us.",
    },
    {
      q: "Is the packaging recyclable?",
      a: "Our pouches are recyclable LDPE (category 4). The outer mailer is recycled kraft. We're transitioning to compostable pouches across the range by Q3 2025.",
    },
    {
      q: "How do I track my order?",
      a: "Every order gets a tracking link by email and SMS within 24 hours of dispatch. You can also track from the order confirmation page.",
    },
    {
      q: "Do you offer bulk or gifting?",
      a: "Yes — we do corporate gifting, wedding favours and wholesale. Write to hello@easymom.in with your requirements and we'll put together a custom selection.",
    },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      <nav className="mb-6 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <button onClick={() => go({ name: "home" })} className="hover:text-foreground">Home</button>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">FAQ</span>
      </nav>
      <div className="text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary">Help centre</p>
        <h1 className="mt-3 text-[36px] font-semibold tracking-tight sm:text-[44px]">Frequently asked</h1>
        <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
          Everything about shipping, ingredients, storage and returns. Can't find your answer? Write to hello@easymom.in.
        </p>
      </div>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="overflow-hidden rounded-[6px] border border-border bg-card">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <span className="text-[15px] font-semibold text-foreground">{f.q}</span>
              <ChevronRight className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open === i && "rotate-90")} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
