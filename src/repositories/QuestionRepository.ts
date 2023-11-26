import { Question } from '@prisma/client'
import { IQuestionRepository } from '../interfaces/IQuestionRepository'
import { prisma } from '../database/PrismaClientInstance'

class QuestionRepository implements IQuestionRepository {

    public async create(questionText: string, idCourse: number, idStudent: number): Promise<Question | Error> {
        try {
            const newQuestion = await prisma.question.create({
                data: {
                    question_text: questionText,
                    idCourse,
                    idStudent
                }
            })

            return newQuestion
        } catch (error) {
            console.error(error)
            return new Error('Erro ao criar registro.')
        }
    }

    public async listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<Question[] | Error> {
        try {
            const questions = await prisma.question.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    idCourse
                },
                orderBy: {
                    id: orderBy
                }
            })

            return questions
        } catch (error) {
            console.error(error)
            return new Error('Erro ao listar registro.')
        }
    }

    public async count(idCourse: number): Promise<number | Error> {
        try {
            const countOfQuestions = await prisma.question.count({
                where: {
                    idCourse
                }
            })

            return countOfQuestions
        } catch (error) {
            console.error(error)
            return new Error('Erro ao receber quantidade de registros.')
        }
    }

}

export { QuestionRepository }