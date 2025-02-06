import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import CreatePost from './components/CreatePost';
import Card from './components/Card';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Card /> },
      { path: 'create', element: <CreatePost /> },
    ],
  },
];

const routerX = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routerX} />
  </StrictMode>
);
