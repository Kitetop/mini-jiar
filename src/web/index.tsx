import React from 'react';
import App from 'web/pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { worker } from '@kite/jira-server';
import { AppProviders } from 'context/app-providers';

const container = document.getElementById('app');
if (process.env.NODE_ENV === 'development') {
  worker.start();
}

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AppProviders>
          <App />
        </AppProviders>
      </BrowserRouter>
    </React.StrictMode>
  );
}
