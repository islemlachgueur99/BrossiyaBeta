import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

// Import your custom CSS file
import "./MapComponent.css";

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: "/images/placeholder.png",
  iconSize: [50, 50], // size of the icon
});

function MapComponent() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div className="map-container">
      {mapLoaded && (
        <MapContainer
          center={[34.8743227, -1.3245023]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[34.8743227, -1.3245023]} icon={customIcon}>
            <Popup>
              <p style={{ fontSize: "25px" }}>
                Gulf Bank Algeria, Boulevard de LALN, 13000 Tlemcen, Algeria
              </p>
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default MapComponent;
