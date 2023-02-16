import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from './error-page';
import Index from './routes';
import './index.css';
import Root from './routes/root';
import { action as destroyAction } from './routes/destroy';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact, { loader as contactLoader } from './routes/contact';
import EditContact, { action as editAction } from './routes/edit';

import { action as rootAction, loader as rootLoader } from './routes/root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {index: true, element: <Index />},
      {
        path: '/contacts/:contactID',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: '/contacts/:contactID/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: '/contacts/:contactID/destroy',
        action: destroyAction,
        element: <div>Não foi possível carregar esse usuário.</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
