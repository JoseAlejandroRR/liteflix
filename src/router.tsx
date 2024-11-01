import { createBrowserRouter } from 'react-router-dom'
import HomePage from './ui/pages/HomePage'
import LoginPage from './ui/pages/LoginPage'
import AccessDemoPage from './ui/pages/AccessDemoPage'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/demo',
        element: <AccessDemoPage />,
    },
  ])