import { createContext, useContext, useState  } from 'react'
import useLocalStorage from './useLocalStorage'
import AuthSession, { UserSettings } from '../security/AuthSession'
import { AxiosError } from 'axios'
import UserstAPI from '../services/UsersAPI'

const authService = new UserstAPI()

const initialState: AuthSession = {
  user: undefined,
  token: undefined,
}

enum AuthError {
  INVALID_CREDENTIALS,
}

type AuthContextProps = {
  auth: AuthSession,
  isLoading: boolean,
  getAuthToken: (email: string, password: string) => Promise<AuthSession>
  error: AuthError | null,
  logout: () => void,
  settings: UserSettings
  updateSettings: (settings: UserSettings) => void
}

export const AuthContext = createContext<AuthContextProps>({
  auth: new AuthSession(),
  isLoading: false,
  getAuthToken: () => new Promise((resolve) => resolve(new AuthSession)),
  error: null,
  logout: () => { },
  settings: {
    full4k: false,
    preloadContent: true
  },
  updateSettings: ()  => {}
})

export const useAuth = () => useContext(AuthContext)

type AuthProviderProps = {
  children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useLocalStorage<AuthSession>('auth', initialState)
  const [settings, setSettings] = useLocalStorage<UserSettings>('settings',{
    full4k: false,
    preloadContent: true
  })
  
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const getAuthToken = async (email: string, password: string): Promise<AuthSession> => {
    setLoading(true)
    try {
      const data = await authService.login(email, password)
      if (data.token) {
        setAuth(data)

        return data
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.status === 401) {
          setError(AuthError.INVALID_CREDENTIALS)
        }
      } else {
        setError(AuthError.INVALID_CREDENTIALS)
      }
    } finally {
      setLoading(false)
    }
    return initialState
  }

  const logout = () => {
    setAuth(initialState)
  }

  const updateSettings = (config: UserSettings) => {
    setSettings({ ...config })
  }

  return (
    <AuthContext.Provider
      value={{auth, getAuthToken, logout, settings, updateSettings, isLoading, error}}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
