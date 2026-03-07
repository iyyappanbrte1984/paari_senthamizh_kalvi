import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/Toast';
import QueryProvider from './providers/QueryProvider';
import './index.css';

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Performance monitoring
if (process.env.NODE_ENV === 'production') {
  // Add performance monitoring here (e.g., Web Vitals)
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <QueryProvider>
            <ThemeProvider>
              <LanguageProvider>
                <AuthProvider>
                  <ToastProvider>
                    <App />
                  </ToastProvider>
                </AuthProvider>
              </LanguageProvider>
            </ThemeProvider>
          </QueryProvider>
        </BrowserRouter>
      </HelmetProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
