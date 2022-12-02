import '../wdyr';
import React from 'react';
import App from '@pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { worker } from '@kite/jira-server';

const container = document.getElementById('app');
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
