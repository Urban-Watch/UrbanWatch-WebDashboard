// components/client-map.tsx
"use client"

import dynamic from 'next/dynamic'

const InteractiveMap = dynamic(
  () => import('./interactive-map').then((mod) => ({ default: mod.InteractiveMap })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-gray-500">Loading map...</div>
      </div>
    )
  }
)

export { InteractiveMap as ClientMap }
