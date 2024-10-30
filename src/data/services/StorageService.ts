
class StorageService {
  private memoryStorage: { [key: string]: string } = {}
  private isBrowser: boolean

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      window.localStorage.setItem(key, value)
    } else {
      this.memoryStorage[key] = value
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return window.localStorage.getItem(key)
    }
    return this.memoryStorage[key] || null
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(key)
    } else {
      delete this.memoryStorage[key]
    }
  }

  clear(): void {
    if (this.isBrowser) {
      window.localStorage.clear()
    } else {
      this.memoryStorage = {}
    }
  }
}

const storageService = new StorageService()
export default storageService
