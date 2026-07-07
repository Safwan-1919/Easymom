"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CreditCard,
  Loader2,
  PartyPopper,
  ArrowRight,
} from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { useCart, cartSubtotal, cartCount } from "@/lib/store";
import { inr, orderId } from "@/lib/format";
import { SpiceVisual } from "./spice-visual";

type Step = "details" | "payment" | "processing";

export function Checkout() {
  const { checkoutOpen, setCheckout, orderConfirmed, setOrderConfirmed } = useUI();
  const { lines, coupon, clear } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [placedOrder, setPlacedOrder] = useState<{ id: string; total: number } | null>(null);

  const subtotal = cartSubtotal(lines);
  const discount = coupon ? Math.round((subtotal * coupon.discountPct) / 100) : 0;
  const shipping = subtotal - discount >= 499 || subtotal === 0 ? 0 : 49;
  const total = subtotal - discount + shipping;

  const close = () => {
    setCheckout(false);
    setStep("details");
  };

  const placeOrder = async () => {
    setStep("processing");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subtotal,
          discount,
          shipping,
          total,
          couponCode: coupon?.code,
          itemsJson: JSON.stringify(lines),
        }),
      });
      const data = await res.json();
      // simulate payment + processing
      await new Promise((r) => setTimeout(r, 1200));
      setPlacedOrder({ id: data.orderId || orderId(), total });
      setOrderConfirmed(true);
      clear();
    } catch {
      setStep("payment");
    }
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90]"
        >
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-start justify-center overflow-y-auto p-3 sm:p-6"
          >
            <div className="relative my-auto w-full max-w-3xl overflow-hidden rounded-[6px] bg-card shadow-premium">
              <button
                onClick={close}
                className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/80 text-foreground backdrop-blur-sm transition hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <AnimatePresence mode="wait">
                {orderConfirmed && placedOrder ? (
                  <OrderSuccess
                    key="success"
                    orderId={placedOrder.id}
                    total={placedOrder.total}
                    email={form.email}
                    onClose={close}
                  />
                ) : (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]"
                  >
                    {/* form side */}
                    <div className="p-6 sm:p-8">
                      <div className="mb-6 flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        <h2 className="text-[20px] font-semibold tracking-tight">Guest checkout</h2>
                      </div>

                      {/* steps */}
                      <div className="mb-6 flex items-center gap-2 text-[12px]">
                        <StepDot active n={1} label="Details" done={step !== "details"} />
                        <div className="h-px flex-1 bg-border" />
                        <StepDot active={step !== "details"} n={2} label="Payment" />
                        <div className="h-px flex-1 bg-border" />
                        <StepDot active={step === "processing"} n={3} label="Done" />
                      </div>

                      {step === "details" && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setStep("payment");
                          }}
                          className="space-y-4"
                        >
                          <Field label="Email" required>
                            <input
                              type="email"
                              required
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="you@email.com"
                              className={inputCls}
                            />
                          </Field>
                          <div className="grid grid-cols-2 gap-3">
                            <Field label="Full name" required>
                              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Anjali Rao" />
                            </Field>
                            <Field label="Phone" required>
                              <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+91 98765 43210" />
                            </Field>
                          </div>
                          <Field label="Address" required>
                            <textarea
                              required
                              rows={2}
                              value={form.address}
                              onChange={(e) => setForm({ ...form, address: e.target.value })}
                              className={inputCls}
                              placeholder="Flat, building, street, area"
                            />
                          </Field>
                          <div className="grid grid-cols-3 gap-3">
                            <Field label="City" required>
                              <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputCls} placeholder="Bengaluru" />
                            </Field>
                            <Field label="State" required>
                              <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={inputCls} placeholder="Karnataka" />
                            </Field>
                            <Field label="Pincode" required>
                              <input required value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={inputCls} placeholder="560001" />
                            </Field>
                          </div>
                          <Field label="Delivery notes (optional)">
                            <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className={inputCls} placeholder="Leave at the door, call on arrival…" />
                          </Field>
                          <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-foreground py-3.5 text-[14px] font-semibold text-card transition hover:bg-primary hover:text-primary-foreground"
                          >
                            Continue to payment <ArrowRight className="h-4 w-4" />
                          </button>
                          <p className="text-center text-[11px] text-muted-foreground">
                            No account needed. We'll send order updates to your email.
                          </p>
                        </form>
                      )}

                      {step === "payment" && (
                        <div className="space-y-4">
                          <div className="rounded-[6px] border border-border bg-secondary/30 p-4 text-[13px]">
                            <p className="font-semibold text-foreground">Delivering to</p>
                            <p className="mt-1 text-muted-foreground">
                              {form.name} · {form.phone}<br />
                              {form.address}, {form.city}, {form.state} {form.pincode}
                            </p>
                            <button onClick={() => setStep("details")} className="mt-2 text-[12px] font-semibold text-primary hover:underline">
                              Edit details
                            </button>
                          </div>

                          <div className="rounded-[6px] border border-border p-4">
                            <div className="mb-3 flex items-center gap-2">
                              <CreditCard className="h-4 w-4 text-primary" />
                              <p className="text-[14px] font-semibold">Razorpay secured payment</p>
                            </div>
                            <div className="space-y-2.5">
                              <Field label="Card number">
                                <input className={inputCls} placeholder="4111 1111 1111 1111" inputMode="numeric" />
                              </Field>
                              <div className="grid grid-cols-2 gap-3">
                                <Field label="Expiry">
                                  <input className={inputCls} placeholder="MM / YY" />
                                </Field>
                                <Field label="CVV">
                                  <input className={inputCls} placeholder="123" type="password" />
                                </Field>
                              </div>
                            </div>
                            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <ShieldCheck className="h-3.5 w-3.5 text-leaf" /> This is a demo — no real charge is made.
                            </p>
                          </div>

                          <button
                            onClick={placeOrder}
                            className="flex w-full items-center justify-center gap-2 rounded-[4px] bg-primary py-3.5 text-[14px] font-semibold text-primary-foreground transition hover:bg-primary/90"
                          >
                            Pay {inr(total)} & place order
                          </button>
                        </div>
                      )}

                      {step === "processing" && (
                        <div className="flex flex-col items-center justify-center gap-4 py-16">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="text-[15px] font-semibold text-foreground">Processing your payment…</p>
                          <p className="text-[13px] text-muted-foreground">Don't close this window.</p>
                        </div>
                      )}
                    </div>

                    {/* summary side */}
                    <div className="border-t border-border bg-secondary/30 p-6 lg:border-l lg:border-t-0 sm:p-8">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Order summary · {cartCount(lines)} items
                      </p>
                      <div className="mt-4 max-h-64 space-y-3 overflow-y-auto scroll-elegant">
                        {lines.map((l) => (
                          <div key={l.productId} className="flex gap-3">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[6px]">
                              <img src={l.img} alt={l.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-[13px] font-medium text-foreground">{l.name}</p>
                                <p className="text-[11px] text-muted-foreground">{l.weight} · Qty {l.qty}</p>
                              </div>
                              <span className="text-[13px] font-semibold">{inr(l.price * l.qty)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-[13px]">
                        <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{inr(subtotal)}</span></div>
                        {discount > 0 && (
                          <div className="flex justify-between text-leaf"><span>Discount ({coupon?.code})</span><span>− {inr(discount)}</span></div>
                        )}
                        <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : inr(shipping)}</span></div>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-[14px] font-semibold">Total</span>
                        <span className="text-[20px] font-semibold">{inr(total)}</span>
                      </div>
                      <div className="mt-5 space-y-2 rounded-[6px] border border-border bg-card p-3 text-[12px] text-muted-foreground">
                        <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Dispatched within 24 hours</p>
                        <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Razorpay secured · 256-bit encrypted</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "h-11 w-full rounded-[4px] border border-border bg-card px-3 text-[14px] text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}

function StepDot({ active, done, n, label }: { active: boolean; done?: boolean; n: number; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={
          "grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold transition " +
          (done ? "bg-leaf text-white" : active ? "bg-foreground text-card" : "bg-secondary text-muted-foreground")
        }
      >
        {done ? <Check className="h-3.5 w-3.5" /> : n}
      </div>
      <span className={active ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}

function OrderSuccess({
  orderId,
  total,
  email,
  onClose,
}: {
  orderId: string;
  total: number;
  email: string;
  onClose: () => void;
}) {
  const { go } = useUI();
  const go2 = useUI((s) => s.go);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 text-center sm:p-12"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
        className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf/15"
      >
        <PartyPopper className="h-8 w-8 text-leaf" />
      </motion.div>
      <h2 className="mt-6 text-[28px] font-semibold tracking-tight">Order confirmed!</h2>
      <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-muted-foreground">
        Thank you. Your masalas are being packed and will be dispatched within 24 hours.
        A confirmation has been sent to <strong className="text-foreground">{email || "your email"}</strong>.
      </p>
      <div className="mx-auto mt-6 max-w-xs rounded-[6px] border border-border bg-secondary/40 p-4 text-left">
        <div className="flex justify-between text-[13px]">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-mono font-semibold text-foreground">{orderId}</span>
        </div>
        <div className="mt-2 flex justify-between text-[13px]">
          <span className="text-muted-foreground">Amount paid</span>
          <span className="font-semibold text-foreground">{inr(total)}</span>
        </div>
        <div className="mt-2 flex justify-between text-[13px]">
          <span className="text-muted-foreground">Delivery</span>
          <span className="font-medium text-foreground">2–4 days</span>
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          onClick={() => {
            onClose();
            useUI.getState().setOrderConfirmed(false);
            go({ name: "home" });
          }}
          className="rounded-[4px] bg-foreground px-6 py-3 text-[14px] font-semibold text-card transition hover:bg-primary hover:text-primary-foreground"
        >
          Back to home
        </button>
        <button
          onClick={() => {
            onClose();
            useUI.getState().setOrderConfirmed(false);
            go2({ name: "shop" });
          }}
          className="rounded-[4px] border border-border px-6 py-3 text-[14px] font-semibold text-foreground transition hover:border-foreground/30"
        >
          Continue shopping
        </button>
      </div>
    </motion.div>
  );
}
