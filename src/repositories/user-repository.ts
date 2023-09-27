import { User } from '@prisma/client'
import { IUserRepository } from '../contracts/repositories/user.repository'
import { ICreateUserDTO } from '../dtos/create-user-dto'
import { prisma } from '../services/prisma'

export class UserRepository implements IUserRepository {
  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return user
  }
}
