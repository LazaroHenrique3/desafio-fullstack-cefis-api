import { Response } from '@prisma/client'
import { IResponseRepository } from '../interfaces/IResponseRepository'
import { prisma } from '../database/PrismaClientInstance'
import { CustomError } from '../errors/CustomErrors'

//Implementando as funções de CRUD seguindo o que foi acordado na interfaçe, ou seja desde que fosse seguido a interface poderia ser feito com qualquer tecnologia
class ResponseRepository implements IResponseRepository {

    public async create(responseText: string, idQuestion: number): Promise<Response | CustomError> {
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
            return new CustomError('Erro ao criar registro.')
        }
    }

    public async listByIdQuestion(page: number, limit: number, orderBy: 'asc' | 'desc', idQuestion: number): Promise<Response[] | CustomError> {
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
            return new CustomError('Erro ao listar registro.')
        }
    }

    public async count(idQuestion: number): Promise<number | CustomError> {
        try {
            const countOfResponses = await prisma.response.count({
                where: {
                    idQuestion
                }
            })

            return countOfResponses
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao receber quantidade de registros.')
        }
    }

}

export { ResponseRepository }