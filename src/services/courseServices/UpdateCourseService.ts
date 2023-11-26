import { ICourseRepository } from '../../interfaces/ICourseRepository'
import { checkIfCourseExists } from '../utils/checkFunctions'
import { CustomError } from '../../errors/CustomErrors'

class UpdateCourseService {
    constructor (private CourseRepository: ICourseRepository) {}

    public async execute(idCourse: number, title: string, duration: number) {
        //Verificando se o curso existe
        const courseExists = await checkIfCourseExists(idCourse)
        if (!courseExists) {
            return new CustomError('Curso não encontrado.', 404)
        }

        const updatedCourse = await this.CourseRepository.update(idCourse, title, duration)
        return updatedCourse
    }
}

export { UpdateCourseService }