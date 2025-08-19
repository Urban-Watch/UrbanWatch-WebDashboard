import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  backLink?: {
    href: string
    label: string
  }
}

export function BreadcrumbNav({ items, backLink }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {backLink && (
        <Link
          href={backLink.href}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mr-4"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLink.label}
        </Link>
      )}

      <div className="flex items-center gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            {item.href ? (
              <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
