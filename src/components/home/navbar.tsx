"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <div className="flex w-full justify-center pt-6">
      <div className="flex w-full max-w-[800px] items-center justify-center">
        <Link
          href="/admin"
          className="hover:text-primary-500 font-semibold text-muted transition-all duration-300 ease-in-out"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
