import { Response } from '@prisma/client'
import { CustomError } from '../errors/CustomErrors'

/* Representa o coontrato que o repository deve seguir no momento de sua implementação independente do ORM */
export interface IResponseRepository {
    listByIdQuestion(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number): Promise<Response[] | CustomError>
    count(idQuestion: number): Promise<number | CustomError>
    create(responseText: string, idQuestion: number): Promise<Response | CustomError>
}