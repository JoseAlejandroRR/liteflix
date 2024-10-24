import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class BackendService {
  protected api: AxiosInstance

  constructor(private endpoint: string) {
    this.api = axios.create({
      baseURL: this.endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    })

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
