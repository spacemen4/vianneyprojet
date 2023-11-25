import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null); // Ref to store the map instance

  useEffect(() => {
    // Only initialize the map if it hasn't been created yet
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([location.lat, location.lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // GPS Location Fetch
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], 13);
      }
    });
  }, []); // Empty dependency array to run only once

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
