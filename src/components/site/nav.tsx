"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { useCart } from "@/lib/store";
import { categories, products } from "@/lib/data";
import { cartCount } from "@/lib/store";
import { cn } from "@/lib/utils";
import { SpiceVisual } from "./spice-visual";

const NAV_LINKS = [
  { label: "Shop", view: { name: "shop" as const } },
  { label: "Recipes", view: { name: "recipes" as const } },
  { label: "Our Story", view: { name: "about" as const } },
];

export function Nav() {
  const { go, view, openCart, toggleMobileNav, mobileNavOpen, setMobileNav, openSearch } =
    useUI();
  const lines = useCart((s) => s.lines);
  const wishlist = useCart((s) => s.wishlist);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);

  useEffect(() => {
    setMobileNav(false);
  }, [view, setMobileNav]);

  return (
    <>
      <motion.header
        initial={false}
        className="fixed inset-x-0 top-0 z-50 border-b border-black/6 bg-white/90 shadow-soft backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* left: mobile menu + logo + nav links */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMobileNav}
              className="grid h-9 w-9 place-items-center rounded-[4px] text-foreground/80 transition hover:bg-foreground/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              onClick={() => go({ name: "home" })}
              className="flex items-center gap-2"
              aria-label="EasyMom home"
            >
              <img
                src="/brand/easymom-logo.jpeg"
                alt="EasyMom"
                className="h-20 w-auto mix-blend-multiply"
              />
            </button>
            {/* desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {NAV_LINKS.map((link) => {
                const active =
                  view.name === link.view.name &&
                  (view.name === "shop"
                    ? (view as { categoryId?: string }).categoryId ===
                      (link.view as { categoryId?: string }).categoryId
                    : true);
                return (
                  <button
                    key={link.label}
                    onClick={() => go(link.view)}
                    onMouseEnter={() =>
                      link.view.name === "shop" &&
                      !(link.view as { categoryId?: string }).categoryId
                        ? setMegaOpen("shop")
                        : setMegaOpen(null)
                    }
                    className={cn(
                      "relative rounded-[4px] px-3 py-2 text-[13.5px] font-medium transition-colors",
                      "text-foreground/70 hover:text-foreground",
                      active && "text-foreground"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-px h-px bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* right: search bar + actions */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                onFocus={openSearch}
                className="h-9 w-64 rounded-[4px] border border-border bg-secondary/30 px-3 text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/60 focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={openSearch}
              className="grid h-9 w-9 place-items-center rounded-[4px] transition text-foreground/80 hover:bg-foreground/5 sm:hidden"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
            <button
              onClick={() => useUI.getState().setWishlistOpen(true)}
              className="relative hidden h-9 w-9 place-items-center rounded-[4px] transition text-foreground/80 hover:bg-foreground/5 sm:grid"
              aria-label="Wishlist"
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-turmeric text-[9px] font-bold text-turmeric-foreground">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={openCart}
              className="relative grid h-9 w-9 place-items-center rounded-[4px] transition text-foreground/80 hover:bg-foreground/5"
              aria-label="Cart"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {cartCount(lines) > 0 && (
                <motion.span
                  key={cartCount(lines)}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                >
                  {cartCount(lines)}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* mega menu */}
        <AnimatePresence>
          {megaOpen === "shop" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onMouseLeave={() => setMegaOpen(null)}
              className="absolute inset-x-0 top-full hidden border-t border-border bg-card/95 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto grid max-w-[1280px] grid-cols-[1.4fr_1fr] gap-8 px-8 py-7">
                <div>
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Shop by category
                  </p>
                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setMegaOpen(null);
                          go({ name: "shop", categoryId: c.id });
                        }}
                        className="group flex flex-col gap-0.5 rounded-[4px] p-2 text-left transition hover:bg-secondary/60"
                      >
                        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
                          {c.name}
                          <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                        </span>
                        <span className="text-[12px] leading-snug text-muted-foreground">
                          {c.tagline}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-[6px] border border-border bg-secondary/40 p-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Most loved
                  </p>
                  <div className="space-y-3">
                    {products
                      .filter((p) => p.bestSeller)
                      .slice(0, 3)
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setMegaOpen(null);
                            go({ name: "product", slug: p.slug });
                          }}
                          className="flex w-full items-center gap-3 rounded-[4px] p-1 text-left transition hover:bg-card"
                        >
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[6px]">
                            <SpiceVisual hue={p.hue} name={p.name} seed={p.id} className="h-full w-full" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-foreground">{p.name}</p>
                            <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                              <Flame className="h-3 w-3 text-primary" /> {p.cookingTime}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && <MobileNav />}
      </AnimatePresence>
    </>
  );
}

function MobileNav() {
  const { go, setMobileNav } = useUI();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] lg:hidden"
    >
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={() => setMobileNav(false)}
      />
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-card shadow-premium"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <img
              src="/brand/easymom-logo.jpeg"
              alt="EasyMom"
              className="h-9 w-auto mix-blend-multiply"
            />
          </div>
          <button
            onClick={() => setMobileNav(false)}
            className="grid h-9 w-9 place-items-center rounded-[4px] hover:bg-foreground/5"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="scroll-elegant flex-1 overflow-y-auto px-3 py-4">
          <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Browse
          </p>
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => go(link.view)}
              className="flex w-full items-center justify-between rounded-[6px] px-3 py-3 text-left text-[15px] font-medium text-foreground transition hover:bg-secondary"
            >
              {link.label}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
          <p className="px-2 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Categories
          </p>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => go({ name: "shop", categoryId: c.id })}
              className="flex w-full items-center justify-between rounded-[6px] px-3 py-2.5 text-left text-[14px] text-foreground/80 transition hover:bg-secondary"
            >
              {c.name}
              <span className="text-[12px] text-muted-foreground">{c.count}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-border px-5 py-4">
          <button
            onClick={() => go({ name: "shop" })}
            className="w-full rounded-[4px] bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Shop all masalas
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
