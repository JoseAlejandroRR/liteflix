import AuthSession from '../security/AuthSession'
import BackendService from './BackendService'

class UserstAPI extends BackendService {

  constructor() {
    super(import.meta.env.VITE_LITEFLIX_USERS_API)
  }

  async login(email: string, password: string): Promise<AuthSession> {
    return this.post<AuthSession>('/login', {
      email, password
    })
  }

}

export default UserstAPI