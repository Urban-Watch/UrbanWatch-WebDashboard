"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

interface ReportMapProps {
  coordinates: [number, number]
  title: string
  priority: string
  className?: string
}

export function ReportMap({ coordinates, title, priority, className }: ReportMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import Leaflet to avoid SSR issues
    const initMap = async () => {
      if (typeof window === "undefined") return

      const L = (await import("leaflet")).default

      // Fix for default markers in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      })

      if (mapRef.current && !mapInstanceRef.current) {
        // Initialize map centered on the specific coordinates
        const map = L.map(mapRef.current).setView(coordinates, 17)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Create custom icon for the priority
        const colors = {
          high: "#059669", // emerald-600
          medium: "#f59e0b", // amber-500
          low: "#ef4444", // red-500
        }

        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `<div style="
            background-color: ${colors[priority as keyof typeof colors]};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        })

        // Add marker for the specific issue
        const marker = L.marker(coordinates, {
          icon: customIcon,
        }).addTo(map)

        // Add popup with issue details
        marker
          .bindPopup(`
          <div class="p-2">
            <h3 class="font-serif font-bold text-sm mb-1">${title}</h3>
            <span class="text-xs font-medium px-2 py-1 rounded-full ${
              priority === "high"
                ? "bg-emerald-100 text-emerald-800"
                : priority === "medium"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-red-100 text-red-800"
            }">
              ${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </span>
          </div>
        `)
          .openPopup()

        mapInstanceRef.current = map
      }
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [coordinates, title, priority])

  return (
    <Card className={className}>
      <div ref={mapRef} className="w-full h-full min-h-[300px] rounded-lg" style={{ zIndex: 1 }} />
    </Card>
  )
}
