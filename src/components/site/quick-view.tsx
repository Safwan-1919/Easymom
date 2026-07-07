"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Plus, Minus, Heart, ShoppingBag, Clock, Users, MapPin, ShieldCheck, Check } from "lucide-react";
import { useState } from "react";
import { useUI } from "@/lib/ui-store";
import { useCart } from "@/lib/store";
import { inr } from "@/lib/format";
import { getCategoryById } from "@/lib/data";
import { SpiceVisual } from "./spice-visual";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const LEVEL_COLOR: Record<string, string> = {
  Mild: "bg-leaf/15 text-leaf",
  Medium: "bg-turmeric/20 text-[oklch(0.45_0.12_70)]",
  Hot: "bg-primary/12 text-primary",
  Fiery: "bg-primary/20 text-primary",
};

export function QuickView() {
  const { quickView, setQuickView, openCart } = useUI();
  const { add, wishlist, toggleWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const p = quickView;

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setQuickView(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[88vh] w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[6px] bg-card shadow-premium sm:grid-cols-2"
          >
            <button
              onClick={() => setQuickView(null)}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/80 text-foreground backdrop-blur-sm transition hover:bg-card"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* visual */}
            <div className="relative aspect-square sm:aspect-auto">
              <img src={p.images ? p.images[0] : p.img} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute left-4 top-4 flex flex-col gap-1.5">
                {p.bestSeller && (
                  <span className="rounded-[4px] bg-foreground/90 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                    Bestseller
                  </span>
                )}
                <span className={cn("rounded-[4px] px-2 py-0.5 text-[10px] font-semibold uppercase", LEVEL_COLOR[p.spiceLevel])}>
                  {p.spiceLevel} spice
                </span>
              </div>
            </div>

            {/* body */}
            <div className="scroll-elegant flex max-h-[88vh] flex-col overflow-y-auto p-6 sm:p-7">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
                {getCategoryById(p.categoryId)?.name}
              </p>
              <h2 className="mt-1.5 text-[24px] font-semibold leading-tight tracking-tight text-foreground sm:text-[28px]">
                {p.name}
              </h2>
              <div className="mt-2 flex items-center gap-3 text-[13px]">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-turmeric text-turmeric" />
                  <strong className="font-semibold">{p.rating}</strong>
                  <span className="text-muted-foreground">({p.reviewCount} reviews)</span>
                </span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.origin}
                </span>
              </div>

              <p className="mt-4 text-[14.5px] leading-relaxed text-foreground/80">{p.shortDesc}</p>

              <div className="mt-5 grid grid-cols-3 gap-2 rounded-[6px] border border-border bg-secondary/30 p-3 text-center">
                <Meta icon={Clock} label="Cook time" value={p.cookingTime} />
                <Meta icon={Users} label="Serves" value={p.servings} />
                <Meta icon={ShieldCheck} label="Shelf life" value={p.shelfLife} />
              </div>

              <div className="mt-5">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Inside the blend
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="rounded-full border border-border bg-card px-2.5 py-1 text-[12px] text-foreground/80"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[28px] font-semibold text-foreground">{inr(p.price)}</span>
                    {p.mrp > p.price && (
                      <span className="text-[14px] text-muted-foreground line-through">{inr(p.mrp)}</span>
                    )}
                  </div>
                  <p className="text-[12px] text-muted-foreground">{p.weight} · incl. all taxes</p>
                </div>
                <button
                  onClick={() => {
                    toggleWishlist(p.id);
                    toast(wishlist.includes(p.id) ? "Removed from wishlist" : "Saved to wishlist");
                  }}
                  className="grid h-11 w-11 place-items-center rounded-[4px] border border-border transition hover:border-primary/40"
                  aria-label="Wishlist"
                >
                  <Heart className={cn("h-5 w-5", wishlist.includes(p.id) && "fill-primary text-primary")} />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center rounded-[4px] border border-border">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="grid h-11 w-11 place-items-center text-foreground/70 transition hover:text-foreground"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-[15px] font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="grid h-11 w-11 place-items-center text-foreground/70 transition hover:text-foreground"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    add(p, qty);
                    toast.success("Added to cart", { description: `${qty} × ${p.name}` });
                    setQuickView(null);
                    openCart();
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3.5 text-[14px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to cart · {inr(p.price * qty)}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-leaf" /> Free shipping over ₹499</span>
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-leaf" /> Dispatched in 24h</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Meta({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div>
      <Icon className="mx-auto h-4 w-4 text-primary" strokeWidth={1.75} />
      <div className="mt-1.5 text-[13px] font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
