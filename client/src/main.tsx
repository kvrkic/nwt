import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Index from './components/Index';
import ErrorPage from './components/ErrorPage';
import Register from './components/Register';
import Login from './components/Login';
import Content from './components/Content';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'users/register',
    element: <Register />,
  },
  {
    path: 'users/login',
    element: <Login />,
  },
  {
    path: 'users',
    element: <Content email="karlo" data="nista" />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
