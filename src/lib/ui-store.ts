"use client";

import { create } from "zustand";
import type { Product, Category, SpiceLevel } from "@/lib/data";

export type View =
  | { name: "home" }
  | { name: "shop"; categoryId?: string }
  | { name: "product"; slug: string }
  | { name: "recipes" }
  | { name: "about" }
  | { name: "faq" };

type UIState = {
  view: View;
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  quickView: Product | null;
  checkoutOpen: boolean;
  orderConfirmed: boolean;
  // filters for shop
  activeLevels: SpiceLevel[];
  maxPrice: number;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating";
  wishlistOpen: boolean;
  go: (v: View) => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileNav: () => void;
  setMobileNav: (v: boolean) => void;
  setQuickView: (p: Product | null) => void;
  setCheckout: (v: boolean) => void;
  setOrderConfirmed: (v: boolean) => void;
  toggleLevel: (l: SpiceLevel) => void;
  clearLevels: () => void;
  setMaxPrice: (n: number) => void;
  setSortBy: (s: UIState["sortBy"]) => void;
  setWishlistOpen: (v: boolean) => void;
};

export const useUI = create<UIState>((set, get) => ({
  view: { name: "home" },
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  quickView: null,
  checkoutOpen: false,
  orderConfirmed: false,
  activeLevels: [],
  maxPrice: 200,
  sortBy: "featured",
  wishlistOpen: false,
  go: (v) => {
    set({ view: v, mobileNavOpen: false, searchOpen: false });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    return true;
  },
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  setMobileNav: (v) => set({ mobileNavOpen: v }),
  setQuickView: (p) => set({ quickView: p }),
  setCheckout: (v) => set({ checkoutOpen: v }),
  setOrderConfirmed: (v) => set({ orderConfirmed: v }),
  toggleLevel: (l) =>
    set((s) => ({
      activeLevels: s.activeLevels.includes(l)
        ? s.activeLevels.filter((x) => x !== l)
        : [...s.activeLevels, l],
    })),
  clearLevels: () => set({ activeLevels: [] }),
  setMaxPrice: (n) => set({ maxPrice: n }),
  setSortBy: (s) => set({ sortBy: s }),
  setWishlistOpen: (v) => set({ wishlistOpen: v }),
}));
