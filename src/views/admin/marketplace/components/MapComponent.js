import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null); // Ref to store the map instance

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 13); // Set initial coordinates
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }
  }, []); // Empty dependency array  

  // Location Update
  useEffect(() => {
    // GPS Location Fetch
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  // Update map view when location changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([location.lat, location.lng], 13);
    }
  }, [location.lat, location.lng]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
