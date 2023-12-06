import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfThisTeacherOwnsTheCourseByIdTeacher } from '../utils/checkUserFunctions'
import { checkIfCourseExists } from '../utils/checkCourseFunctions'
import { CustomError } from '../../errors/CustomErrors'

class DeleteCourseService {
    constructor(private CourseService: ICourseRepository) { }

    public async execute(idCourse: number, idUserToken: number) {
        //Verificando se o curso existe
        const courseExists = await checkIfCourseExists(idCourse)
        if (!courseExists) {
            return new CustomError('Curso não encontrado.', 404)
        }

        //Verificar se esse professor é dono do curso
        const isOwner = await checkIfThisTeacherOwnsTheCourseByIdTeacher(idUserToken, idCourse)
        if (!isOwner) {
            return new CustomError('Este professor não é instrutor neste curso.', 403)
        }


        const deletedCourse = await this.CourseService.delete(idCourse)
        return deletedCourse
    }
}

export { DeleteCourseService }