import { Course } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

export interface IListCourseResponse extends Course {
    teacher: {
        name: string
    }
}

/* Representa o coontrato que o repository deve seguir no momento de sua implementação independente do ORM */
export interface ICourseRepository {
    list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc', teacherId: number | null): Promise<IListCourseResponse[] | CustomError>
    count(filter: string, teacherId: number | null): Promise<number | CustomError>
    getById(idCourse: number): Promise<IListCourseResponse | null | CustomError>
    create(title: string, duration: number, teacherId: number): Promise<Course  | CustomError>
    update(idCourse: number, title: string, duration: number): Promise<Course | CustomError>
    delete(idCourse: number): Promise<void | CustomError>
}