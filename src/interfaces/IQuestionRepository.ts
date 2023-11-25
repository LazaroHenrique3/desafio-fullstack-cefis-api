import { Question } from '@prisma/client'

export interface IQuestionRepository {
    listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<Question[] | Error>
    count(idCourse: number): Promise<number | Error>
    getById(idQuestion: number): Promise<Question | null | Error>
    create(questionText: string, idCourse: number, idStudent: number): Promise<Question | null | Error>
    update(idQuestion: number, questionText: string): Promise<Question | null | Error>
    delete(idQuestion: number): Promise<void | null | Error>
}