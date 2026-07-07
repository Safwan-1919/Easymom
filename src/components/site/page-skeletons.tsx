"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function HomepageSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      {/* Hero skeleton */}
      <div className="mb-20">
        <Skeleton className="h-[400px] w-full rounded-[6px] lg:h-[500px]" />
      </div>

      {/* Our Products skeleton */}
      <div className="mb-20">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-8 w-48" />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="rounded-[6px] bg-card">
              <Skeleton className="aspect-[4/5] rounded-[5px]" />
              <div className="p-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products skeleton */}
      <div className="mb-20">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-8 w-64" />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-[6px] border border-border bg-card">
              <Skeleton className="aspect-[4/5]" />
              <div className="p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-5 w-3/4" />
                <Skeleton className="mt-2 h-3 w-full" />
                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-9 w-9 rounded-[4px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story skeleton */}
      <div className="mb-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-12 w-full" />
            <Skeleton className="mt-2 h-12 w-3/4" />
            <Skeleton className="mt-5 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-[6px]" />
              ))}
            </div>
          </div>
          <Skeleton className="aspect-[4/5] rounded-[6px]" />
        </div>
      </div>

      {/* Recipes skeleton */}
      <div className="mb-20">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-8 w-64" />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[6px] border border-border bg-card">
              <Skeleton className="aspect-[16/10]" />
              <div className="p-5">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-2 h-3 w-1/2" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-1 h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials skeleton */}
      <div className="mb-20">
        <Skeleton className="mx-auto h-8 w-80" />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-[6px] border border-border bg-card p-6">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
              <div className="mt-4 border-t border-border pt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-1 h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter skeleton */}
      <div className="rounded-[6px] bg-foreground p-14">
        <div className="mx-auto max-w-xl text-center">
          <Skeleton className="mx-auto h-3 w-32 bg-white/20" />
          <Skeleton className="mx-auto mt-3 h-8 w-64 bg-white/20" />
          <Skeleton className="mx-auto mt-2 h-4 w-80 bg-white/20" />
          <div className="mt-6 flex gap-3">
            <Skeleton className="h-12 flex-1 bg-white/20" />
            <Skeleton className="h-12 w-32 bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex gap-1.5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="mt-2 h-4 w-80" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24 rounded-[4px]" />
          <Skeleton className="h-10 w-36 rounded-[4px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        {/* Sidebar filters */}
        <aside className="hidden lg:block">
          <div className="space-y-6">
            <div>
              <Skeleton className="h-3 w-20" />
              <div className="mt-2.5 space-y-1">
                {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className="h-9 w-full rounded-[4px]" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-3 w-20" />
              <div className="mt-2.5 flex gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-16 rounded-full" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-3 w-20" />
              <Skeleton className="mt-2.5 h-2 w-full" />
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <Skeleton className="mb-4 h-3 w-16" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-[6px] border border-border bg-card">
                <Skeleton className="aspect-[4/5]" />
                <div className="p-4">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="mt-2 h-5 w-3/4" />
                  <Skeleton className="mt-2 h-3 w-full" />
                  <div className="mt-3 flex items-center justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-9 w-9 rounded-[4px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex gap-1.5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div>
          <Skeleton className="aspect-square rounded-[6px]" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-[6px]" />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-10 w-3/4" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mt-5 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-2/3" />

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-[6px]" />
            ))}
          </div>

          <div className="mt-6">
            <Skeleton className="h-3 w-32" />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-[6px] border border-border p-5">
            <div className="flex items-end justify-between">
              <div>
                <Skeleton className="h-8 w-24" />
                <Skeleton className="mt-1 h-3 w-32" />
              </div>
              <Skeleton className="h-12 w-12 rounded-[4px]" />
            </div>
            <div className="mt-4 flex gap-3">
              <Skeleton className="h-12 w-32 rounded-[4px]" />
              <Skeleton className="h-12 flex-1 rounded-[4px]" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-5" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-20">
        <Skeleton className="h-6 w-48" />
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-[6px] border border-border bg-card">
              <Skeleton className="aspect-[4/5]" />
              <div className="p-4">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="mt-2 h-5 w-3/4" />
                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-9 w-9 rounded-[4px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecipesSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex gap-1.5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-2 h-4 w-80" />

      <div className="mt-12 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[6px] border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Skeleton className="h-6 w-3/4" />
                <div className="mt-2 flex gap-4">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="mt-3 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
              </div>
              <Skeleton className="h-6 w-6 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex gap-1.5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-12 w-full" />
          <Skeleton className="mt-2 h-12 w-3/4" />
          <Skeleton className="mt-5 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-2/3" />
        </div>
        <Skeleton className="aspect-[4/5] rounded-[6px]" />
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-border lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card p-6 text-center">
            <Skeleton className="mx-auto h-8 w-20" />
            <Skeleton className="mx-auto mt-2 h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="mt-20">
        <Skeleton className="mx-auto h-8 w-80" />
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-[6px] border border-border bg-card p-6">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="mt-3 h-4 w-full" />
              <Skeleton className="mt-1 h-4 w-3/4" />
              <div className="mt-4 border-t border-border pt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-1 h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FaqSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
      {/* Breadcrumb */}
      <div className="mb-6">
        <div className="flex gap-1.5">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>

      <div className="text-center">
        <Skeleton className="mx-auto h-3 w-24" />
        <Skeleton className="mx-auto mt-3 h-10 w-64" />
        <Skeleton className="mx-auto mt-4 h-4 w-80" />
      </div>

      <div className="mt-10 space-y-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[6px] border border-border bg-card px-5 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-4 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
