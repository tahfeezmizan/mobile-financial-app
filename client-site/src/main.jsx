import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Dashboard from './Layout/Dashboard/Dashboard.jsx';
import Root from './Layout/Root.jsx';
import Login from './pages/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Login />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
