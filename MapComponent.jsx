import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 50.062,
  lng: 19.906,
};

const MapComponent = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Point 1",
        latitude: 50.062,
        longitude: 19.906,
      },
      {
        id: 2,
        name: "Point 2",
        latitude: 34.0522,
        longitude: -118.2437,
      },
    ];
    setPoints(data);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={50}>
        {points.map((point) => (
          <Marker
            key={point.id}
            position={{ lat: point.latitude, lng: point.longitude }}
            ti-tle={point.name}
            
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
