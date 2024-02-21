"use client";

import { CookingPot, LayoutDashboard, Store, User } from "lucide-react";

import { NavItem } from "./nav-item";

export function Navigation() {
  return (
    <div className="space-y-2">
      <NavItem title="Dashboard" icon={LayoutDashboard} href="/admin" />
      <NavItem title="Restaurants" icon={Store} href="/admin/restaurant" />
      <NavItem title="Product" icon={CookingPot} href="/admin/product" />
      <NavItem title="Waiter" icon={User} href="/admin/waiter" />
    </div>
  );
}
