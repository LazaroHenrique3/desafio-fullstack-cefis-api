import { Question } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

export interface IQuestionRepository {
    listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<Question[] | CustomError>
    count(idCourse: number): Promise<number | CustomError>
    create(questionText: string, idCourse: number, idStudent: number): Promise<Question | CustomError>
}