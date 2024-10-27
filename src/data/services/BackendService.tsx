import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import AuthSession from '../security/AuthSession'

const getAuthToken = (): AuthSession | null => {
  try {
    const authData = localStorage.getItem('auth')
    if (!authData) return {}
    const auth:AuthSession = JSON.parse(authData)

    return auth
  } catch (err) {
    console.log('[getAuthSession]: localStorage failed')
  }
  return null
}

class BackendService {
  protected api: AxiosInstance

  constructor(private endpoint: string) {
    this.api = axios.create({
      baseURL: this.endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    this.configure()
  }

  private configure() {
    const auth = getAuthToken()

    if (auth && auth.token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
    }
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config)
    return response.data
  }

  protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, config)
    return response.data
  }

  protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, config)
    return response.data
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config)
    return response.data
  }

  protected async download(url: string, config?: AxiosRequestConfig) {
    const response = await this.api.get(url, {
      ...config,
      responseType: 'blob',
    })

    return response.data
  }
}

export default BackendService
