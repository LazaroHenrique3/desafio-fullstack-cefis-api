import { IQuestionRepository, IQuestionWithResponses } from '../interfaces/IQuestionRepository'
import { prisma } from '../database/PrismaClientInstance'
import { CustomError } from '../errors/CustomErrors'

//Implementando as funções de CRUD seguindo o que foi acordado na interfaçe, ou seja desde que fosse seguido a interface poderia ser feito com qualquer tecnologia
class QuestionRepository implements IQuestionRepository {

    public async create(questionText: string, idCourse: number, idStudent: number): Promise<IQuestionWithResponses | CustomError> {
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

            const formattedResponse: IQuestionWithResponses = {
                ...newQuestion,
                Response: []
            }

            return formattedResponse
        } catch (error) {
            console.error(error)
            return new CustomError('Erro ao criar registro.')
        }
    }

    public async listByIdCourse(page: number, limit: number, orderBy: 'asc' | 'desc', idCourse: number): Promise<IQuestionWithResponses[] | CustomError> {
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
                    Response: true
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