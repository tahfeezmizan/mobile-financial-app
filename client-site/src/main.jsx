import './index.css'
import { StrictMode } from 'react'
import Home from './pages/Home/Home.jsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import SingIn from './pages/SingIn/SingIn.jsx'
import SingUp from './pages/SingUp/SingUp.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import Products from './pages/Products/Products.jsx'
import Banner from './pages/Home/Banner.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/products",
        element: <><Banner></Banner><Products /></>,
        loader: () => fetch('http://localhost:5000/productcount')
      },
      {
        path: "/singin",
        element: <SingIn />
      },
      {
        path: "/singup",
        element: <SingUp />
      },
    ]
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
