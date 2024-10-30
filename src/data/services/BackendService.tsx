import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import AuthSession from '../security/AuthSession'
import storageService from './StorageService'

const getAuthToken = (): AuthSession | null => {
  try {
    if (!(typeof window !== 'undefined')) return null
    const authData = storageService.getItem('auth')
    if (!authData) return {}
    const auth:AuthSession = JSON.parse(authData)

    return auth
  } catch (err) {
    console.log('[getAuthSession]: localStorage failed:', err)
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

  private prepareRequest(config: AxiosRequestConfig = {}): AxiosRequestConfig {
    const auth = getAuthToken()

    if (auth && auth.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${auth.token}`,
      }
    }

    return config
  }


  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, this.prepareRequest(config))
    return response.data
  }

  protected async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, this.prepareRequest(config))
    return response.data
  }

  protected async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, this.prepareRequest(config))
    return response.data
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, this.prepareRequest(config))
    return response.data
  }

  protected async download(url: string, config?: AxiosRequestConfig) {
    const response = await this.api.get(url, {
      ...this.prepareRequest(config),
      responseType: 'blob',
    })

    return response.data
  }
}

export default BackendService
