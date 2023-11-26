import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define a function to create a custom HTML element for the marker
const createCustomIcon = (user) => {
  const icon = L.divIcon({
    className: 'custom-icon', // custom class for CSS styling
    html: `<img src="${user.photo_profile_url}" alt="User" style="width: 48px; height: 48px; border-radius: 50%; border: 3px solid white;"/>`,
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -50] // Point from which the popup should open relative to the iconAnchor
  });
  return icon;
};

const MapComponent = () => {
  const mapRef = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the database
    const fetchUsers = async () => {
      let { data: usersOnGround, error } = await supabase
        .from('vianney_users_on_the_ground')
        .select('*');

      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(usersOnGround);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([0, 0], 13); // Initial map setup
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    if (users.length > 0) {
      // Center map on the first user
      mapRef.current.setView([users[0].latitude, users[0].longitude], 13);

      // Add custom markers for each user
      users.forEach(user => {
        if (user.photo_profile_url) {
          const userIcon = createCustomIcon(user);
          L.marker([user.latitude, user.longitude], { icon: userIcon })
            .addTo(mapRef.current)
            .bindPopup(`<strong>${user.first_name} ${user.family_name}</strong>`);
        } else {
          // Add a default marker if no photo URL is available
          L.marker([user.latitude, user.longitude]).addTo(mapRef.current);
        }
      });
    }
  }, [users]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
