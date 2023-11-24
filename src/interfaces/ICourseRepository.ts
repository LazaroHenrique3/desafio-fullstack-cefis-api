import { Course } from '@prisma/client'

export interface ICourseRepository {
    list(page: number, limit: number, filter: string, orderBy: 'asc' | 'desc'): Promise<Course[] | Error>
    count(filter: string): Promise<number | Error>
    getById(idCourse: number): Promise<Course | null | Error>
    create(title: string, duration: number, teacherId: number): Promise<Course | null | Error>
    update(idCourse: number, title: string, duration: number): Promise<Course | null | Error>
    delete(idCourse: number): Promise<void | null | Error>
}