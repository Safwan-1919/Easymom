"use client";

import { useState } from "react";
import {
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { categories } from "@/lib/data";

const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "All blends", view: { name: "shop" as const } },
      { label: "Chicken masalas", view: { name: "shop" as const, categoryId: "chicken" } },
      { label: "Vegetarian", view: { name: "shop" as const, categoryId: "veg" } },
      { label: "Ready-to-cook", view: { name: "shop" as const, categoryId: "ready" } },
      { label: "Pickles & chutneys", view: { name: "shop" as const, categoryId: "pickles" } },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", view: { name: "about" as const } },
      { label: "Recipes", view: { name: "recipes" as const } },
      { label: "FAQ", view: { name: "faq" as const } },
      { label: "Contact", view: { name: "faq" as const } },
    ],
  },
];

const POLICIES = [
  "Shipping policy",
  "Returns & refunds",
  "Privacy policy",
  "Terms of service",
  "Cancellation",
];

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 24 hours from our Mangalore facility. Metro cities receive in 2–3 days, the rest of India in 4–6 days. NRI orders ship DDP via partner couriers.",
  },
  {
    q: "Are your masalas preservative-free?",
    a: "Entirely. No preservatives, no added colour, no anti-caking agents. The shelf life comes from low-moisture roasting and airtight packaging, not chemistry.",
  },
  {
    q: "What's the shelf life?",
    a: "8–12 months unopened, depending on the blend. Once opened, use within 3 months and keep the pouch sealed in a cool, dry place.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes — we currently ship to the UAE, UK, Singapore, USA, Canada and Australia. Duties are prepaid at checkout so there are no surprises.",
  },
];

export function Footer() {
  const go = useUI((s) => s.go);
  return (
    <footer className="mt-auto border-t border-border bg-white">
      {/* trust strip */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-px sm:grid-cols-3">
          {[
            { icon: Truck, t: "Free shipping over ₹499", s: "Dispatched in 24 hours" },
            { icon: ShieldCheck, t: "No preservatives, ever", s: "Read the label — it's a recipe" },
            { icon: RefreshCw, t: "Easy returns", s: "Not right? We'll make it right" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-3 px-6 py-5 sm:justify-center">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] bg-card text-primary">
                <x.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-foreground">{x.t}</div>
                <div className="text-[12px] text-muted-foreground">{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* main */}
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <button onClick={() => go({ name: "home" })} className="flex items-center gap-2">
              <img
                src="/brand/easymom-logo.jpeg"
                alt="EasyMom"
                className="h-10 w-auto mix-blend-multiply"
              />
            </button>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
              Authentic South Indian masalas, ground fresh in small batches.
              Homemade flavour, built for the modern stove.
            </p>
            <div className="mt-5 space-y-2 text-[13px] text-muted-foreground">
              <a href="mailto:hello@easymom.in" className="flex items-center gap-2 transition hover:text-foreground">
                <Mail className="h-4 w-4" /> hello@easymom.in
              </a>
              <a href="tel:+918012345678" className="flex items-center gap-2 transition hover:text-foreground">
                <Phone className="h-4 w-4" /> +91 80 1234 5678
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Mangalore, Karnataka 575001
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="grid h-9 w-9 place-items-center rounded-[4px] border border-border bg-card text-foreground/70 transition hover:border-foreground/30 hover:text-primary"
                  aria-label="social"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => go(l.view)}
                      className="text-[13.5px] text-muted-foreground transition hover:text-foreground"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-foreground">
              Policies
            </h4>
            <ul className="mt-4 space-y-2.5">
              {POLICIES.map((p) => (
                <li key={p}>
                  <button
                    onClick={() => go({ name: "faq" })}
                    className="text-left text-[13.5px] text-muted-foreground transition hover:text-foreground"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQ teaser */}
        <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {FAQS.slice(0, 4).map((f) => (
            <FooterFaq key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-5 text-[12px] text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p suppressHydrationWarning>© {new Date().getFullYear()} EasyMom Foods Pvt. Ltd. · Made in Mangalore.</p>
          <div className="flex items-center gap-4">
            <span>FSSAI Lic. 10024051000678</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-leaf" /> Secure checkout · Razorpay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterFaq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-[6px] border border-border bg-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-[14px] font-medium text-foreground">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <p className="px-4 pb-4 text-[13px] leading-relaxed text-muted-foreground">{a}</p>}
    </div>
  );
}
