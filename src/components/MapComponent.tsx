import React, { useEffect, useRef } from "react";
import * as L from "leaflet";
import { DataItem } from "../lib/types";
import { getIcon } from "../lib/icons";
import "leaflet/dist/leaflet.css";

interface MapComponentProps {
  data: DataItem[];
  selectedDevice: DataItem | null;
  onDeviceSelection: (device: DataItem) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  data,
  selectedDevice,
  onDeviceSelection,
}) => {
  const map = useRef<L.Map | null>(null);
  const markerLayer = useRef(L.layerGroup());
  const markerMap = useRef(new Map<DataItem, L.Marker>());

  useEffect(() => {
    if (!map.current) {
      map.current = L.map("mapId").setView([50.062, 19.906], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Wykonanie robili Szymon G, Patryk K",
      }).addTo(map.current);
    }
  }, []);

  useEffect(() => {
    if (map.current) {
      markerLayer.current.clearLayers();
      markerMap.current.clear();

      data.forEach((item) => {
        const isSelected = !!selectedDevice && selectedDevice.Id === item.Id;
        const icon = getIcon(
          item.Type,
          item.BatteryLevel * item.Strength,
          isSelected
        );
        const marker = L.marker([item.Position.Lat, item.Position.Lon], {
          icon: icon,
        }).bindPopup(`Id: ${item.Id}, Name: ${item.Name}, Type: ${item.Type}`);
        marker.on("click", () => onDeviceSelection(item)); // Obsługa kliknięcia na markerze
        markerLayer.current.addLayer(marker);
        markerMap.current.set(item, marker);
      });

      map.current.addLayer(markerLayer.current);
    }
  }, [data, onDeviceSelection, selectedDevice]);

  useEffect(() => {
    markerMap.current.forEach((marker, item) => {
      const isSelected = !!selectedDevice && selectedDevice.Id === item.Id;
      const icon = getIcon(
        item.Type,
        item.BatteryLevel * item.Strength,
        isSelected
      );
      marker.setIcon(icon);
    });
  }, [selectedDevice]);

  return (
    <div className="mx-auto border-double border-2 border-gray-600 dark:border-gray-300 p-4 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg  hover:border-solid">
      <div id="mapId" className="h-96 w-full rounded-xl"></div>
    </div>
  );
};

export default MapComponent;
