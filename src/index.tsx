import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import App from './App';

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement, {
    onRecoverableError: () => { }
  }
);

root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} fallbackElement={<div>err, error.</div>} />
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
