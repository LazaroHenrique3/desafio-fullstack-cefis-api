import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfCourseExists } from '../utils/checkFunctions'

class DeleteCourseService {
    constructor (private CourseService: ICourseRepository) {}

    public async execute (idCourse: number) {
        //Verificando se o curso existe
        const courseExists = await checkIfCourseExists(idCourse)
        if (!courseExists) {
            return new Error('Curso não encontrado.')
        }

        const deletedCourse = await this.CourseService.delete(idCourse)
        return deletedCourse
    }
}

export { DeleteCourseService }