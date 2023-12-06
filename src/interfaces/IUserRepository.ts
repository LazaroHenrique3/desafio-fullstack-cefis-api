import { User } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

export interface IUserWithoutPassword extends Omit<User, 'password'>  {}

/* Representa o coontrato que o repository deve seguir no momento de sua implementação independente do ORM */
export interface IUserRepository {
    list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', typeUser: 'STUDENT' | 'TEACHER' | ''): Promise<IUserWithoutPassword[] | CustomError>
    count(filter: string, typeUser: 'STUDENT' | 'TEACHER' | ''): Promise<number | CustomError>
    getById(idUser: number): Promise<User | null | CustomError>
    getByEmail(email: string): Promise<User | null | CustomError>
    create(name: string, email: string, password: string, role: 'STUDENT' | 'TEACHER'): Promise<User | CustomError>
    update(idUser: number, name: string, email: string, password: string): Promise<User | CustomError>
    updateWithoutPassword(idUser: number, name: string, email: string): Promise<User | CustomError>
    delete(idUser: number): Promise<void | CustomError>
}