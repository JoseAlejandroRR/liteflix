import UserRole from './UserRole'

class UserDto {
  id!: string
  firstname!: string
  lastname!: string
  email!: string
  pictureURL?: string
  role!: UserRole
  createdAt!: Date
  updatedAt!: Date
}

export default UserDto
