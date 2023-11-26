import { Response } from '@prisma/client'

export interface IResponseRepository {
    listByIdQuestion(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number): Promise<Response[] | Error>
    count(idQuestion: number): Promise<number | Error>
    create(responseText: string, idQuestion: number): Promise<Response | Error>
}