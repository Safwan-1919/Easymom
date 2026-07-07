"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  Tag,
  ArrowRight,
  Search as SearchIcon,
  Heart,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useUI } from "@/lib/ui-store";
import { useCart, cartSubtotal, cartCount } from "@/lib/store";
import { products, categories } from "@/lib/data";
import { inr } from "@/lib/format";
import { SpiceVisual } from "./spice-visual";
import { ProductCard } from "./product-card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cartOpen, closeCart, setCheckout } = useUI();
  const { lines, setQty, remove, coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");

  const subtotal = cartSubtotal(lines);
  const discount = coupon ? Math.round((subtotal * coupon.discountPct) / 100) : 0;
  const shipping = subtotal - discount >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={closeCart} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-premium"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-foreground" strokeWidth={1.75} />
                <h2 className="text-[16px] font-semibold text-foreground">Your cart</h2>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {cartCount(lines)}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="grid h-9 w-9 place-items-center rounded-[4px] hover:bg-foreground/5"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
                  <ShoppingBag className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-foreground">Your cart is empty</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Add a blend or two — the kitchen is waiting.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    useUI.getState().go({ name: "shop" });
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-[4px] bg-foreground px-5 py-3 text-[13px] font-semibold text-card transition hover:bg-primary hover:text-primary-foreground"
                >
                  Browse the collection <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                {/* lines */}
                <div className="scroll-elegant flex-1 overflow-y-auto px-4 py-4">
                  {/* free shipping progress */}
                  <FreeShipBar subtotal={subtotal - discount} />
                  <div className="mt-4 space-y-3">
                    <AnimatePresence initial={false}>
                      {lines.map((l) => (
                        <motion.div
                          key={l.productId}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-3 rounded-[6px] border border-border bg-card p-3"
                        >
                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-[6px]">
                            <SpiceVisual hue={l.hue} name={l.name} seed={l.productId} className="h-full w-full" />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <p className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-foreground">
                                {l.name}
                              </p>
                              <button
                                onClick={() => remove(l.productId)}
                                className="grid h-7 w-7 shrink-0 place-items-center rounded-[4px] text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                                aria-label="Remove"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <span className="text-[11px] text-muted-foreground">{l.weight}</span>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center rounded-[4px] border border-border">
                                <button
                                  onClick={() => setQty(l.productId, l.qty - 1)}
                                  className="grid h-7 w-7 place-items-center text-foreground/70 transition hover:text-foreground"
                                  aria-label="Decrease"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-7 text-center text-[13px] font-semibold">{l.qty}</span>
                                <button
                                  onClick={() => setQty(l.productId, l.qty + 1)}
                                  className="grid h-7 w-7 place-items-center text-foreground/70 transition hover:text-foreground"
                                  aria-label="Increase"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                              <span className="text-[14px] font-semibold text-foreground">
                                {inr(l.price * l.qty)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* coupon */}
                  <div className="mt-5 rounded-[6px] border border-dashed border-border bg-secondary/40 p-3">
                    {coupon ? (
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[13px] font-medium text-leaf">
                          <Tag className="h-4 w-4" /> {coupon.code} · {coupon.discountPct}% off
                        </span>
                        <button
                          onClick={() => {
                            removeCoupon();
                            setCode("");
                          }}
                          className="text-[12px] text-muted-foreground underline-offset-2 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (applyCoupon(code)) {
                            toast.success("Coupon applied", { description: `${code.toUpperCase()} active` });
                            setCode("");
                          } else {
                            toast.error("Invalid code", { description: "Try EASY10, FIRST15 or FAMILIAR20" });
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Coupon code"
                          className="h-9 flex-1 rounded-[4px] border border-border bg-card px-3 text-[13px] uppercase placeholder:normal-case placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          type="submit"
                          className="h-9 rounded-[4px] bg-foreground px-4 text-[12px] font-semibold text-card transition hover:bg-primary hover:text-primary-foreground"
                        >
                          Apply
                        </button>
                      </form>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      Try <strong className="text-foreground">EASY10</strong> for 10% off your first order.
                    </p>
                  </div>
                </div>

                {/* summary */}
                <div className="border-t border-border bg-card px-5 py-4">
                  <div className="space-y-1.5 text-[13px]">
                    <Row label="Subtotal" value={inr(subtotal)} />
                    {discount > 0 && (
                      <Row label={`Discount (${coupon?.discountPct}%)`} value={`− ${inr(discount)}`} accent="leaf" />
                    )}
                    <Row
                      label="Shipping"
                      value={shipping === 0 ? "Free" : inr(shipping)}
                      accent={shipping === 0 ? "leaf" : undefined}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-[14px] font-semibold text-foreground">Total</span>
                    <span className="text-[20px] font-semibold text-foreground">{inr(total)}</span>
                  </div>
                  <button
                    onClick={() => {
                      closeCart();
                      setCheckout(true);
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-[4px] bg-primary px-5 py-3.5 text-[14px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                  >
                    Checkout securely <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-2 text-center text-[11px] text-muted-foreground">
                    Guest checkout · No account needed · Razorpay secured
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FreeShipBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, 499 - subtotal);
  const pct = Math.min(100, (subtotal / 499) * 100);
  return (
    <div className="rounded-[6px] bg-secondary/60 px-3.5 py-3">
      <p className="text-[12px] text-foreground">
        {remaining > 0 ? (
          <>
            Add <strong>{inr(remaining)}</strong> for <strong>free shipping</strong>
          </>
        ) : (
          <>You've unlocked <strong className="text-leaf">free shipping</strong></>
        )}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-turmeric"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: "leaf" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium", accent === "leaf" ? "text-leaf" : "text-foreground")}>{value}</span>
    </div>
  );
}

export function SearchOverlay() {
  const { searchOpen, closeSearch, go } = useUI();
  const [q, setQ] = useState("");
  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.includes(q.toLowerCase()))
      )
    : products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80]"
        >
          <div className="absolute inset-0 z-0 bg-foreground/40 backdrop-blur-sm" onClick={closeSearch} />
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto mt-[8vh] w-[92%] max-w-2xl overflow-hidden rounded-[6px] border border-border bg-card shadow-premium"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <SearchIcon className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search masalas, recipes, ingredients…"
                className="flex-1 bg-transparent text-[16px] text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                onClick={closeSearch}
                className="rounded-[4px] border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground"
              >
                ESC
              </button>
            </div>
            <div className="scroll-elegant max-h-[55vh] overflow-y-auto p-3">
              {!q && (
                <p className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Most loved
                </p>
              )}
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center">
                  <p className="text-[14px] font-medium text-foreground">No blends found for "{q}"</p>
                  <p className="mt-1 text-[13px] text-muted-foreground">Try "chicken", "sambar" or "podi".</p>
                </div>
              ) : (
                results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      go({ name: "product", slug: p.slug });
                      closeSearch();
                    }}
                    className="flex w-full items-center gap-3 rounded-[6px] p-2.5 text-left transition hover:bg-secondary"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[6px]">
                      <SpiceVisual hue={p.hue} name={p.name} seed={p.id} className="h-full w-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-foreground">{p.name}</p>
                      <p className="truncate text-[12px] text-muted-foreground">{p.shortDesc}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <Star className="h-3 w-3 fill-turmeric text-turmeric" /> {p.rating}
                    </div>
                    <span className="text-[14px] font-semibold text-foreground">{inr(p.price)}</span>
                  </button>
                ))
              )}
            </div>
            {!q && (
              <div className="border-t border-border px-5 py-3">
                <div className="flex flex-wrap gap-2">
                  {["Chicken", "Sambar", "Gunpowder", "Fish curry", "Biryani"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setQ(t)}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[12px] text-foreground/80 transition hover:border-foreground/30"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, go } = useUI();
  const { wishlist, toggleWishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <AnimatePresence>
      {wishlistOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70]"
        >
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setWishlistOpen(false)} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-premium"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" strokeWidth={1.75} />
                <h2 className="text-[16px] font-semibold">Wishlist</h2>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {items.length}
                </span>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-[4px] hover:bg-foreground/5"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="scroll-elegant flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary">
                    <Heart className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <p className="text-[15px] font-semibold">No saved blends yet</p>
                  <p className="max-w-[240px] text-[13px] text-muted-foreground">
                    Tap the heart on any blend to save it here for later.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((p) => (
                    <div key={p.id} className="flex gap-3 rounded-[6px] border border-border p-3">
                      <button
                        onClick={() => {
                          setWishlistOpen(false);
                          go({ name: "product", slug: p.slug });
                        }}
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-[6px]"
                      >
                        <SpiceVisual hue={p.hue} name={p.name} seed={p.id} className="h-full w-full" />
                      </button>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="line-clamp-2 text-[13.5px] font-semibold leading-snug">{p.name}</p>
                        <span className="text-[12px] text-muted-foreground">{inr(p.price)} · {p.weight}</span>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="mt-auto self-start text-[12px] text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
