import { Question, Response } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

export interface IQuestionWithResponses extends Question {
    student: {
        name: string
    }
    Response: Response[]
}

/* Representa o coontrato que o repository deve seguir no momento de sua implementação independente do ORM */
export interface IQuestionRepository {
    listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<IQuestionWithResponses[] | CustomError>
    count(idCourse: number): Promise<number | CustomError>
    create(questionText: string, idCourse: number, idStudent: number): Promise<IQuestionWithResponses | CustomError>
}