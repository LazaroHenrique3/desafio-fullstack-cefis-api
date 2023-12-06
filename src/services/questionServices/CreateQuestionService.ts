import { IQuestionRepository } from '../../interfaces/IQuestionRepository'
import { 
    checkIfStudentReachedQuestionLimitForCourse, 
    checkIfUserExistsAndIsStudent 
} from '../utils/checkUserFunctions'
import { checkIfCourseExists } from '../utils/checkCourseFunctions'
import { CustomError } from '../../errors/CustomErrors'

const DEFAULT_LIMIT_OF_QUESTIONS = 2

class CreateQuestionService {
    constructor (private QuestionRepository: IQuestionRepository) { }

    public async execute(questionText: string, idCourse: number, idStudent: number) {
        //Verificando se estudante existe e se ele é de fato estudante
        const studentExists = await checkIfUserExistsAndIsStudent(idStudent)
        if(!studentExists){
            return new CustomError('Estudante não encontrado.', 404)
        }

        //verificando se o curso existe
        const courseExists = await checkIfCourseExists(idCourse)
        if(!courseExists){
            return new CustomError('Curso não encontrado.', 404)
        }

        //Verificando se o aluno atingiu o limite de perguntas
        const isLimitReached = await checkIfStudentReachedQuestionLimitForCourse(idStudent, idCourse, DEFAULT_LIMIT_OF_QUESTIONS)
        if(isLimitReached){
            return new CustomError(`O aluno atingiu o limite total(${DEFAULT_LIMIT_OF_QUESTIONS}) de perguntas.`, 403)
        }

        const newQuestion = await this.QuestionRepository.create(questionText, idCourse, idStudent)
        return newQuestion
    }
}

export { CreateQuestionService }