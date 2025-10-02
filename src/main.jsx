import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Context from './context/Context.jsx';
import { AuthProvider } from './context/Auth/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Context>
            <App />
            <Toaster  />
          </Context>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
