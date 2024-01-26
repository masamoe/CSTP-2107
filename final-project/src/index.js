import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Items from './pages/Items';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import Management from './pages/Management/Management';
import ItemDetail from './pages/ItemDetail';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Items /> },
      { path: 'items', element: <Items /> },
      {
        path: 'items/:id',
        element: (
          <ProtectedRoute>
            <ItemDetail />
          </ProtectedRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      {
        path: 'management',
        element: (
          <ProtectedRoute requireAdmin>
            <Management />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
