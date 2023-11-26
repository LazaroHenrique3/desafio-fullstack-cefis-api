import { Question } from '@prisma/client'

export interface IQuestionRepository {
    listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<Question[] | Error>
    count(idCourse: number): Promise<number | Error>
    create(questionText: string, idCourse: number, idStudent: number): Promise<Question | Error>
}