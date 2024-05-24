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
        const response = await fetch("http://localhost:8080/radios", {
          mode: "cors",
        });
        const data: DataItem[] = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-1000">
        <div className="App p-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-neutral-900 dark:text-neutral-100">
            Konsola Operatorska
          </h2>
          <ModeToggle />
        </div>
        <div className="container mx-auto py-4 flex justify-center">
          <MapComponent data={data} />
        </div>
        <div className="container mx-auto py-4">
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
