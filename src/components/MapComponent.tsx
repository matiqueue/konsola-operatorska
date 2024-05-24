import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import { DataItem } from "../lib/types";
import { getIcon } from "../lib/icons";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  data: DataItem[];
  onDeviceSelection: (device: DataItem) => void; // Nowa funkcja do przekazania stanu wybranego urządzenia
}

const MapComponent: React.FC<MapComponentProps> = ({
  data,
  onDeviceSelection,
}) => {
  const map = useRef<L.Map | null>(null);
  const markerLayer = useRef(L.layerGroup());

  useEffect(() => {
    if (!map.current) {
      map.current = L.map("mapId").setView([50.062, 19.906], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.current);
    }
  }, []);

  useEffect(() => {
    if (map.current) {
      markerLayer.current.clearLayers();

      data.forEach((item) => {
        const icon = getIcon(item.Type, item.BatteryLevel * item.Strength);
        const marker = L.marker([item.Position.Lat, item.Position.Lon], {
          icon: icon,
        }).bindPopup(`Id: ${item.Id}, Name: ${item.Name}, Type: ${item.Type}`);
        marker.on("click", () => onDeviceSelection(item)); // Obsługa kliknięcia na markerze
        markerLayer.current.addLayer(marker);
      });

      map.current.addLayer(markerLayer.current);
    }
  }, [data, onDeviceSelection]);

  return (
    <div className="px-40">
      <div className="mx-auto border-dashed border-2 border-gray-700 dark:border-gray-400 m-2 p-2 rounded">
        <div id="mapId" className="h-96 w-full"></div>
      </div>
    </div>
  );
};

export default MapComponent;
