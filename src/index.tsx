import React from 'react';
import App from 'pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { worker } from '@kite/jira-server';
import { AppProviders } from 'context/app-providers';
import { Button } from 'antd';

import './index.less';

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
          <Button>kkkkk</Button>
          <Button type="primary">Primary Button</Button>
        </AppProviders>
      </BrowserRouter>
    </React.StrictMode>
  );
}
