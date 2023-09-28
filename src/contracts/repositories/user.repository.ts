import { User } from '@prisma/client'
import { ICreateUserDTO } from '../../dtos/create-user-dto'

export interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
}
