import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Index from './components/Index';
import ErrorPage from './components/ErrorPage';
import Register from './components/Register';
import Login from './components/Login';
import Content from './components/Content';
import Verify from './components/Verify';
import Resend from './components/Resend';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'content',
    element: <Content />,
  },
  {
    path: 'verify',
    element: <Verify />,
  },
  {
    path: 'resend',
    element: <Resend />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
