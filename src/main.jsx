import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente'
import Index, { loader as clientesLoader } from "./pages/Index";
import EditarCliente, { loader as editarClienteLoader, action as editarClienteAction } from "./pages/EditarCliente";
import ErrorPage from './components/ErrorPage'

// La funcion toma un arreglo con las diferentes rutas por medio de un objeto
const router = createBrowserRouter([
  {
    path: "/", 
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorPage />
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        action: nuevoClienteAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clientes/:clienteId/editar/',
        element: <EditarCliente />,
        loader: editarClienteLoader,
        action: editarClienteAction,
        errorElement: <ErrorPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router={router}
    />
  </React.StrictMode>,
)

// Para obtener datos uso loader
// Para procesar un Formulario uso un Action
// Cuando tengo que editar un registro necesito routing dinamico:
// '/clientes/:clienteId/editar/': clienteId es una variable para editar cada cliente