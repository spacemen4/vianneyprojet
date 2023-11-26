import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://hvjzemvfstwwhhahecwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2anplbXZmc3R3d2hoYWhlY3d1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MTQ4Mjc3MCwiZXhwIjoyMDA3MDU4NzcwfQ.6jThCX2eaUjl2qt4WE3ykPbrh6skE8drYcmk-UCNDSw';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CameraForm = () => {
  const [cameraName, setCameraName] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Supabase Storage
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    let { error: uploadError } = await supabase.storage
      .from('camera_images')
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return;
    }

    // Get public URL for the uploaded image
    const { publicURL, error: urlError } = supabase.storage
      .from('camera_images')
      .getPublicUrl(fileName);

    if (urlError) {
      console.error('Error getting public URL:', urlError);
      return;
    }

    // Insert camera data into the database
    const { data, error } = await supabase
      .from('vianney_cameras')
      .insert([{ name: cameraName, location, status: true }])
      .single();

    if (error) {
      console.error('Error inserting data:', error);
      return;
    }

    // Insert image data into the database
    await supabase.from('vianney_camera_images').insert([
      {
        camera_id: data.id,
        image_url: publicURL,
      },
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Camera Name"
        value={cameraName}
        onChange={(e) => setCameraName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Camera</button>
    </form>
  );
};

export default CameraForm;
