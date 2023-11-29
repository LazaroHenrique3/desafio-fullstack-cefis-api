import { Question } from '@prisma/client'
import { IQuestionCreateResponse, IQuestionRepository } from '../interfaces/IQuestionRepository'
import { prisma } from '../database/PrismaClientInstance'
import { CustomError } from '../errors/CustomErrors'

class QuestionRepository implements IQuestionRepository {

    public async create(questionText: string, idCourse: number, idStudent: number): Promise<IQuestionCreateResponse | CustomError> {
        try {
            //Criando a pergunta e já retornando o name do estudante
            const newQuestion = await prisma.question.create({
                data: {
                    question_text: questionText,
                    idCourse,
                    idStudent
                },
                include: {
                    student: {
                        select: {
                            name: true
                        }
                    }
                }
            })

            const formattedResponse: IQuestionCreateResponse = {
                ...newQuestion,
                Response: []
            }

            return formattedResponse
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao criar registro.')
        }
    }

    public async listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<Question[] | CustomError> {
        try {
            const questions = await prisma.question.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    idCourse
                },
                include: {
                    student: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    id: orderBy
                }
            })

            return questions
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao listar registro.')
        }
    }

    public async count(idCourse: number): Promise<number | CustomError> {
        try {
            const countOfQuestions = await prisma.question.count({
                where: {
                    idCourse
                }
            })

            return countOfQuestions
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao receber quantidade de registros.')
        }
    }

}

export { QuestionRepository }