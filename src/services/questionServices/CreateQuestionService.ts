import { IQuestionRepository } from '../../interfaces/IQuestionRepository'
import { 
    checkIfCourseExists,
    checkIfStudentReachedQuestionLimitForCourse, 
    checkIfUserExistsAndIsStudent 
} from '../utils/checkFunctions'

const DEFAULT_LIMIT_OF_QUESTIONS = 2

class CreateQuestionService {
    constructor (private QuestionRepository: IQuestionRepository) { }

    public async execute(questionText: string, idCourse: number, idStudent: number) {
        //Verificando se estudante existe e se ele é de fato estudante
        const studentExists = await checkIfUserExistsAndIsStudent(idStudent)
        if(!studentExists){
            return new Error('Estudante não encontrado.')
        }

        //verificando se o curso existe
        const courseExists = await checkIfCourseExists(idCourse)
        if(!courseExists){
            return new Error('Curso não encontrado.')
        }

        //Verificando se o aluno atingiu o limite de perguntas
        const isLimitReached = await checkIfStudentReachedQuestionLimitForCourse(idStudent, idCourse, DEFAULT_LIMIT_OF_QUESTIONS)
        if(isLimitReached){
            return new Error(`O aluno atingiu o limite total(${DEFAULT_LIMIT_OF_QUESTIONS}) de perguntas.`)
        }

        const newQuestion = await this.QuestionRepository.create(questionText, idCourse, idStudent)
        return newQuestion
    }
}

export { CreateQuestionService }