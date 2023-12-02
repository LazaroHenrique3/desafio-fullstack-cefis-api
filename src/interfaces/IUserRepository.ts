import { User } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

/* Representa o coontrato que o repository deve seguir no momento de sua implementação independente do ORM */
export interface IUserRepository {
    list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', typeUser: 'STUDENT' | 'TEACHER' | ''): Promise<User[] | CustomError>
    count(filter: string): Promise<number | CustomError>
    getById(idUser: number): Promise<User | null | CustomError>
    create(name: string, role: 'STUDENT' | 'TEACHER'): Promise<User | CustomError>
    update(idUser: number, name: string): Promise<User | CustomError>
    delete(idUser: number): Promise<void | CustomError>
}