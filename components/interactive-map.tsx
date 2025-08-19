"use client"

import { useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"

// Mock data for reported issues
const mockIssues = [
  {
    id: 1,
    title: "Deep Pothole Near School",
    location: [22.3149, 87.3105], // IIT Kharagpur coordinates
    priority: "high",
    score: 82,
    description: "High-severity deep pothole in a school zone, posing an immediate safety risk",
  },
  {
    id: 2,
    title: "Offensive Graffiti Near School",
    location: [22.3159, 87.3115],
    priority: "high",
    score: 79,
    description: "Inappropriate graffiti requiring immediate attention",
  },
  {
    id: 3,
    title: "Major Trash Overflow Near Park",
    location: [22.3139, 87.3095],
    priority: "high",
    score: 77,
    description: "Large accumulation of trash affecting public health",
  },
  {
    id: 4,
    title: "Trash Overflow Near Park",
    location: [22.3129, 87.3085],
    priority: "medium",
    score: 65,
    description: "Moderate trash accumulation requiring attention",
  },
  {
    id: 5,
    title: "Minor Road Damage",
    location: [22.3169, 87.3125],
    priority: "low",
    score: 45,
    description: "Small cracks in road surface",
  },
]

interface InteractiveMapProps {
  className?: string
}

export function InteractiveMap({ className }: InteractiveMapProps) {
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
        // Initialize map centered on IIT Kharagpur
        const map = L.map(mapRef.current).setView([22.3149, 87.3105], 15)

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Create custom icons for different priorities
        const createCustomIcon = (priority: string) => {
          const colors = {
            high: "#059669", // emerald-600
            medium: "#f59e0b", // amber-500
            low: "#ef4444", // red-500
          }

          return L.divIcon({
            className: "custom-marker",
            html: `<div style="
              background-color: ${colors[priority as keyof typeof colors]};
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          })
        }

        // Add markers for each issue
        mockIssues.forEach((issue) => {
          const marker = L.marker(issue.location as [number, number], {
            icon: createCustomIcon(issue.priority),
          }).addTo(map)

          // Add popup with issue details
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-serif font-bold text-sm mb-1">${issue.title}</h3>
              <p class="text-xs text-muted-foreground mb-2">${issue.description}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium px-2 py-1 rounded-full ${
                  issue.priority === "high"
                    ? "bg-emerald-100 text-emerald-800"
                    : issue.priority === "medium"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                }">
                  ${issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
                </span>
                <span class="text-xs font-bold">${issue.score}</span>
              </div>
            </div>
          `)
        })

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
  }, [])

  return (
    <Card className={className}>
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" style={{ zIndex: 1 }} />
    </Card>
  )
}
