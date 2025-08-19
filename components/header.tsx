// components/header.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Priority List", href: "/priority-list" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white border-0 sticky top-0 z-50">
        <div className="flex items-center justify-between  px-6 py-2 pb-3 ">
          <Link href="/" className="text-xl font-bold text-black playfair-display">
            Urban Watch
          </Link>
        </div>
       
    </header>
  )
}