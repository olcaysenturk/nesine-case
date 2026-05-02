"use client";

import { LanguageSwitch } from "@/components/layout/header/language-switch";
import { FavoritesMenu } from "@/components/layout/header/favorites-menu";
import { Logo } from "@/components/layout/header/logo";
import { CouponMenu } from "@/components/layout/header/coupon-menu";

export function AppHeader() {
  return (
    <header className="border-b border-slate-200 bg-[#fc0]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        
        <div className="flex items-center gap-3">
          <FavoritesMenu />
          <CouponMenu />
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}
