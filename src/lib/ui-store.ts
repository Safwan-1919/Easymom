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

function viewToPath(v: View): string {
  switch (v.name) {
    case "home":
      return "/";
    case "shop":
      return v.categoryId ? `/shop/${v.categoryId}` : "/shop";
    case "product":
      return `/product/${v.slug}`;
    case "recipes":
      return "/recipes";
    case "about":
      return "/about";
    case "faq":
      return "/faq";
    default:
      return "/";
  }
}

function pathToView(pathname: string): View {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "shop") {
    if (parts[1]) return { name: "shop", categoryId: parts[1] };
    return { name: "shop" };
  }
  if (parts[0] === "product" && parts[1]) return { name: "product", slug: parts[1] };
  if (parts[0] === "recipes") return { name: "recipes" };
  if (parts[0] === "about") return { name: "about" };
  if (parts[0] === "faq") return { name: "faq" };
  return { name: "home" };
}

type UIState = {
  view: View;
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  quickView: Product | null;
  checkoutOpen: boolean;
  orderConfirmed: boolean;
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
  view: typeof window !== "undefined" ? pathToView(window.location.pathname) : { name: "home" },
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
    const path = viewToPath(v);
    const currentPath = window.location.pathname;
    if (path !== currentPath) {
      window.history.pushState(v, "", path);
    }
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

if (typeof window !== "undefined") {
  window.addEventListener("popstate", (e) => {
    const view = e.state && e.state.name ? (e.state as View) : pathToView(window.location.pathname);
    useUI.setState({ view, mobileNavOpen: false, searchOpen: false });
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}
