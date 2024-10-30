import React from 'react'
//import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './PageShell.css'
import { MyMoviesProvider } from '../data/hooks/useMyMovies'
import AuthProvider from '../data/hooks/useAuth'
import { ConfigProvider, ThemeConfig } from 'antd'

export { PageShell }

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const config: ThemeConfig = {
    token: {
      colorPrimary: '#64EEBC',
      fontFamily: 'Bebas Neue, sans-serif',
      fontSize: 18,
      fontWeightStrong: 400,
    },
    hashed: true
  }

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ConfigProvider theme={config}>
          <AuthProvider>
            <MyMoviesProvider>
              { children }
            </MyMoviesProvider>
          </AuthProvider>
        </ConfigProvider>
      </PageContextProvider>
    </React.StrictMode>
  )
}