import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { DataItem, SortConfig } from "./lib/types";
import { sortData } from "./lib/sorting";
import MapComponent from "./components/MapComponent";
import TableComponent from "./components/TableComponent";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<DataItem | null>(null);
  const [showMap, setShowMap] = useState(true);

  const handleDeviceSelection = (device: DataItem) => {
    setSelectedDevice(device);
  };

  const sortedData = useMemo(
    () => sortData(data, sortConfig),
    [data, sortConfig]
  );

  const requestSort = (key: keyof DataItem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/radios");
        const data: DataItem[] = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-8 flex justify-between items-center">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          <span className="pb-2 border-b px-5">Konsola Operatorska</span>
        </h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
            className="group relative transition-opacity duration-500 h-10"
          >
            <span
              className={`inset-0 flex items-center justify-center ${
                showMap ? "opacity-0" : "opacity-100"
              }`}
            >
              Pokaż Mapę
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center ${
                showMap ? "opacity-100" : "opacity-0"
              }`}
            >
              Ukryj Mapę
            </span>
          </Button>
          <ModeToggle />
        </div>
      </div>

      {showMap && (
        <div className="w-8/12 mx-auto">
          <div className="pb-4 transition-opacity duration-500 opacity-100">
            <MapComponent
              data={data}
              onDeviceSelection={handleDeviceSelection}
              selectedDevice={selectedDevice}
            />
          </div>
        </div>
      )}
      {!showMap && (
        <div style={{ display: "none" }}>
          <MapComponent
            data={data}
            onDeviceSelection={handleDeviceSelection}
            selectedDevice={selectedDevice}
          />
        </div>
      )}
      <div className="mx-auto w-11/12">
        <TableComponent
          data={sortedData}
          sortConfig={sortConfig}
          requestSort={requestSort}
          selectedDevice={selectedDevice}
          onDeviceSelection={handleDeviceSelection}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;
