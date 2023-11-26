import { Response } from '@prisma/client'
import { IResponseRepository } from '../interfaces/IResponseRepository'
import { prisma } from '../database/PrismaClientInstance'

class ResponseRepository implements IResponseRepository {

    public async create(responseText: string, idQuestion: number): Promise<Response | Error> {
        try {
            const newResponse = await prisma.response.create({
                data: {
                    response_text: responseText,
                    idQuestion
                }
            })

            return newResponse
        } catch (error) {
            console.error(error)
            return new Error('Erro ao criar registro.')
        }
    }

    public async listByIdQuestion(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number): Promise<Response[] | Error> {
        try {
            const responses = await prisma.response.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    idQuestion
                },
                orderBy: {
                    id: orderBy
                }
            })

            return responses
        } catch (error) {
            console.error(error)
            return new Error('Erro ao listar registro.')
        }
    }

    public async count(idQuestion: number): Promise<number | Error> {
        try {
            const countOfResponses = await prisma.response.count({
                where: {
                    idQuestion
                }
            })

            return countOfResponses
        } catch (error) {
            console.error(error)
            return new Error('Erro ao receber quantidade de registros.')
        }
    }

}

export { ResponseRepository }