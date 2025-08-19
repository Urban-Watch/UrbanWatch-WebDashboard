// components/interactive-map.tsx
"use client"

import { useEffect, useState } from "react"

// Define custom icons only on client side
const createCustomIcons = () => {
  if (typeof window === 'undefined') return {};
  
  const L = require('leaflet');
  
  const redIcon = new L.Icon({
    iconUrl: "/red-pin.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const yellowIcon = new L.Icon({
    iconUrl: "/yellow-pin.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const greenIcon = new L.Icon({
    iconUrl: "/green-pin.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return { redIcon, yellowIcon, greenIcon };
};

export function InteractiveMap({ issues }: { issues: any[] }) {
  const [isClient, setIsClient] = useState(false);
  const [mapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    const loadMapComponents = async () => {
      const { MapContainer, TileLayer, Marker, Popup } = await import("react-leaflet");
      const L = (await import("leaflet")).default;
      // Import CSS
      require("leaflet/dist/leaflet.css");
      
      setMapComponents({ MapContainer, TileLayer, Marker, Popup, L });
    };

    loadMapComponents();
  }, []);

  if (!isClient || !mapComponents) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = mapComponents;
  const { redIcon, yellowIcon, greenIcon } = createCustomIcons();

  const getIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return redIcon;
      case "medium":
        return yellowIcon;
      case "low":
        return greenIcon;
      default:
        return redIcon;
    }
  };

  if (!issues || issues.length === 0) {
    // Default view when there are no issues
    return (
      <MapContainer center={[22.3149, 87.3105]} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    );
  }

  const bounds = L.latLngBounds(issues.map((issue: any) => issue.coordinates));

  return (
    <MapContainer bounds={bounds} className="w-full h-full" scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {issues.map((issue: any) => (
        <Marker key={issue.id} position={issue.coordinates} icon={getIcon(issue.priority)}>
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold">{issue.title}</h3>
              <p>{issue.location}</p>
              <p>Criticality: <span className="font-bold">{issue.score}</span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
