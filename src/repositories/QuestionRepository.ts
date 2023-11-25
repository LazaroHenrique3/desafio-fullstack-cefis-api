import { Question } from '@prisma/client'
import { IQuestionRepository } from '../interfaces/IQuestionRepository'
import { prisma } from '../database/PrismaClientInstance'
import { checkIfQuestionExists } from './utils/checkFunctions'

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

    public async getById(idQuestion: number): Promise<Question | null | Error> {
        try {
            const question = await prisma.question.findUnique({
                where: {
                    id: idQuestion
                }
            })

            return question
        } catch (error) {
            console.error(error)
            return new Error('Erro ao buscar registro.')
        }
    }

    public async delete(idQuestion: number): Promise<void | null | Error> {
        try {
            const idExists = await checkIfQuestionExists(idQuestion)
            if (!idExists) return null

            await prisma.question.delete({
                where: {
                    id: idQuestion
                }
            })


        } catch (error) {
            console.error(error)
            return new Error('Erro ao excluir registro.')
        }
    }

    public async update(idQuestion: number, textQuestion: string): Promise<Question | null | Error> {
        try {
            const idExists = await checkIfQuestionExists(idQuestion)
            if (!idExists) return null

            const updatedQuestion = await prisma.question.update({
                where: {
                    id: idQuestion
                },
                data: {
                    question_text: textQuestion
                }
            })

            return updatedQuestion
        } catch (error) {
            console.error(error)
            return new Error('Erro ao atualizar registro.')
        }
    }

}

export { QuestionRepository }