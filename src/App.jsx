import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS

const App = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const map = useRef(null);
  const markerLayer = useRef(L.layerGroup()); // New reference to store the marker layer

  var baseStationIconGreen = L.icon({
    iconUrl: "./basestationgreen.png",
    iconSize: [40, 55],
  });
  var baseStationIconOrange = L.icon({
    iconUrl: "./basestationOrange.png",
    iconSize: [40, 55],
  });

  var baseStationIconRed = L.icon({
    iconUrl: "./basestationRed.png",
    iconSize: [40, 55],
  });

  const carIconGreen = L.icon({
    iconUrl: "./carGreen.png",
    iconSize: [45, 25], // size of the icon
  });
  const carIconOrange = L.icon({
    iconUrl: "./carOrange.png",
    iconSize: [45, 25], // size of the icon
  });
  const carIconRed = L.icon({
    iconUrl: "./carRed.png",
    iconSize: [45, 25], // size of the icon
  });

  const portableIconGreen = L.icon({
    iconUrl: "./portableGreen.png",
    iconSize: [30, 40], // size of the icon
  });
  const portableIconOrange = L.icon({
    iconUrl: "./portableOrange.png",
    iconSize: [30, 40], // size of the icon
  });
  const portableIconRed = L.icon({
    iconUrl: "./portableRed.png",
    iconSize: [30, 40], // size of the icon
  });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Dodajemy funkcję do obsługi kliknięcia na nagłówek tabeli
  const requestSort = (key) => {
    let direction = "ascending";
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
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  useEffect(() => {
    if (!map.current) {
      // Initialize map
      map.current = L.map("mapId").setView([50.062, 19.906], 12);

      // Add a tile layer (using OpenStreetMap here)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map.current);
    }
  }, []);

  useEffect(() => {
    // Clear the marker layer
    markerLayer.current.clearLayers();

    // Adding a marker for each data point
    data.map((item) => {
      let icon;
      switch (item.Type) {
        case "BaseStation":
          if (item.BatteryLevel * item.Strength > 700) {
            icon = baseStationIconGreen;
          } else if (
            item.BatteryLevel * item.Strength < 700 &&
            item.BatteryLevel * item.Strength > 400
          ) {
            icon = baseStationIconOrange;
          } else {
            icon = baseStationIconRed;
          }

          break;
        case "Car":
          if (item.BatteryLevel * item.Strength > 700) {
            icon = carIconGreen;
          } else if (
            item.BatteryLevel * item.Strength < 500 &&
            item.BatteryLevel * item.Strength > 100
          ) {
            icon = carIconOrange;
          } else {
            icon = carIconRed;
          }
          break;
        case "Portable":
          if (item.BatteryLevel * item.Strength > 700) {
            icon = portableIconGreen;
          } else if (
            item.BatteryLevel * item.Strength < 500 &&
            item.BatteryLevel * item.Strength > 100
          ) {
            icon = portableIconOrange;
          } else {
            icon = portableIconRed;
          }
          break;
      }

      const marker = L.marker([item.Position.Lat, item.Position.Lon], {
        icon: icon,
      }).bindPopup(`Id: ${item.Id}, Name: ${item.Name}, Type: ${item.Type}`);
      markerLayer.current.addLayer(marker);
    });

    // Add the marker layer to the map
    map.current.addLayer(markerLayer.current);
  }, [data]);

  return (
    <div>
      <div className="App">
        <h1>Konsola operastorska</h1>
      </div>
      <div id="mapId" style={{ height: "400px", width: "800px" }}></div>

      {sortedData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort("Id")}>
                Id{" "}
                {sortConfig && sortConfig.key === "Id"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => requestSort("Name")}>
                Name{" "}
                {sortConfig && sortConfig.key === "Name"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => requestSort("Type")}>
                Type{" "}
                {sortConfig && sortConfig.key === "Type"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => requestSort("SerialNumber")}>
                SerialNumber{" "}
                {sortConfig && sortConfig.key === "SerialNumber"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => requestSort("Strength")}>
                Strength{" "}
                {sortConfig && sortConfig.key === "Strength"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => requestSort("BatteryLevel")}>
                BatteryLevel{" "}
                {sortConfig && sortConfig.key === "BatteryLevel"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => requestSort("WorkingMode")}>
                WorkingMode{" "}
                {sortConfig && sortConfig.key === "WorkingMode"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.Id}>
                <td>{item.Id}</td>
                <td>{item.Name}</td>
                <td>{item.Type}</td>
                <td>{item.SerialNumber}</td>
                <td>{item.Strength}</td>
                <td>{item.BatteryLevel}</td>
                <td>{item.WorkingMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Ładowanie...</p>
      )}
      <div></div>
    </div>
  );
};

export default App;
