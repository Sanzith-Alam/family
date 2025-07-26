import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Tailwind CSS base styles
import { BrowserRouter as Router } from 'react-router-dom'; // For routing
import { AuthProvider } from './context/AuthContext'; // Auth Context


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);