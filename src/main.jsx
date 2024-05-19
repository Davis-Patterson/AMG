import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from 'contexts/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import 'styles/Main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
