import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page';
import './index.css';
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact from './routes/edit';
import Root from './routes/root';

import { action as rootAction, loader as rootLoader } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    element: <Root />,
    children: [
      {
        path: '/contacts/:contactID',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: '/contacts/:contactID/edit',
        element: <EditContact />,
        loader: contactLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
