import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, ThemeConfig } from 'antd'
import App from './App.tsx'
import AuthProvider from './data/hooks/useAuth.tsx'

import './index.css'
import { MyMoviesProvider } from './data/hooks/useMyMovies.tsx'

const config: ThemeConfig = {
  token: {
    colorPrimary: '#64EEBC',
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: 18,
    fontWeightStrong: 400,
  },
  hashed: true
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={config}>
      <AuthProvider>
        <MyMoviesProvider>
          <App />
        </MyMoviesProvider>
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
)
