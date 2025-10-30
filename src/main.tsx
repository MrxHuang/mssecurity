import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { UiLibraryProvider } from './context/UiLibraryContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UiLibraryProvider>
          <App />
        </UiLibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
