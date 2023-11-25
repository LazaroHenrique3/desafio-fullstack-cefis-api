import { Response } from '@prisma/client'

export interface IResponseRepository {
    listByIdQuestion(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number): Promise<Response[] | Error>
    count(idQuestion: number): Promise<number | Error>
    getById(idResponse: number): Promise<Response | null | Error>
    create(responseText: string, idQuestion: number): Promise<Response | null | Error>
    update(idResponse: number, responseText: string): Promise<Response | null | Error>
    delete(idResponse: number): Promise<void | null | Error>
}