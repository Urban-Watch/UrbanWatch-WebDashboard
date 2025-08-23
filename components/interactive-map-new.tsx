// components/interactive-map.tsx
"use client"
import { useEffect, useState } from "react"
import { MapPopup } from './map-popup';

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
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setIsClient(true);
   
    const loadMapComponents = async () => {
      const { MapContainer, TileLayer, Marker } = await import("react-leaflet");
      const L = (await import("leaflet")).default;
      // Import CSS
      require("leaflet/dist/leaflet.css");
     
      setMapComponents({ MapContainer, TileLayer, Marker, L });
    };
    loadMapComponents();
  }, []);

  const handleMarkerClick = (issue: any, event: any) => {
    // Get the screen position of the marker
    const map = event.target._map;
    const containerPoint = map.latLngToContainerPoint(event.latlng);
    const mapContainer = map.getContainer();
    const rect = mapContainer.getBoundingClientRect();
    
    setPopupPosition({
      x: rect.left + containerPoint.x,
      y: rect.top + containerPoint.y
    });
    setSelectedIssue(issue);
  };

  const closePopup = () => {
    setSelectedIssue(null);
    setPopupPosition(null);
  };

  if (!isClient || !mapComponents) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, L } = mapComponents;
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
      <div className="relative w-full h-full">
        <MapContainer center={[22.3149, 87.3105]} zoom={13} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
        
        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">High priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Medium priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Low priority</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const bounds = L.latLngBounds(issues.map((issue: any) => issue.coordinates));

  return (
    <div className="relative w-full h-full">
      <MapContainer bounds={bounds} className="w-full h-full" scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {issues.map((issue: any) => (
          <Marker 
            key={issue.id} 
            position={issue.coordinates} 
            icon={getIcon(issue.priority)}
            eventHandlers={{
              click: (e) => handleMarkerClick(issue, e),
            }}
          />
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">High priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Medium priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Low priority</span>
          </div>
        </div>
      </div>

      {/* Custom Popup */}
      {selectedIssue && popupPosition && (
        <div
          className="fixed z-[1001]"
          style={{
            left: popupPosition.x,
            top: popupPosition.y - 10,
            transform: 'translateX(-50%) translateY(-100%)'
          }}
        >
          <MapPopup 
            issue={selectedIssue} 
            onClose={closePopup}
          />
        </div>
      )}

      {/* Backdrop to close popup */}
      {selectedIssue && (
        <div
          className="fixed inset-0 z-[1000] bg-transparent"
          onClick={closePopup}
        />
      )}
    </div>
  );
}