import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import AuthContextProvider from './Context/AuthContext.jsx';
import { AlertProvider } from './Context/AlertContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AlertProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </AlertProvider>
  </BrowserRouter>
);
