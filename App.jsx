import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import MapComponent from "./MapComponent";
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/radios")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Dane z pliku JSON:</h1>
      <div className="App">
        <h1>Google Maps with React</h1>
        <MapComponent />
      </div>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.Id}>
            <h2>Obiekt {item.Id}</h2>
            <p>
              <strong>Name:</strong> {item.Name}
            </p>
            <p>
              <strong>Type:</strong> {item.Type}
            </p>
            <p>
              <strong>SerialNumber:</strong> {item.SerialNumber}
            </p>
            <p>
              <strong>Strength:</strong> {item.Strength}
            </p>
            <p>
              <strong>BatteryLevel:</strong> {item.BatteryLevel}
            </p>
            <p>
              <strong>WorkingMode:</strong> {item.WorkingMode}
            </p>
            <div>
              <h3>Position:</h3>
              <p>
                <strong>Lat:</strong> {item.Position.Lat}
              </p>
              <p>
                <strong>Lon:</strong> {item.Position.Lon}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Ładowanie...</p>
      )}
    </div>
  );
};

export default App;
