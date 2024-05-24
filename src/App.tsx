import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { DataItem, SortConfig } from "./lib/types";
import { sortData } from "./lib/sorting";
import MapComponent from "./components/MapComponent";
import TableComponent from "./components/TableComponent";

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
    <div>
      <div className="App">
        <h1>Konsola operastorska</h1>
      </div>
      <MapComponent data={data} />
      <TableComponent
        data={sortedData}
        sortConfig={sortConfig}
        requestSort={requestSort}
      />
    </div>
  );
};

export default App;
