import UserDto from '../dto/UserDto'

export type UserSettings = {
  full4k: boolean,
  preloadContent: boolean,
}

class AuthSession {
  user?: UserDto
  token?: string
}

export default AuthSession
