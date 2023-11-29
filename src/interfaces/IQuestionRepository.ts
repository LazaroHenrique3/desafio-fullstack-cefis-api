import { Question, Response } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

export interface IQuestionCreateResponse extends Question {
    student: {
        name: string
    }
    Response: Response[]
}

export interface IQuestionRepository {
    listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<Question[] | CustomError>
    count(idCourse: number): Promise<number | CustomError>
    create(questionText: string, idCourse: number, idStudent: number): Promise<IQuestionCreateResponse | CustomError>
}