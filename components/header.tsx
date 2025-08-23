// components/header.tsx
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="px-6 py-4">
        <Link 
          href="/" 
          className="text-3xl font-bold playfair-display hover:text-gray-700 transition-colors"
        >
          UrbanWatch
        </Link>
      </div>
    </header>
  );
}