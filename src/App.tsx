import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { DataItem, SortConfig } from "./lib/types";
import { sortData } from "./lib/sorting";
import MapComponent from "./components/MapComponent";
import TableComponent from "./components/TableComponent";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

const App: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

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
        const response = await fetch("localhost:8080/radios");
        // const response = await fetch("/example-data.json"); w przypadku osx (bez serwera)

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
      <div className="p-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Konsola Operatorska
        </h2>
        <ModeToggle />
        <MapComponent data={data} />
        <div className="p-5">
          <TableComponent
            data={sortedData}
            sortConfig={sortConfig}
            requestSort={requestSort}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
