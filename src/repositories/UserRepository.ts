import { User } from '@prisma/client'
import { IUserRepository } from '../interfaces/IUserRepository'
import { prisma } from '../database/PrismaClientInstance'

class UserRepository implements IUserRepository {

    public async create(name: string, role: 'STUDENT' | 'TEACHER'): Promise<User | Error> {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    role
                }
            })

            return newUser
        } catch (error) {
            console.error(error)
            return new Error('Erro ao criar registro.')
        }
    }

    public async list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc'): Promise<User[] | Error> {
        try {
            const users = await prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    name: {
                        contains: filter
                    }
                },
                orderBy: {
                    name: orderBy
                }
            })

            return users
        } catch (error) {
            console.error(error)
            return new Error('Erro ao listar registro.')
        }
    }

    public async count(filter: string): Promise<number | Error> {
        try {
            const countOfUsers = await prisma.user.count({
                where: {
                    name: {
                        contains: filter
                    }
                }
            })

            return countOfUsers
        } catch (error) {
            console.error(error)
            return new Error('Erro ao receber quantidade de registros.')
        }
    }

    public async getById(idUser: number): Promise<User | null | Error> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: idUser
                }
            })

            return user
        } catch (error) {
            console.error(error)
            return new Error('Erro ao buscar registro.')
        }
    }

    public async delete(idUser: number): Promise<void | Error> {
        try {
            await prisma.user.delete({
                where: {
                    id: idUser
                }
            })


        } catch (error) {
            console.error(error)
            return new Error('Erro ao excluir registro.')
        }
    }

    public async update(idUser: number, name: string): Promise<User | Error> {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: idUser
                },
                data: {
                    name,
                }
            })

            return updatedUser
        } catch (error) {
            console.error(error)
            return new Error('Erro ao atualizar registro.')
        }
    }

}

export { UserRepository }