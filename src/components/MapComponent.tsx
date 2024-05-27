import React, { useEffect, useRef, useState } from "react";
import * as L from "leaflet";
import { DataItem } from "../lib/types";
import { getIcon } from "../lib/icons";
import "leaflet/dist/leaflet.css";
import { Button } from "./ui/button";

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
  const lines = useRef<L.Polyline[]>([]);
  const selectedMarkers = useRef<DataItem[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [currentDistance, setCurrentDistance] = useState(0); // Dodajemy stan dla aktualnej odległości

  const calculateDistance = (latlngs: L.LatLngExpression[]) => {
    let distance = 0;
    for (let i = 0; i < latlngs.length - 1; i++) {
      if (map.current) {
        distance += map.current.distance(latlngs[i], latlngs[i + 1]);
      }
    }
    return distance;
  };

  const removeLines = () => {
    lines.current.forEach((line) => line.remove());
    lines.current = [];
    selectedMarkers.current = [];
    setTotalDistance(0);
    setCurrentDistance(0); // Resetujemy aktualną odległość
  };

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
        marker.on("click", () => {
          onDeviceSelection(item);
          selectedMarkers.current.push(item);
          if (selectedMarkers.current.length > 1) {
            const lastTwoMarkers = selectedMarkers.current.slice(-2);
            const latlngs = lastTwoMarkers.map((item) =>
              L.latLng(item.Position.Lat, item.Position.Lon)
            );
            const line = L.polyline(latlngs, { color: "red" });
            lines.current.push(line);
            if (map.current) {
              line.addTo(map.current);
            }
            const newDistance = calculateDistance(latlngs);
            setTotalDistance((prevDistance) => prevDistance + newDistance);
            setCurrentDistance(newDistance); // Aktualizujemy aktualną odległość
          }
        });

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
    <main>
      <div className="mx-auto border-double border-2 border-gray-600 dark:border-gray-300 p-4 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg  hover:border-solid">
        <div id="mapId" className="h-96 w-full rounded-xl"></div>
      </div>
      <div className="p-5 text-center">
        <Button variant="outline" onClick={removeLines} className="">
          Usuń wszystkie linie
        </Button>
        <div className="pt-5 flex justify-center items-center border-x-2 w-8/12 mx-auto text-center h-10">
          <p className="px-5">
            Całkowita odległość: {totalDistance.toFixed(2)} metróww
          </p>
          <p className="px-5">
            Aktualna odległość: {currentDistance.toFixed(2)} metrów
          </p>
        </div>
      </div>
    </main>
  );
};

export default MapComponent;
