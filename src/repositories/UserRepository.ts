import { IUserRepository, IUserWithoutPassword } from '../interfaces/IUserRepository'
import { prisma } from '../database/PrismaClientInstance'
import { CustomError } from '../errors/CustomErrors'
import { User } from '@prisma/client'

//Implementando as funções de CRUD seguindo o que foi acordado na interfaçe, ou seja desde que fosse seguido a interface poderia ser feito com qualquer tecnologia
class UserRepository implements IUserRepository {

    public async create(name: string, email: string, password: string, role: 'STUDENT' | 'TEACHER'): Promise<User | CustomError> {
        try {
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    role
                }
            })

            return newUser
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao criar registro.')
        }
    }

    public async list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', typeUser: 'STUDENT' | 'TEACHER' | ''): Promise<IUserWithoutPassword[] | CustomError> {
        try {
            //Tipando o condition
            const whereCondition: { name: { contains: string }, role?: 'STUDENT' | 'TEACHER' } = {
                name: {
                    contains: filter
                }
            }
            
            //Pesquisa especifica por role
            if (typeUser !== '') {
                whereCondition.role = typeUser
            }

            const users = await prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                },
                where: whereCondition,
                orderBy: {
                    id: orderBy
                }
            })

            return users
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao listar registro.')
        }
    }

    public async count(filter: string): Promise<number | CustomError> {
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
            return new CustomError('Erro ao receber quantidade de registros.')
        }
    }

    public async getById(idUser: number): Promise<User | null | CustomError> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: idUser
                }
            })

            return user
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao buscar registro.')
        }
    }

    public async getByEmail(email: string): Promise<User | null | CustomError> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            return user
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao buscar registro.')
        }
    }

    public async delete(idUser: number): Promise<void | CustomError> {
        try {
            await prisma.user.delete({
                where: {
                    id: idUser
                }
            })


        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao excluir registro.')
        }
    }

    public async update(idUser: number, name: string, email: string, password: string): Promise<User | CustomError> {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: idUser
                },
                data: {
                    name,
                    email,
                    password
                }
            })

            return updatedUser
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao atualizar registro.')
        }
    }

    public async updateWithoutPassword(idUser: number, name: string, email: string): Promise<User | CustomError> {
        try {
            const updatedUser = await prisma.user.update({
                where: {
                    id: idUser
                },
                data: {
                    name,
                    email,
                }
            })

            return updatedUser
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao atualizar registro.')
        }
    }
}

export { UserRepository }