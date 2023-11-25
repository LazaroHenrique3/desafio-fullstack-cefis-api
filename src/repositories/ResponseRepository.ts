import { Response } from '@prisma/client'
import { IResponseRepository } from '../interfaces/IResponseRepository'
import { prisma } from '../database/PrismaClientInstance'
import { checkIfResponseExists } from './utils/checkFunctions'

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

    public async getById(idResponse: number): Promise<Response | null | Error> {
        try {
            const response = await prisma.response.findUnique({
                where: {
                    id: idResponse
                }
            })

            return response
        } catch (error) {
            console.error(error)
            return new Error('Erro ao buscar registro.')
        }
    }

    public async delete(idResponse: number): Promise<void | null | Error> {
        try {
            const idExists = await checkIfResponseExists(idResponse)
            if (!idExists) return null

            await prisma.response.delete({
                where: {
                    id: idResponse
                }
            })


        } catch (error) {
            console.error(error)
            return new Error('Erro ao excluir registro.')
        }
    }

    public async update(idResponse: number, textResponse: string): Promise<Response | null | Error> {
        try {
            const idExists = await checkIfResponseExists(idResponse)
            if (!idExists) return null

            const updatedResponse = await prisma.response.update({
                where: {
                    id: idResponse
                },
                data: {
                    response_text: textResponse
                }
            })

            return updatedResponse
        } catch (error) {
            console.error(error)
            return new Error('Erro ao atualizar registro.')
        }
    }

}

export { ResponseRepository }