import { Course, Question } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

export interface IGetCourseByIdResponse extends Course {
    teacher: {
        name: string
    }
    Question: Question[]
}

export interface ICourseRepository {
    list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc'): Promise<Course[] | CustomError>
    count(filter: string): Promise<number | CustomError>
    getById(idCourse: number): Promise<IGetCourseByIdResponse | null | CustomError>
    create(title: string, duration: number, teacherId: number): Promise<Course  | CustomError>
    update(idCourse: number, title: string, duration: number): Promise<Course | CustomError>
    delete(idCourse: number): Promise<void | CustomError>
}