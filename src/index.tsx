import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // opcional se quiser usar
import { PedidosPage } from './pages/PedidosPage';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <PedidosPage />
  </React.StrictMode>
);
