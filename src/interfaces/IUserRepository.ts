import { User } from '@prisma/client'

export interface IUserRepository {
    list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc'): Promise<User[] | Error>
    count(filter: string): Promise<number | Error>
    getById(idUser: number): Promise<User | null | Error>
    create(name: string, role: 'STUDENT' | 'TEACHER'): Promise<User | Error>
    update(idUser: number, name: string): Promise<User | Error>
    delete(idUser: number): Promise<void | Error>
}