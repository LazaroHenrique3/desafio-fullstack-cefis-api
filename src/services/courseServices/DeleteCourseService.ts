import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfCourseExists } from '../utils/checkFunctions'
import { CustomError } from '../../errors/CustomErrors'

class DeleteCourseService {
    constructor (private CourseService: ICourseRepository) {}

    public async execute (idCourse: number) {
        //Verificando se o curso existe
        const courseExists = await checkIfCourseExists(idCourse)
        if (!courseExists) {
            return new CustomError('Curso não encontrado.', 404)
        }

        const deletedCourse = await this.CourseService.delete(idCourse)
        return deletedCourse
    }
}

export { DeleteCourseService }