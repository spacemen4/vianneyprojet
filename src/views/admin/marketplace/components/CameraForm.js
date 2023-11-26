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
  let uploadResponse = await supabase.storage
    .from('camera_images')
    .upload(fileName, imageFile);

  console.log('Upload Response:', uploadResponse); // Log to verify upload success

  if (uploadResponse.error) {
    console.error('Error uploading file:', uploadResponse.error);
    return;
  }

  // Manually construct the public URL (as a fallback)
  const publicURL = `https://hvjzemvfstwwhhahecwu.supabase.co/storage/v1/object/public/camera_images/${fileName}`;
  console.log('Image URL:', publicURL); // Log the URL for verification

  // Insert camera data along with the image URL into the database
    const { error: insertError } = await supabase
      .from('vianney_cameras')
      .insert([{
        name: cameraName,
        location,
        status: true,
        image_url: publicURL
      }]);
  
    if (insertError) {
      console.error('Error inserting data:', insertError);
      return;
    }
  
    alert('Camera data added successfully');
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
