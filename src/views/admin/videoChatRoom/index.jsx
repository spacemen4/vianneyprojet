// index.jsx in VideoChatRoom directory
import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

export default function VideoChatRoom() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
