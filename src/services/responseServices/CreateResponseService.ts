import { IResponseRepository } from '../../interfaces/IResponseRepository'
import { 
    checkIfQuestionExists, 
    checkIfThisTeacherOwnsTheCourse, 
    checkIfUserExistsAndIsTeacher 
} from '../utils/checkFunctions'
import { CustomError } from '../../errors/CustomErrors'

class CreateResponseService {
    constructor(private ResponseRepository: IResponseRepository) { }

    public async execute(responseText: string, idQuestion: number, idTeacher: number) {
        //Verificando se a pergunta existe
        const questionExists = await checkIfQuestionExists(idQuestion)
        if (!questionExists) {
            return new CustomError('Pergunta não encontrada.', 404)
        }

        //Verificando se o professor existe e realmente é professor
        const teacherExists = await checkIfUserExistsAndIsTeacher(idTeacher)
        if (!teacherExists) {
            return new CustomError('Professor não encontrado ou este usuário não é um professor.', 404)
        }

        //Verificar se esse professor é dono do curso
        const isOwner = await checkIfThisTeacherOwnsTheCourse(idTeacher, idQuestion)
        if(!isOwner) {
            return new CustomError('Este professor não é instrutor neste curso.', 403)
        }

        const newResponse = await this.ResponseRepository.create(responseText, idQuestion)
        return newResponse
    }
}

export { CreateResponseService }