import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MapComponent = () => {
  const mapRef = useRef(null); // Ref to store the map instance
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

      // Add markers for each user
      users.forEach(user => {
        L.marker([user.latitude, user.longitude]).addTo(mapRef.current);
      });
    }
  }, [users]); // Dependency on users array

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
