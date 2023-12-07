import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfUserExistsAndIsTeacher } from '../utils/checkUserFunctions'
import { CustomError } from '../../errors/CustomErrors'

class CreateCourseService {
    constructor (private CourseRepository: ICourseRepository) { }

    public async execute(title: string, duration: number, teacherId: number, idUserToken: number) {
        //Verificando se o professor existe e realmente é professor
        const teacherExists = await checkIfUserExistsAndIsTeacher(teacherId)
        if(!teacherExists){
            return new CustomError('Professor não encontrado ou este usuário não é um professor.', 404)
        }

        //Certificando se quem solicitou essa ação de create também é o professor que será dono do curso
        if(teacherId !== idUserToken){
            return new CustomError('Não tem permissão para esse tipo de ação', 401)
        }

        const newCourse = await this.CourseRepository.create(title, duration, teacherId)
        return newCourse
    }
}

export { CreateCourseService }