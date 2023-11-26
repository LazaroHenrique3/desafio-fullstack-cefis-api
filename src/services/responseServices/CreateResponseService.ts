import { IResponseRepository } from '../../interfaces/IResponseRepository'
import { 
    checkIfQuestionExists, 
    checkIfThisTeacherOwnsTheCourse, 
    checkIfUserExistsAndIsTeacher 
} from '../utils/checkFunctions'

class CreateResponseService {
    constructor(private ResponseRepository: IResponseRepository) { }

    public async execute(responseText: string, idQuestion: number, idTeacher: number) {
        //Verificando se a pergunta existe
        const questionExists = await checkIfQuestionExists(idQuestion)
        if (!questionExists) {
            return new Error('Pergunta não encontrada.')
        }

        //Verificando se o professor existe e realmente é professor
        const teacherExists = await checkIfUserExistsAndIsTeacher(idTeacher)
        if (!teacherExists) {
            return new Error('Professor não encontrado ou este usuário não é um professor.')
        }

        //Verificar se esse professor é dono do curso
        const isOwner = await checkIfThisTeacherOwnsTheCourse(idTeacher, idQuestion)
        if(!isOwner) {
            return new Error('Você não é instrutor neste curso.')
        }

        const newResponse = await this.ResponseRepository.create(responseText, idQuestion)
        return newResponse
    }
}

export { CreateResponseService }